/** Shared easing curves. Mirrors `--ease-fluid` / `--ease-expo` in globals.css. */
export const EASE_FLUID = [0.32, 0.72, 0, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Spring used to smooth raw scroll progress before it drives transforms. */
export const SCROLL_SPRING = { stiffness: 120, damping: 30, mass: 0.25 } as const;
