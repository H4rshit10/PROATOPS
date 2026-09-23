"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * The blueprint's diagrams, plotted as technical schematics.
 *
 * Three rules hold the whole file together, all of them learned the hard
 * way from the first pass:
 *
 *  1. Connectors are drawn *between* nodes, never through them. A spine
 *     that runs edge-to-edge ends up bisecting every box and number on it.
 *  2. `pathLength` is only ever used on solid strokes. Framer implements
 *     that animation *with* stroke-dasharray, so a path that also sets its
 *     own dash pattern fights it and renders in pieces. Dashed elements
 *     fade in instead.
 *  3. Rects and text fade; they never draw. A half-drawn rect reads as a
 *     broken bracket rather than a box being built.
 *
 * Geometry is laid out from explicit constants below each diagram so the
 * spacing is checkable by reading it, not by eye.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const DUR = 0.5;
const STAGGER = 0.045;

type DiagramProps = { className?: string };

/** Stroke draw — solid paths only. */
function useDraw() {
  const reduced = useReducedMotionSafe();
  return (i: number) =>
    reduced
      ? { initial: false as const, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: DUR, delay: i * STAGGER, ease: EASE },
        };
}

/** Opacity fade — rects, text, and anything with its own dash pattern. */
function useFade() {
  const reduced = useReducedMotionSafe();
  return (i: number, to = 1) =>
    reduced
      ? { initial: false as const, animate: { opacity: to } }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: to },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: DUR, delay: i * STAGGER, ease: EASE },
        };
}

/**
 * Two stroke presets, and the difference matters.
 *
 * `pathLength` is implemented by framer through stroke-dasharray, and
 * `vector-effect: non-scaling-stroke` makes the browser resolve those dashes
 * in screen pixels rather than normalized path units — so every drawn line
 * came out in fragments with gaps mid-span. Anything animated with `draw`
 * therefore omits the vector-effect; anything that only fades keeps it, so
 * box borders stay a crisp hairline at any scale.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

const strokeDraw = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.8,
};

/** Node boxes are filled with the page ground so any stroke behind them is
    masked rather than showing through the middle of a label. */
const nodeFill = "var(--diagram-ground, transparent)";

const label = {
  fontSize: 10,
  letterSpacing: "0.12em",
  fill: "currentColor",
  fontFamily: "var(--font-mono), monospace",
} as const;

/* ============================================================
   01 — THE OPERATING LAYER   (hero)
   ============================================================ */
