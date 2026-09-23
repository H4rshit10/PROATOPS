"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * The blueprint's diagrams, drawn rather than described.
 *
 * Each one is a technical schematic — thin strokes, square joins, crimson
 * used only where the eye should land — that draws itself once as it comes
 * into view. Under reduced motion every path is simply present from the
 * first frame; nothing is hidden behind an animation that may never run.
 *
 * All of them scale with their container and carry no intrinsic size, so a
 * section decides how big its diagram is, not this file.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type DiagramProps = { className?: string };

/** Shared stroke-draw. `i` staggers each path along the sequence. */
function useDraw() {
  const reduced = useReducedMotionSafe();
  return (i: number) =>
    reduced
      ? { initial: false as const, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.75, delay: i * 0.08, ease: EASE },
        };
}

function useFade() {
  const reduced = useReducedMotionSafe();
  return (i: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: 0.25 + i * 0.07, ease: EASE },
        };
}

const label = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fill: "currentColor",
  fontFamily: "var(--font-mono), monospace",
} as const;

const box = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

/* ============================================================
   01 — THE OPERATING LAYER  (hero)
   PROATOPS -> PEOPLE / PROCESS / PERFORMANCE -> BUSINESS -> SCALE
   ============================================================ */
export function OperatingLayerDiagram({ className = "" }: DiagramProps) {
  const draw = useDraw();
  const fade = useFade();
  const cols = [
    { x: 40, label: "PEOPLE" },
    { x: 200, label: "PROCESS" },
    { x: 360, label: "PERFORMANCE" },
  ];

  return (
    <svg viewBox="0 0 520 400" className={className} aria-hidden="true" focusable="false">
      {/* top node */}
      <motion.rect {...box} x="190" y="10" width="140" height="38" stroke="var(--op-crimson)" {...draw(0)} />
      <motion.text {...label} x="260" y="34" textAnchor="middle" fill="var(--op-crimson)" {...fade(0)}>
        PROATOPS
      </motion.text>

      {/* spine down + bus bar across */}
      <motion.path {...box} d="M260 48v28" {...draw(1)} />
      <motion.path {...box} d="M100 76h320" {...draw(2)} />

      {/* drops into each column */}
      {cols.map((c, i) => (
        <motion.path key={c.label} {...box} d={`M${c.x + 60} 76v26`} {...draw(3 + i)} />
      ))}

      {/* the three operating columns */}
      {cols.map((c, i) => (
        <g key={c.label}>
          <motion.rect {...box} x={c.x} y="102" width="120" height="40" {...draw(4 + i)} />
          <motion.text {...label} x={c.x + 60} y="126" textAnchor="middle" {...fade(1 + i)}>
            {c.label}
          </motion.text>
          {/* back down to the collector */}
          <motion.path {...box} d={`M${c.x + 60} 142v26`} {...draw(6 + i)} />
        </g>
      ))}

      {/* collector bar */}
      <motion.path {...box} d="M100 168h320" {...draw(9)} />
      <motion.path {...box} d="M260 168v28" {...draw(10)} />

      {/* business */}
      <motion.rect {...box} x="190" y="196" width="140" height="40" {...draw(11)} />
      <motion.text {...label} x="260" y="221" textAnchor="middle" {...fade(5)}>
        BUSINESS
      </motion.text>

      <motion.path {...box} d="M260 236v26" {...draw(12)} />

      {/* scale — the outcome, crimson again to close the loop */}
      <motion.rect {...box} x="190" y="262" width="140" height="40" stroke="var(--op-crimson)" {...draw(13)} />
      <motion.text {...label} x="260" y="287" textAnchor="middle" fill="var(--op-crimson)" {...fade(6)}>
        SCALE
      </motion.text>

      {/* registration ticks — the technical register the rest of the site uses */}
      <motion.path {...box} d="M20 10v14M20 17h14M500 302v-14M500 295h-14" {...draw(14)} opacity={0.5} />
    </svg>
  );
}

/* ============================================================
   02 — GROWTH CEILING
   ============================================================ */
export function CeilingDiagram({ className = "" }: DiagramProps) {
  const draw = useDraw();
  const fade = useFade();
  return (
    <svg viewBox="0 0 420 260" className={className} aria-hidden="true" focusable="false">
      {/* the ceiling */}
      <motion.path
        {...box}
        strokeWidth={2}
        d="M20 60h380"
        stroke="var(--op-crimson)"
        {...draw(0)}
      />
      <motion.text {...label} x="400" y="48" textAnchor="end" fill="var(--op-crimson)" {...fade(0)}>
        CEILING
      </motion.text>

      {/* the growth curve flattening into it */}
      <motion.path {...box} d="M20 230C110 230 150 120 210 80c40-27 120-20 190-20" {...draw(1)} />

      {/* axes */}
      <motion.path {...box} d="M20 20v210h380" opacity={0.45} {...draw(2)} />

      {/* the dependency markers stacking up under the ceiling */}
      {[90, 140, 190, 240].map((x, i) => (
        <motion.path key={x} {...box} d={`M${x} 230v-${40 + i * 18}`} strokeDasharray="3 4" opacity={0.5} {...draw(3 + i)} />
      ))}
      <motion.text {...label} x="24" y="250" {...fade(1)}>
        OWNER-DEPENDENT
      </motion.text>
    </svg>
  );
}

