/**
 * The motion constants every reveal on the site draws from, so the whole
 * page moves with one voice: one easing curve, one entrance length, one
 * stagger step. Change them here, not at the call site.
 */

/** Expo-out: fast to arrive, long to settle. The only curve reveals use. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Scroll-in reveals (opacity + a short rise). */
export const DUR = 0.7;

/** Step between siblings in a list or grid. */
export const STAGGER = 0.06;