export function OperatingLayerDiagram({ className = "" }: DiagramProps) {
  const draw = useDraw();
  const fade = useFade();

  // vertical rhythm
  const TOP_Y = 8, TOP_H = 36;            // PROATOPS      8  → 44
  const BUS_Y = 68;                        // fan-out bar
  const COL_Y = 90, COL_H = 38;            // three columns 90  → 128
  const JOIN_Y = 150;                      // collector bar
  const BIZ_Y = 174, BIZ_H = 38;           // BUSINESS    174  → 212
  const SCALE_Y = 236, SCALE_H = 38;       // SCALE       236  → 274
  const CX = 260;
  const cols = [
    { x: 40, cx: 100, text: "PEOPLE" },
    { x: 200, cx: 260, text: "PROCESS" },
    { x: 360, cx: 420, text: "PERFORMANCE" },
  ];

  return (
    <svg viewBox="0 0 520 292" className={className} aria-hidden="true" focusable="false">
      {/* PROATOPS */}
      <motion.rect
        {...stroke}
        fill={nodeFill}
        x={190}
        y={TOP_Y}
        width={140}
        height={TOP_H}
        stroke="var(--op-crimson)"
        {...fade(0)}
      />
      <motion.text {...label} x={CX} y={TOP_Y + 23} textAnchor="middle" fill="var(--op-crimson)" {...fade(1)}>
        PROATOPS
      </motion.text>

      {/* down to the fan-out, then across */}
      <motion.path {...strokeDraw} d={`M${CX} ${TOP_Y + TOP_H}V${BUS_Y}`} {...draw(1)} />
      <motion.path {...strokeDraw} d={`M${cols[0].cx} ${BUS_Y}H${cols[2].cx}`} {...draw(2)} />

      {/* one drop per column, stopping at the box edge */}
      {cols.map((c, i) => (
        <motion.path key={`d-${c.text}`} {...strokeDraw} d={`M${c.cx} ${BUS_Y}V${COL_Y}`} {...draw(3 + i)} />
      ))}

      {/* the three operating columns */}
      {cols.map((c, i) => (
        <g key={c.text}>
          <motion.rect {...stroke} fill={nodeFill} x={c.x} y={COL_Y} width={120} height={COL_H} {...fade(3 + i)} />
          <motion.text {...label} x={c.cx} y={COL_Y + 23} textAnchor="middle" {...fade(4 + i)}>
            {c.text}
          </motion.text>
          <motion.path
            key={`u-${c.text}`}
            {...strokeDraw}
            d={`M${c.cx} ${COL_Y + COL_H}V${JOIN_Y}`}
            {...draw(6 + i)}
          />
        </g>
      ))}

      {/* collect back to one line */}
      <motion.path {...strokeDraw} d={`M${cols[0].cx} ${JOIN_Y}H${cols[2].cx}`} {...draw(9)} />
      <motion.path {...strokeDraw} d={`M${CX} ${JOIN_Y}V${BIZ_Y}`} {...draw(10)} />

      {/* BUSINESS */}
      <motion.rect {...stroke} fill={nodeFill} x={190} y={BIZ_Y} width={140} height={BIZ_H} {...fade(8)} />
      <motion.text {...label} x={CX} y={BIZ_Y + 23} textAnchor="middle" {...fade(9)}>
        BUSINESS
      </motion.text>

      <motion.path {...strokeDraw} d={`M${CX} ${BIZ_Y + BIZ_H}V${SCALE_Y}`} {...draw(11)} />

      {/* SCALE — the outcome, crimson to close the loop */}
      <motion.rect
        {...stroke}
        fill={nodeFill}
        x={190}
        y={SCALE_Y}
        width={140}
        height={SCALE_H}
        stroke="var(--op-crimson)"
        {...fade(10)}
      />
      <motion.text {...label} x={CX} y={SCALE_Y + 23} textAnchor="middle" fill="var(--op-crimson)" {...fade(11)}>
        SCALE
      </motion.text>

      {/* registration marks, well clear of the schematic */}
      <motion.path {...stroke} d="M16 8v12M16 14h12" {...fade(12, 0.45)} />
      <motion.path {...stroke} d="M504 274v-12M504 268h-12" {...fade(12, 0.45)} />
    </svg>
  );
}

/* ============================================================
   02 — GROWTH CEILING
   ============================================================ */
