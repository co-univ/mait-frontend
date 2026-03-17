import { useEffect, useState } from "react";

//
//
//

interface DashboardMySolvingCircleStatusProps {
	percentage: number;
}

//
//
//

const SIZE = 100;
const STROKE_WIDTH = 8;
const ANIMATION_DURATION = 1500;
const ANIMATION_EASING_POWER = 2;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

//
//
//

const DashboardMySolvingCircleStatus = ({
	percentage,
}: DashboardMySolvingCircleStatusProps) => {
	const [displayPercentage, setDisplayPercentage] = useState(0);

	const dashOffset = CIRCUMFERENCE - (displayPercentage / 100) * CIRCUMFERENCE;

	//
	useEffect(() => {
		let rafId: number;
		let startTime: number | null = null;
		const animate = (timestamp: number) => {
			if (!startTime) {
				startTime = timestamp;
			}

			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
			const eased = 1 - (1 - progress) ** ANIMATION_EASING_POWER;

			setDisplayPercentage(Math.round(eased * percentage));

			if (progress < 1) {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(rafId);
	}, [percentage]);

	return (
		<div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
			<svg
				width={SIZE}
				height={SIZE}
				viewBox={`0 0 ${SIZE} ${SIZE}`}
				style={{ transform: "rotate(-90deg)" }}
				aria-hidden="true"
			>
				<circle
					cx={SIZE / 2}
					cy={SIZE / 2}
					r={RADIUS}
					fill="none"
					stroke="#d8e5fd"
					strokeWidth={STROKE_WIDTH}
					strokeLinecap="round"
				/>
				<circle
					cx={SIZE / 2}
					cy={SIZE / 2}
					r={RADIUS}
					fill="none"
					stroke="#256ef4"
					strokeWidth={STROKE_WIDTH}
					strokeLinecap="round"
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={dashOffset}
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-color-primary-50 text-center">
				<span className="typo-heading-xsmall">{displayPercentage}%</span>
				<span className="typo-body-xsmall-bold">총합</span>
			</div>
		</div>
	);
};

export default DashboardMySolvingCircleStatus;
