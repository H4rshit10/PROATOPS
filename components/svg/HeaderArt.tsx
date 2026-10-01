"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { EASE, STAGGER } from "@/lib/motion";
import { DRAW_ATTRS, DRAW_HIDDEN } from "@/components/motion/DrawIn";

/**
 * Page-header line art.
 *
 * One quiet blueprint plate per standalone page, each describing that page's
 * subject: the seven layers, the site plan an industry sits in, the method
 * as a staircase of steps, disorder resolving into a system, the ownership
 * split, a ledger of dispatches. They share the glyph set's rules (square
 * caps, miter joins, `currentColor`, no fill, no gradient, no glow) on a
 * larger 240 x 160 plate, and one motion: the strokes draw themselves in
 * (`pathLength`), then the signature crimson marker makes a single pass along
 * the plate's spine and comes to rest. Nothing loops.
 *
 * Drawing starts ~0.5s after mount so it never competes with the headline,
 * and under reduced motion every plate renders complete and still, the marker
 * parked at the end of its path.
 *
 * The draw uses DRAW_ATTRS (see DrawIn.tsx) rather than Framer's `pathLength`,
 * which forces an SVG layout pass on every frame. Solid strokes only, and no
 * `vector-effect` on anything that draws, as in Diagrams.tsx.
 */

export type HeaderArtName =
  | "layers"
  | "industries"
  | "method"
  | "why"
  | "ownership"
  | "ledger";

type Pt = readonly [number, number];

