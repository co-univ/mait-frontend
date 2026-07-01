import type { Placement } from "@floating-ui/react-dom";
import { type CSSProperties, forwardRef } from "react";

//
//
//

const CIRCLE_RADIUS = 2.5;

interface DashedArrowProps {
	placement: Placement;
	style?: CSSProperties;
}

//
//
//

const OnboardingDashedLine = forwardRef<SVGSVGElement, DashedArrowProps>(
	({ placement, style }, ref) => {
		const isVertical =
			placement.startsWith("top") || placement.startsWith("bottom");

		if (isVertical) {
			return (
				<svg
					ref={ref}
					width="6"
					height="32"
					viewBox="0 0 6 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					style={style}
				>
					<circle cx="3" cy={CIRCLE_RADIUS} r={CIRCLE_RADIUS} fill="white" />
					<line
						x1="3"
						y1={CIRCLE_RADIUS * 2}
						x2="3"
						y2="32"
						stroke="white"
						strokeWidth="1.5"
						strokeDasharray="4 3"
					/>
				</svg>
			);
		}

		return (
			<svg
				ref={ref}
				width="80"
				height="6"
				viewBox="0 0 80 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				style={style}
			>
				<circle cx={CIRCLE_RADIUS} cy="3" r={CIRCLE_RADIUS} fill="white" />
				<line
					x1={CIRCLE_RADIUS * 2}
					y1="3"
					x2="80"
					y2="3"
					stroke="white"
					strokeWidth="1.5"
					strokeDasharray="4 3"
				/>
			</svg>
		);
	},
);

OnboardingDashedLine.displayName = "OnboardingDashedLine";

export default OnboardingDashedLine;