/* ============================================================
   03 — OWNERSHIP VS OPERATIONS
   ============================================================ */
export function OwnershipDiagram({
  you,
  us,
  className = "",
}: DiagramProps & { you: string[]; us: string[] }) {
  const draw = useDraw();
  const fade = useFade();
  const rows = Math.max(you.length, us.length);
  const h = 60 + rows * 30;

  return (
    <svg viewBox={`0 0 520 ${h}`} className={className} aria-hidden="true" focusable="false">
      <motion.rect {...box} x="10" y="10" width="230" height={h - 20} {...draw(0)} />
      <motion.rect {...box} x="280" y="10" width="230" height={h - 20} stroke="var(--op-crimson)" {...draw(1)} />

      <motion.text {...label} x="26" y="36" {...fade(0)}>
        YOU
      </motion.text>
      <motion.text {...label} x="296" y="36" fill="var(--op-crimson)" {...fade(0)}>
        PROATOPS
      </motion.text>

      <motion.path {...box} d="M10 48h230M280 48h230" opacity={0.5} {...draw(2)} />

      {you.map((item, i) => (
        <motion.text key={item} {...label} x="26" y={78 + i * 30} opacity={0.75} {...fade(1 + i * 0.4)}>
          {item.toUpperCase()}
        </motion.text>
      ))}
      {us.map((item, i) => (
        <motion.text key={item} {...label} x="296" y={78 + i * 30} opacity={0.75} {...fade(1 + i * 0.4)}>
          {item.toUpperCase()}
        </motion.text>
      ))}

      {/* the boundary — deliberately a seam, not a wall */}
      <motion.path {...box} d={`M260 20v${h - 40}`} strokeDasharray="4 5" opacity={0.6} {...draw(3)} />
    </svg>
  );
}

/* ============================================================
   04 — THE METHOD  (6 steps, horizontal on desktop)
   ============================================================ */