export function CeilingDiagram({ className = "" }: DiagramProps) {
  const draw = useDraw();
  const fade = useFade();

  const AX = 24, TOP = 16, BASE = 216, RIGHT = 396;
  const CEIL = 56;

  return (
    <svg viewBox="0 0 420 244" className={className} aria-hidden="true" focusable="false">
      {/* axes */}
      <motion.path {...stroke} d={`M${AX} ${TOP}V${BASE}H${RIGHT}`} {...fade(0, 0.45)} />

      {/* the ceiling */}
      <motion.path {...strokeDraw} strokeWidth={2} d={`M${AX} ${CEIL}H${RIGHT}`} stroke="var(--op-crimson)" {...draw(1)} />
      <motion.text {...label} x={RIGHT} y={CEIL - 10} textAnchor="end" fill="var(--op-crimson)" {...fade(2)}>
        CEILING
      </motion.text>

      {/* growth flattening into it — stops 6px clear of the ceiling */}
      <motion.path
        {...strokeDraw}
        d={`M${AX} 206 C110 206 150 112 210 84 C252 64 322 62 ${RIGHT} 62`}
        {...draw(2)}
      />

      {/* dependency stacking up underneath — dashed, so it fades */}
      {[80, 130, 180, 230].map((x, i) => (
        <motion.path
          key={x}
          {...stroke}
          strokeDasharray="3 4"
          d={`M${x} ${BASE}V${BASE - (44 + i * 16)}`}
          {...fade(3 + i, 0.5)}
        />
      ))}

      <motion.text {...label} x={AX} y={BASE + 22} {...fade(5)}>
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

  const ROW = 30, FIRST = 76, TOP = 12;
  const rows = Math.max(you.length, us.length);
  const H = FIRST + (rows - 1) * ROW + 26;   // last baseline + breathing room
  const BOX_H = H - TOP - 12;

  const col = (x: number, title: string, items: string[], crimson: boolean, o: number) => (
    <g>
      <motion.rect
        {...stroke}
        x={x}
        y={TOP}
        width={232}
        height={BOX_H}
        stroke={crimson ? "var(--op-crimson)" : "currentColor"}
        {...fade(o)}
      />
      <motion.text
        {...label}
        x={x + 18}
        y={TOP + 26}
        fill={crimson ? "var(--op-crimson)" : "currentColor"}
        {...fade(o + 1)}
      >
        {title}
      </motion.text>
      <motion.path {...strokeDraw} d={`M${x} ${TOP + 40}H${x + 232}`} {...draw(o + 1)} opacity={0.4} />
      {items.map((item, i) => (
        <motion.text key={item} {...label} x={x + 18} y={FIRST + i * ROW} opacity={0.78} {...fade(o + 2 + i * 0.5)}>
          {item.toUpperCase()}
        </motion.text>
      ))}
    </g>
  );

  return (
    <svg viewBox={`0 0 520 ${H}`} className={className} aria-hidden="true" focusable="false">
      {col(10, "YOU", you, false, 0)}
      {col(278, "PROATOPS", us, true, 1)}
      {/* the seam between them — a boundary, not a wall */}
      <motion.path
        {...stroke}
        strokeDasharray="4 5"
        d={`M260 ${TOP + 14}V${TOP + BOX_H - 14}`}
        {...fade(2, 0.55)}
      />
    </svg>
  );
}

/* ============================================================
   04 — THE METHOD   (horizontal, 6 steps)
   ============================================================ */
export function MethodFlow({
  steps,
  className = "",
}: DiagramProps & { steps: { index: string; title: string }[] }) {
  const draw = useDraw();
  const fade = useFade();

  const W = 520, BOX = 34, CY = 30;
  const slot = W / steps.length;
  const cx = (i: number) => slot * i + slot / 2;
  const half = BOX / 2;

  return (
    <svg viewBox="0 0 520 88" className={className} aria-hidden="true" focusable="false">
      {/* connectors sit BETWEEN boxes — never through the numbers */}
      {steps.slice(0, -1).map((s, i) => (
        <motion.path
          key={`c-${s.index}`}
          {...strokeDraw}
          d={`M${cx(i) + half} ${CY}H${cx(i + 1) - half}`}
          {...draw(i)}
        />
      ))}

      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        const c = isLast ? "var(--op-crimson)" : "currentColor";
        return (
          <g key={s.index}>
            <motion.rect
              {...stroke}
              fill={nodeFill}
              x={cx(i) - half}
              y={CY - half}
              width={BOX}
              height={BOX}
              stroke={c}
              {...fade(i)}
            />
            <motion.text {...label} x={cx(i)} y={CY + 4} textAnchor="middle" fill={c} {...fade(i + 0.5)}>
              {s.index}
            </motion.text>
            <motion.text {...label} x={cx(i)} y={72} textAnchor="middle" opacity={0.72} {...fade(i + 1)}>
              {s.title}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   05 — THE AUDIT PROCESS   (vertical, 6 steps)
   ============================================================ */
export function ProcessFlow({
  steps,
  className = "",
}: DiagramProps & { steps: { index: string; title: string }[] }) {
  const draw = useDraw();
  const fade = useFade();

  const BOX = 30, CX = 29, FIRST = 22, GAP = 58;
  const cy = (i: number) => FIRST + i * GAP;
  const half = BOX / 2;
  const H = cy(steps.length - 1) + half + 12;

  return (
    <svg viewBox={`0 0 300 ${H}`} className={className} aria-hidden="true" focusable="false">
      {/* spine segments between boxes only */}
      {steps.slice(0, -1).map((s, i) => (
        <motion.path
          key={`c-${s.index}`}
          {...strokeDraw}
          d={`M${CX} ${cy(i) + half}V${cy(i + 1) - half}`}
          {...draw(i)}
        />
      ))}

      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        const c = isLast ? "var(--op-crimson)" : "currentColor";
        return (
          <g key={s.index}>
            <motion.rect
              {...stroke}
              fill={nodeFill}
              x={CX - half}
              y={cy(i) - half}
              width={BOX}
              height={BOX}
              stroke={c}
              {...fade(i)}
            />
            <motion.text {...label} x={CX} y={cy(i) + 4} textAnchor="middle" fill={c} {...fade(i + 0.5)}>
              {s.index}
            </motion.text>
            <motion.text {...label} x={60} y={cy(i) + 4} opacity={0.82} {...fade(i + 1)}>
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
  beforeTitle = "BEFORE",
  afterTitle = "WITH PROATOPS",
  className = "",
}: DiagramProps & {
  before: string[];
  after: string[];
  beforeTitle?: string;
  afterTitle?: string;
}) {
  const draw = useDraw();
  const fade = useFade();

  const MARK = 14, FIRST = 62, GAP = 42;
  const rows = Math.max(before.length, after.length);
  const cy = (i: number) => FIRST + i * GAP;
  const half = MARK / 2;
  const H = cy(rows - 1) + half + 16;

  const column = (
    railX: number,
    textX: number,
    title: string,
    items: string[],
    crimson: boolean,
    o: number
  ) => {
    const c = crimson ? "var(--op-crimson)" : "currentColor";
    return (
      <g>
        <motion.text {...label} x={railX - half} y={30} fill={c} {...fade(o)}>
          {title}
        </motion.text>
        {/* rail segments between markers, so nothing is bisected */}
        {items.slice(0, -1).map((item, i) => (
          <motion.path
            key={`r-${item}`}
            {...strokeDraw}
            stroke={c}
            d={`M${railX} ${cy(i) + half}V${cy(i + 1) - half}`}
            opacity={crimson ? 1 : 0.5}
            {...draw(o + i)}
          />
        ))}
        {items.map((item, i) => (
          <g key={item}>
            <motion.rect
              {...stroke}
              fill={nodeFill}
              stroke={c}
              x={railX - half}
              y={cy(i) - half}
              width={MARK}
              height={MARK}
              opacity={crimson ? 1 : 0.65}
              {...fade(o + i)}
            />
            <motion.text
              {...label}
              x={textX}
              y={cy(i) + 4}
              opacity={crimson ? 1 : 0.62}
              {...fade(o + i + 0.5)}
            >
              {item.toUpperCase()}
            </motion.text>
          </g>
        ))}
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 560 ${H}`} className={className} aria-hidden="true" focusable="false">
      {column(29, 50, beforeTitle, before, false, 0)}
      {column(307, 328, afterTitle, after, true, 1)}
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

  const CX = 280;
  const OWNER_Y = 8, OWNER_H = 34;          //   8 →  42
  const OS_Y = 62, OS_H = 40;                //  62 → 102
  const FAN_Y = 120;
  const PILL_Y = 136, PILL_H = 34;           // 136 → 170
  const JOIN_Y = 186;
  const STACK_Y = 204, STACK_H = 34, STACK_GAP = 52;

  const PW = 96, PGAP = 6;
  const totalW = pillars.length * PW + (pillars.length - 1) * PGAP;
  const startX = (560 - totalW) / 2;
  const pcx = (i: number) => startX + i * (PW + PGAP) + PW / 2;

  const stackY = (i: number) => STACK_Y + i * STACK_GAP;
  const H = stackY(stack.length - 1) + STACK_H + 12;

  return (
    <svg viewBox={`0 0 560 ${H}`} className={className} aria-hidden="true" focusable="false">
      {/* owner */}
      <motion.rect {...stroke} fill={nodeFill} x={205} y={OWNER_Y} width={150} height={OWNER_H} {...fade(0)} />
      <motion.text {...label} x={CX} y={OWNER_Y + 22} textAnchor="middle" {...fade(1)}>
        BUSINESS OWNER
      </motion.text>
      <motion.path {...strokeDraw} d={`M${CX} ${OWNER_Y + OWNER_H}V${OS_Y}`} {...draw(1)} />

      {/* the OS band */}
      <motion.rect
        {...stroke}
        fill={nodeFill}
        x={150}
        y={OS_Y}
        width={260}
        height={OS_H}
        stroke="var(--op-crimson)"
        {...fade(2)}
      />
      <motion.text {...label} x={CX} y={OS_Y + 25} textAnchor="middle" fill="var(--op-crimson)" {...fade(3)}>
        PROATOPS OS
      </motion.text>

      {/* fan out */}
      <motion.path {...strokeDraw} d={`M${CX} ${OS_Y + OS_H}V${FAN_Y}`} {...draw(3)} />
      <motion.path {...strokeDraw} d={`M${pcx(0)} ${FAN_Y}H${pcx(pillars.length - 1)}`} {...draw(4)} />

      {pillars.map((p, i) => (
        <g key={p}>
          <motion.path {...strokeDraw} d={`M${pcx(i)} ${FAN_Y}V${PILL_Y}`} {...draw(5 + i)} />
          <motion.rect
            {...stroke}
            fill={nodeFill}
            x={startX + i * (PW + PGAP)}
            y={PILL_Y}
            width={PW}
            height={PILL_H}
            {...fade(5 + i)}
          />
          <motion.text {...label} fontSize={9} x={pcx(i)} y={PILL_Y + 21} textAnchor="middle" {...fade(6 + i)}>
            {p}
          </motion.text>
          <motion.path {...strokeDraw} d={`M${pcx(i)} ${PILL_Y + PILL_H}V${JOIN_Y}`} {...draw(7 + i)} />
        </g>
      ))}

      {/* collect */}
      <motion.path {...strokeDraw} d={`M${pcx(0)} ${JOIN_Y}H${pcx(pillars.length - 1)}`} {...draw(11)} />
      <motion.path {...strokeDraw} d={`M${CX} ${JOIN_Y}V${STACK_Y}`} {...draw(12)} />

      {/* data → intelligence → ai → scale */}
      {stack.map((s, i) => {
        const y = stackY(i);
        const isLast = i === stack.length - 1;
        const c = isLast ? "var(--op-crimson)" : "currentColor";
        return (
          <g key={s}>
            <motion.rect
              {...stroke}
              fill={nodeFill}
              x={205}
              y={y}
              width={150}
              height={STACK_H}
              stroke={c}
              {...fade(12 + i)}
            />
            <motion.text {...label} x={CX} y={y + 22} textAnchor="middle" fill={c} {...fade(13 + i)}>
              {s}
            </motion.text>
            {!isLast && (
              <motion.path {...strokeDraw} d={`M${CX} ${y + STACK_H}V${stackY(i + 1)}`} {...draw(13 + i)} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