const box = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}z`;

/* ---------------------------------------------------------------- engine */

function usePlate() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotionSafe();

  /** Props for the i-th stroke. */
  const draw = (i: number) =>
    reduced
      ? {}
      : {
          ...DRAW_ATTRS,
          initial: { strokeDashoffset: DRAW_HIDDEN, opacity: 0 },
          animate: inView ? { strokeDashoffset: 0, opacity: 1 } : undefined,
          transition: { duration: 0.8, delay: 0.5 + i * STAGGER, ease: EASE },
        };

  /** The marker: one pass along `pts`, then it rests on the last point. */
  const marker = (pts: readonly Pt[], delay: number, duration = 2.2): ReactNode => {
    const last = pts[pts.length - 1];
    const dist = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = dist.reduce((a, b) => a + b, 0);
    let acc = 0;
    const times = [0, ...dist.map((d) => (acc += d) / total)];
    const body = (
      <rect
        x={-3}
        y={-3}
        width={6}
        height={6}
        transform="rotate(45)"
        className="fill-op-crimson"
        stroke="none"
      />
    );
    if (reduced) return <g transform={`translate(${last[0]} ${last[1]})`}>{body}</g>;
    return (
      <motion.g
        initial={{ x: pts[0][0], y: pts[0][1], opacity: 0 }}
        animate={
          inView
            ? {
                x: pts.map((p) => p[0]),
                y: pts.map((p) => p[1]),
                opacity: 1,
              }
            : undefined
        }
        transition={{
          x: { duration, delay, ease: "linear", times },
          y: { duration, delay, ease: "linear", times },
          opacity: { duration: 0.2, delay },
        }}
      >
        {body}
      </motion.g>
    );
  };

  return { ref, draw, marker };
}

type Plate = ReturnType<typeof usePlate>;

function Svg({ plate, children }: { plate: Plate; children: ReactNode }) {
  return (
    <svg
      ref={plate.ref}
      viewBox="0 0 240 160"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="block h-auto w-full overflow-visible"
    >
      {children}
    </svg>
  );
}

function P({ plate, i, d, className, o }: { plate: Plate; i: number; d: string; className?: string; o?: number }) {
  return <motion.path d={d} className={className} strokeOpacity={o} {...plate.draw(i)} />;
}

/* ---------------------------------------------------------------- plates */

/** Seven layers: seven slabs hung off one spine. */
function Layers() {
  const plate = usePlate();
  const ticks = [28, 40, 22, 34, 26, 38, 30];
  let n = 0;
  return (
    <Svg plate={plate}>
      <P plate={plate} i={n++} d="M16 8V152" />
      {ticks.map((t, k) => {
        const y = 10 + k * 20.5;
        return (
          <g key={k}>
            <P plate={plate} i={n++} d={`M16 ${y + 6}H44`} />
            <P plate={plate} i={n++} d={box(44, y, 176, 12)} />
            <P plate={plate} i={n++} d={`M54 ${y + 6}h${t}`} o={0.6} />
          </g>
        );
      })}
      {plate.marker([[16, 8], [16, 152]], 1.2, 2)}
    </Svg>
  );
}

/** Industries: a site plan of blocks and streets, one pass down a street. */
function Industries() {
  const plate = usePlate();
  const blocks = [
    box(30, 20, 60, 35),
    box(110, 20, 40, 35),
    box(170, 20, 40, 35),
    box(30, 75, 60, 65),
    box(110, 75, 100, 30),
    box(110, 115, 45, 25),
    box(165, 115, 45, 25),
  ];
  return (
    <Svg plate={plate}>
      <P plate={plate} i={0} d={box(20, 10, 200, 140)} o={0.5} />
      {blocks.map((d, k) => (
        <P key={k} plate={plate} i={k + 1} d={d} />
      ))}
      {plate.marker([[20, 65], [100, 65], [100, 145]], 1.3, 2.2)}
    </Svg>
  );
}

/** Method: six steps climbing a staircase, the marker taking each in turn. */
function Method() {
  const plate = usePlate();
  const nodes = Array.from({ length: 6 }, (_, k) => ({ x: 12 + k * 40, y: 128 - k * 20 }));
  const path: Pt[] = [];
  nodes.forEach((n, k) => {
    const cx = n.x + 7;
    const cy = n.y + 7;
    if (k === 0) path.push([cx, cy]);
    else {
      const prev = nodes[k - 1];
      path.push([cx, prev.y + 7], [cx, cy]);
    }
  });
  return (
    <Svg plate={plate}>
      {nodes.map((n, k) => (
        <g key={k}>
          <P plate={plate} i={k * 2} d={box(n.x, n.y, 14, 14)} className={k === 5 ? "text-op-crimson" : ""} />
          {k < 5 && (
            <P
              plate={plate}
              i={k * 2 + 1}
              d={`M${n.x + 14} ${n.y + 7}H${nodes[k + 1].x + 7}V${nodes[k + 1].y + 14}`}
              o={0.6}
            />
          )}
        </g>
      ))}
      {plate.marker(path, 1.2, 2.6)}
    </Svg>
  );
}

/** Why: scattered effort on the left, the same units set in order on the right. */
function Why() {
  const plate = usePlate();
  const scatter = [
    box(14, 30, 10, 10),
    box(46, 14, 8, 8),
    box(30, 66, 12, 12),
    box(70, 52, 9, 9),
    box(52, 100, 11, 11),
    box(16, 118, 8, 8),
    box(80, 128, 10, 10),
  ];
  const grid: string[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(box(160 + c * 26, 44 + r * 26, 14, 14));
  return (
    <Svg plate={plate}>
      {scatter.map((d, k) => (
        <P key={k} plate={plate} i={k} d={d} o={0.6} />
      ))}
      <P plate={plate} i={7} d="M100 80H128M122 74l6 6-6 6" />
      {grid.map((d, k) => (
        <P key={k} plate={plate} i={k + 8} d={d} className={k === 4 ? "text-op-crimson" : ""} />
      ))}
      {plate.marker([[100, 80], [146, 80]], 1.3, 1.6)}
    </Svg>
  );
}

/** Ownership: one square you hold, a grid we run, and the line between. */
function Ownership() {
  const plate = usePlate();
  const grid: string[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(box(140 + c * 22, 52 + r * 22, 14, 14));
  return (
    <Svg plate={plate}>
      <P plate={plate} i={0} d={box(20, 20, 200, 120)} o={0.5} />
      <P plate={plate} i={1} d="M120 20V140" />
      <P plate={plate} i={2} d={box(46, 57, 48, 48)} />
      <P plate={plate} i={3} d="M70 57V105M46 81H94" o={0.6} />
      {grid.map((d, k) => (
        <P key={k} plate={plate} i={k + 4} d={d} className={k === 3 ? "text-op-crimson" : ""} />
      ))}
      {plate.marker([[94, 81], [140, 81]], 1.4, 1.4)}
    </Svg>
  );
}

/** Ledger: a sheet of dispatches, a second sheet behind it, a line being read. */
function Ledger() {
  const plate = usePlate();
  return (
    <Svg plate={plate}>
      <P plate={plate} i={0} d="M40 12H208V128H192" o={0.5} />
      <P plate={plate} i={1} d={box(24, 24, 168, 120)} />
      <P plate={plate} i={2} d="M40 44H100" />
      <P plate={plate} i={3} d="M40 66H176" o={0.6} />
      <P plate={plate} i={4} d="M40 82H160" o={0.6} />
      <P plate={plate} i={5} d="M40 98H176" o={0.6} />
      <P plate={plate} i={6} d="M40 114H128" o={0.6} />
      {plate.marker([[40, 66], [176, 66]], 1.2, 2.2)}
    </Svg>
  );
}

const PLATES: Record<HeaderArtName, () => ReactNode> = {
  layers: Layers,
  industries: Industries,
  method: Method,
  why: Why,
  ownership: Ownership,
  ledger: Ledger,
};

export default function HeaderArt({ name }: { name: HeaderArtName }) {
  const Plate = PLATES[name];
  return <Plate />;
}