export function MethodFlow({
  steps,
  className = "",
}: DiagramProps & { steps: { index: string; title: string }[] }) {
  const draw = useDraw();
  const fade = useFade();
  const gap = 500 / steps.length;

  return (
    <svg viewBox="0 0 520 120" className={className} aria-hidden="true" focusable="false">
      <motion.path {...box} d="M10 60h500" opacity={0.4} {...draw(0)} />
      {steps.map((s, i) => {
        const x = 10 + gap * i + gap / 2;
        const isLast = i === steps.length - 1;
        return (
          <g key={s.index}>
            <motion.rect
              {...box}
              x={x - 16}
              y={44}
              width={32}
              height={32}
              stroke={isLast ? "var(--op-crimson)" : "currentColor"}
              {...draw(1 + i)}
            />
            <motion.text
              {...label}
              x={x}
              y={64}
              textAnchor="middle"
              fill={isLast ? "var(--op-crimson)" : "currentColor"}
              {...fade(i)}
            >
              {s.index}
            </motion.text>
            <motion.text {...label} x={x} y={100} textAnchor="middle" opacity={0.7} {...fade(i + 0.5)}>
              {s.title}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   05 — THE AUDIT PROCESS  (vertical, 6 steps)
   ============================================================ */
export function ProcessFlow({
  steps,
  className = "",
}: DiagramProps & { steps: { index: string; title: string }[] }) {
  const draw = useDraw();
  const fade = useFade();
  const h = steps.length * 62 + 20;

  return (
    <svg viewBox={`0 0 300 ${h}`} className={className} aria-hidden="true" focusable="false">
      <motion.path {...box} d={`M30 24v${h - 60}`} opacity={0.4} strokeDasharray="4 5" {...draw(0)} />
      {steps.map((s, i) => {
        const y = 24 + i * 62;
        const isLast = i === steps.length - 1;
        return (
          <g key={s.index}>
            <motion.rect
              {...box}
              x={16}
              y={y - 14}
              width={28}
              height={28}
              stroke={isLast ? "var(--op-crimson)" : "currentColor"}
              {...draw(1 + i)}
            />
            <motion.text
              {...label}
              x={30}
              y={y + 4}
              textAnchor="middle"
              fill={isLast ? "var(--op-crimson)" : "currentColor"}
              {...fade(i)}
            >
              {s.index}
            </motion.text>
            <motion.text {...label} x={62} y={y + 4} opacity={0.8} {...fade(i + 0.4)}>
              {s.title}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   06 — BEFORE / AFTER
   ============================================================ */
export function TransformationDiagram({
  before,
  after,
  className = "",
}: DiagramProps & { before: string[]; after: string[] }) {
  const draw = useDraw();
  const fade = useFade();
  const rows = Math.max(before.length, after.length);
  const h = rows * 40 + 60;

  return (
    <svg viewBox={`0 0 560 ${h}`} className={className} aria-hidden="true" focusable="false">
      {/* left rail — fragmented */}
      <motion.path {...box} d={`M30 30v${h - 60}`} strokeDasharray="3 6" opacity={0.55} {...draw(0)} />
      {/* right rail — continuous */}
      <motion.path {...box} d={`M330 30v${h - 60}`} stroke="var(--op-crimson)" {...draw(1)} />

      {before.map((item, i) => {
        const y = 44 + i * 40;
        return (
          <g key={item}>
            <motion.rect {...box} x={22} y={y - 8} width={16} height={16} strokeDasharray="2 3" opacity={0.6} {...draw(2 + i)} />
            <motion.text {...label} x={52} y={y + 4} opacity={0.6} {...fade(i * 0.5)}>
              {item.toUpperCase()}
            </motion.text>
          </g>
        );
      })}

      {after.map((item, i) => {
        const y = 44 + i * 40;
        return (
          <g key={item}>
            <motion.rect {...box} x={322} y={y - 8} width={16} height={16} stroke="var(--op-crimson)" {...draw(3 + i)} />
            <motion.text {...label} x={352} y={y + 4} {...fade(i * 0.5 + 0.3)}>
              {item.toUpperCase()}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   07 — THE PROATOPS OPERATING SYSTEM
   ============================================================ */
export function OperatingSystemDiagram({
  pillars,
  stack,
  className = "",
}: DiagramProps & { pillars: string[]; stack: string[] }) {
  const draw = useDraw();
  const fade = useFade();
  const pw = 92;
  const gap = 8;
  const totalW = pillars.length * pw + (pillars.length - 1) * gap;
  const startX = (560 - totalW) / 2;

  return (
    <svg viewBox="0 0 560 470" className={className} aria-hidden="true" focusable="false">
      {/* owner */}
      <motion.rect {...box} x="200" y="10" width="160" height="36" {...draw(0)} />
      <motion.text {...label} x="280" y="33" textAnchor="middle" {...fade(0)}>
        BUSINESS OWNER
      </motion.text>
      <motion.path {...box} d="M280 46v24" {...draw(1)} />

      {/* the OS band */}
      <motion.rect {...box} x="140" y="70" width="280" height="42" stroke="var(--op-crimson)" {...draw(2)} />
      <motion.text {...label} x="280" y="96" textAnchor="middle" fill="var(--op-crimson)" {...fade(1)}>
        PROATOPS OS
      </motion.text>

      {/* fan out to pillars */}
      <motion.path {...box} d="M280 112v20" {...draw(3)} />
      <motion.path {...box} d={`M${startX + pw / 2} 132h${totalW - pw}`} {...draw(4)} />

      {pillars.map((p, i) => {
        const x = startX + i * (pw + gap);
        return (
          <g key={p}>
            <motion.path {...box} d={`M${x + pw / 2} 132v18`} {...draw(5 + i)} />
            <motion.rect {...box} x={x} y={150} width={pw} height={36} {...draw(6 + i)} />
            <motion.text {...label} x={x + pw / 2} y={172} textAnchor="middle" fontSize={9} {...fade(2 + i * 0.3)}>
              {p}
            </motion.text>
            <motion.path {...box} d={`M${x + pw / 2} 186v18`} {...draw(7 + i)} />
          </g>
        );
      })}

      {/* collect back down */}
      <motion.path {...box} d={`M${startX + pw / 2} 204h${totalW - pw}`} {...draw(12)} />
      <motion.path {...box} d="M280 204v22" {...draw(13)} />

      {/* the stack: data -> intelligence -> ai -> scale */}
      {stack.map((s, i) => {
        const y = 226 + i * 58;
        const isLast = i === stack.length - 1;
        return (
          <g key={s}>
            <motion.rect
              {...box}
              x="200"
              y={y}
              width="160"
              height="36"
              stroke={isLast ? "var(--op-crimson)" : "currentColor"}
              {...draw(14 + i)}
            />
            <motion.text
              {...label}
              x="280"
              y={y + 23}
              textAnchor="middle"
              fill={isLast ? "var(--op-crimson)" : "currentColor"}
              {...fade(5 + i * 0.4)}
            >
              {s}
            </motion.text>
            {!isLast && <motion.path {...box} d={`M280 ${y + 36}v22`} {...draw(15 + i)} />}
          </g>
        );
      })}
    </svg>
  );
}
