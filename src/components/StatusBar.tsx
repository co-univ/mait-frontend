import clsx from "clsx";
import { useEffect, useState } from "react";

//
//
//

const ANIMATION_DURATION = 1500;

type StatusBarColor = "primary" | "danger";

const BAR_COLOR_CLASS: Record<StatusBarColor, string> = {
	primary: "bg-color-primary-50",
	danger: "bg-color-danger-50",
};

interface StatusBarProps {
	rate: number;
	height?: number;
	className?: string;
	color?: StatusBarColor;
}

//
//
//

const StatusBar = ({
	rate,
	height = 10,
	className,
	color = "primary",
}: StatusBarProps) => {
	const clamped = Math.min(100, Math.max(0, rate));
	const [active, setActive] = useState(false);

	//
	useEffect(() => {
		const id = requestAnimationFrame(() => setActive(true));

		return () => cancelAnimationFrame(id);
	}, []);

	return (
		<div
			className={clsx(
				"w-full overflow-hidden rounded-full bg-color-gray-10",
				className,
			)}
			style={{ height }}
		>
			<div
				className={clsx("h-full w-full rounded-full", BAR_COLOR_CLASS[color])}
				style={{
					transform: `translateX(-${active ? 100 - clamped : 100}%)`,
					transition: `transform ${ANIMATION_DURATION}ms ease-out`,
				}}
			/>
		</div>
	);
};

export default StatusBar;
