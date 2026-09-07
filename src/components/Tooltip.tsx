import type { Placement } from "@floating-ui/react-dom";
import {
	arrow,
	flip,
	offset,
	shift,
	useFloating,
} from "@floating-ui/react-dom";
import { clsx } from "clsx";
import { useRef } from "react";

//
//
//

interface TooltipProps {
	open: boolean;
	offset?: number;
	placement?: Placement;
	message: string;
	variant?: "default" | "primary" | "secondary";
	children: React.ReactNode;
}

//
//
//

/**
 * Tooltip component
 *
 * Displays a tooltip above the trigger element using floating-ui.
 * Arrow automatically points to the trigger element.
 *
 * @example
 * <Tooltip open={isHovered} message="Help text">
 *   <button>Hover me</button>
 * </Tooltip>
 */
const Tooltip = ({
	open,
	offset: offsetSize = 12,
	placement = "top",
	message,
	variant = "default",
	children,
}: TooltipProps) => {
	const arrowRef = useRef(null);

	const {
		refs,
		floatingStyles,
		middlewareData,
		placement: resolvedPlacement,
	} = useFloating({
		placement,
		middleware: [
			offset(offsetSize),
			flip(),
			shift({ padding: 8 }),
			arrow({
				element: arrowRef,
			}),
		],
	});

	return (
		<>
			<div ref={refs.setReference} className="w-fit">
				{children}
			</div>

			{open && (
				<div ref={refs.setFloating} style={floatingStyles} className="z-30">
					<div
						className={clsx(
							"py-padding-2 px-padding-3 typo-body-small rounded-radius-medium1 select-none",
							{
								"bg-color-gray-5 text-color-alpha-black100":
									variant === "default",
								"bg-color-primary-5 text-color-primary-50":
									variant === "primary",
								"bg-color-secondary-5 text-color-secondary-50":
									variant === "secondary",
							},
						)}
					>
						<p className="relative z-10">{message}</p>
						<div
							ref={arrowRef}
							className="absolute size-2 bg-inherit rotate-45"
							style={
								resolvedPlacement.startsWith("left") ||
								resolvedPlacement.startsWith("right")
									? {
											top: middlewareData.arrow?.y,
											...(resolvedPlacement.startsWith("left")
												? { right: -8 }
												: { left: -8 }),
										}
									: {
											left: middlewareData.arrow?.x,
											...(resolvedPlacement.startsWith("top")
												? { bottom: -8 }
												: { top: -8 }),
										}
							}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Tooltip;
