/**
 * Question navigation layout constants
 */

export const BUTTON_SIZE = 64;
export const GAP = 2;
export const CONTROL_BUTTON_COUNT = 2;

export const BUTTON_SIZES = {
	default: 64,
	small: 42,
} as const;

export const GAPS = {
	default: 2,
	small: 12,
} as const;

export type QuestionNavigationVariation = keyof typeof BUTTON_SIZES;
