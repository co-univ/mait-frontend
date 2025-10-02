import { useEffect, useRef, useState } from "react";
import { BUTTON_SIZE, CONTROL_BUTTON_COUNT, GAP } from "./constants";

//
//
//

interface UseQuestionNavigationLayoutProps {
	orientation: "vertical" | "horizontal";
	questionLength: number;
}

interface UseQuestionNavigationLayoutReturn {
	containerRef: React.RefObject<HTMLDivElement | null>;
	startIndex: number;
	visibleCount: number;
	canScrollUp: boolean;
	canScrollDown: boolean;
	handleScrollUp: () => void;
	handleScrollDown: () => void;
}

//
//
//

const useQuestionNavigationLayout = ({
	orientation,
	questionLength,
}: UseQuestionNavigationLayoutProps): UseQuestionNavigationLayoutReturn => {
	const [startIndex, setStartIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(10);

	const containerRef = useRef<HTMLDivElement>(null);

	const isVertical = orientation === "vertical";

	const canScrollUp = startIndex > 0;
	const canScrollDown = startIndex + visibleCount < questionLength;

	/**
	 * Scroll to previous group of questions
	 */
	const handleScrollUp = () => {
		if (canScrollUp) {
			setStartIndex((prev) => Math.max(0, prev - visibleCount));
		}
	};

	/**
	 * Scroll to next group of questions
	 */
	const handleScrollDown = () => {
		if (canScrollDown) {
			setStartIndex((prev) => {
				const nextIndex = prev + visibleCount;
				const maxIndex = questionLength - visibleCount;
				return Math.min(maxIndex, nextIndex);
			});
		}
	};

	//
	// Calculate how many questions can fit in the viewport
	// biome-ignore lint/correctness/useExhaustiveDependencies: this effect can catch containerRef's size when container is mounted
	useEffect(() => {
		const calculateVisibleCount = () => {
			if (!containerRef.current) {
				return;
			}

			const clientSize = isVertical
				? containerRef.current.clientHeight
				: containerRef.current.clientWidth;

			const availableSize =
				clientSize -
				CONTROL_BUTTON_COUNT * BUTTON_SIZE -
				CONTROL_BUTTON_COUNT * GAP;

			const count = Math.floor(availableSize / (BUTTON_SIZE + GAP));
			setVisibleCount(Math.max(1, count));
		};

		calculateVisibleCount();
		window.addEventListener("resize", calculateVisibleCount);

		return () => window.removeEventListener("resize", calculateVisibleCount);
	}, [isVertical, containerRef.current]);

	return {
		containerRef,
		startIndex,
		visibleCount,
		canScrollUp,
		canScrollDown,
		handleScrollUp,
		handleScrollDown,
	};
};

export default useQuestionNavigationLayout;
