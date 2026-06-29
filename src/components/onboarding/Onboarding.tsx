import {
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
} from "@floating-ui/react-dom";
import clsx from "clsx";
import {
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import OnboardingDashedLine from "./OnboardingDashedLine";
import { ONBOARDING_STEPS } from "./onboarding.config";

//
//
//

interface OnboardingProps {
	stepKey: string;
	show: boolean;
	onNext?: () => void;
	children: ReactNode;
}

//
//
//

const Onboarding = ({ stepKey, show, onNext, children }: OnboardingProps) => {
	const step = ONBOARDING_STEPS[stepKey];

	const measureRef = useRef<HTMLDivElement>(null);
	const arrowRef = useRef<SVGSVGElement>(null);

	const [itemRect, setItemRect] = useState<DOMRect | null>(null);

	const { refs, floatingStyles, placement, middlewareData } = useFloating({
		placement: step?.placement ?? "right",
		middleware: [
			offset(0),
			flip(),
			shift({ padding: 8 }),
			arrow({ element: arrowRef }),
		],
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
	});

	const isVertical =
		placement.startsWith("top") || placement.startsWith("bottom");

	// lock all scroll while onboarding is active
	useEffect(() => {
		if (!show || !step) {
			return;
		}

		const SCROLL_KEYS = new Set([
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"PageUp",
			"PageDown",
			"Home",
			"End",
			" ",
		]);

		const blockScroll = (e: Event) => e.preventDefault();
		const blockKey = (e: KeyboardEvent) => {
			if (SCROLL_KEYS.has(e.key)) {
				e.preventDefault();
			}
		};

		document.addEventListener("wheel", blockScroll, { passive: false });
		document.addEventListener("touchmove", blockScroll, { passive: false });
		document.addEventListener("keydown", blockKey);

		return () => {
			document.removeEventListener("wheel", blockScroll);
			document.removeEventListener("touchmove", blockScroll);
			document.removeEventListener("keydown", blockKey);
		};
	}, [show, step]);

	// measure the real item position to clone it into Portal
	useLayoutEffect(() => {
		if (!show || !step || !measureRef.current) {
			return;
		}

		const update = () => {
			if (measureRef.current) {
				setItemRect(measureRef.current.getBoundingClientRect());
			}
		};

		update();

		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(measureRef.current);
		window.addEventListener("resize", update);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", update);
		};
	}, [show, step]);

	if (!show || !step) {
		return <>{children}</>;
	}

	// arrow middleware가 계산한 dashed line의 offset (reference 중앙 정렬)
	const arrowX = middlewareData.arrow?.x;
	const arrowY = middlewareData.arrow?.y;

	return (
		<>
			{/* measure anchor — invisible but occupies same space as children for rect measurement */}
			<div
				ref={measureRef}
				style={{ display: "inline-flex", visibility: "hidden" }}
			>
				{children}
			</div>

			{createPortal(
				<>
					{/* backdrop */}
					<div
						className="fixed inset-0 z-[60] bg-gray-90 bg-opacity-70 backdrop-blur-sm cursor-pointer"
						role="button"
						tabIndex={-1}
						onClick={onNext}
						onKeyDown={(e) => e.key === "Enter" && onNext?.()}
					/>

					{/* item clone: positioned over original item, above backdrop */}
					{itemRect && (
						<div
							ref={refs.setReference}
							className="fixed z-[61] pointer-events-none bg-alpha-white100 rounded-radius-medium1"
							style={{
								top: itemRect.top,
								left: itemRect.left,
								width: itemRect.width,
								height: itemRect.height,
							}}
						>
							{children}
						</div>
					)}

					{/* floating tooltip */}
					{itemRect && (
						<div
							ref={refs.setFloating}
							style={floatingStyles}
							className={clsx(
								"z-[62] flex items-center pointer-events-none relative",
								{
									"flex-col": isVertical,
									"flex-row": !isVertical,
									"flex-col-reverse": placement.startsWith("top"),
									"flex-row-reverse": placement.startsWith("left"),
								},
							)}
						>
							{/* dashed line as arrow — absolute, aligned to reference center */}
							<OnboardingDashedLine
								ref={arrowRef}
								placement={placement}
								style={{
									position: "absolute",
									...(isVertical
										? {
												left: arrowX,
												...(placement.startsWith("bottom")
													? { top: 0 }
													: { bottom: 0 }),
											}
										: {
												top: arrowY,
												...(placement.startsWith("right")
													? { left: 0 }
													: { right: 0 }),
											}),
								}}
							/>

							{/* spacer to push content past the dashed line */}
							{isVertical ? <div className="h-5" /> : <div className="w-13" />}

							<div className={clsx("flex items-center")}>
								{step.icon && (
									<div className="shrink-0 size-[96px] flex items-center justify-center">
										{step.icon}
									</div>
								)}
								<p className="typo-heading-medium text-color-alpha-white100">
									{step.description}
								</p>
							</div>
						</div>
					)}
				</>,
				document.body,
			)}
		</>
	);
};

export default Onboarding;
