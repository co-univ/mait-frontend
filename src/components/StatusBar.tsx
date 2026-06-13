import clsx from "clsx";
import { useEffect, useState } from "react";

//
//
//

const ANIMATION_DURATION = 1500;

interface StatusBarProps {
	percentage: number;
	height?: number;
	className?: string;
}

//
//
//

const StatusBar = ({ percentage, height = 12, className }: StatusBarProps) => {
	const clamped = Math.min(100, Math.max(0, percentage));
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
				className="h-full w-full rounded-full bg-color-primary-50"
				style={{
					transform: `translateX(-${active ? 100 - clamped : 100}%)`,
					transition: `transform ${ANIMATION_DURATION}ms ease-out`,
				}}
			/>
		</div>
	);
};

export default StatusBar;
