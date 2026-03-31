import { useEffect, useState } from "react";

//
//
//

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

interface BreakpointState {
	breakpoint: Breakpoint | "xs";
	isSm: boolean;
	isMd: boolean;
	isLg: boolean;
	isXl: boolean;
	is2xl: boolean;
}

interface UseBreakPointReturn extends BreakpointState {
	isMobile: boolean;
}

//
//
//

const getBreakpoint = (width: number): Breakpoint | "xs" => {
	if (width >= breakpoints["2xl"]) return "2xl";
	if (width >= breakpoints.xl) return "xl";
	if (width >= breakpoints.lg) return "lg";
	if (width >= breakpoints.md) return "md";
	if (width >= breakpoints.sm) return "sm";
	return "xs";
};

const getState = (width: number): BreakpointState => {
	return {
		breakpoint: getBreakpoint(width),
		isSm: width >= breakpoints.sm,
		isMd: width >= breakpoints.md,
		isLg: width >= breakpoints.lg,
		isXl: width >= breakpoints.xl,
		is2xl: width >= breakpoints["2xl"],
	};
};

/**
 * Returns the current breakpoint state based on Tailwind CSS default breakpoints.
 *
 * Breakpoints (min-width):
 *   xs  —   0px  (below sm)
 *   sm  — 640px
 *   md  — 768px
 *   lg  — 1024px
 *   xl  — 1280px
 *   2xl — 1536px
 *
 * The `isXx` flags follow Tailwind's mobile-first convention,
 * meaning they are `true` when the viewport is AT OR ABOVE that breakpoint.
 *
 * @example
 * // Render different layouts based on breakpoint
 * const { isMd } = useBreakpoint();
 * return isMd ? <DesktopLayout /> : <MobileLayout />;
 *
 * @example
 * // Get the exact current breakpoint name
 * const { breakpoint } = useBreakpoint();
 * console.log(breakpoint); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 *
 * @example
 * // Apply conditional styles
 * const { isLg } = useBreakpoint();
 * return <div className={isLg ? 'text-xl' : 'text-base'}>Hello</div>;
 */
const useBreakpoint = (): UseBreakPointReturn => {
	const [state, setState] = useState<BreakpointState>(() =>
		getState(window.innerWidth),
	);

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setState(getState(window.innerWidth));
		});

		observer.observe(document.documentElement);

		return () => observer.disconnect();
	}, []);

	return {
		...state,
		isMobile: !state.isSm,
	};
};

export default useBreakpoint;
