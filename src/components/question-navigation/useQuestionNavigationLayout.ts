import { useCallback, useEffect, useRef, useState } from "react";
import { BUTTON_SIZE, CONTROL_BUTTON_COUNT, GAP } from "./constants";

//
//
//

interface UseQuestionNavigationLayoutProps<T extends { id: number }> {
	hasAddButton: boolean;
	orientation: "vertical" | "horizontal";
	activeQuestionId: number;
	questions: T[];
}

interface UseQuestionNavigationLayoutReturn {
	canScrollUp: boolean;
	canScrollDown: boolean;
	containerRef: React.RefObject<HTMLDivElement | null>;
	listRef: React.RefObject<HTMLDivElement | null>;
	handleScrollUp: () => void;
	handleScrollDown: () => void;
	scrollToBottom: () => void;
	getVisibleRange: () => { startIndex: number; endIndex: number };
}

//
//
//

const useQuestionNavigationLayout = <T extends { id: number }>({
	hasAddButton,
	orientation,
	activeQuestionId,
	questions,
}: UseQuestionNavigationLayoutProps<T>): UseQuestionNavigationLayoutReturn => {
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const [canScrollUp, setCanScrollUp] = useState(false);
	const [canScrollDown, setCanScrollDown] = useState(false);
	const [listSizeUpdateSignal, setListSizeUpdateSignal] = useState(0);

	const isVertical = orientation === "vertical";

	const controlButtonCount = CONTROL_BUTTON_COUNT + Number(hasAddButton);

	/**
	 *
	 */
	const getClientSize = useCallback(
		(element: HTMLElement): number => {
			return isVertical ? element.clientHeight : element.clientWidth;
		},
		[isVertical],
	);

	/**
	 *
	 */
	const getScrollSize = useCallback(
		(element: HTMLElement): number => {
			return isVertical ? element.scrollHeight : element.scrollWidth;
		},
		[isVertical],
	);

	/**
	 *
	 */
	const getScrollPosition = useCallback(
		(element: HTMLElement): number => {
			return isVertical ? element.scrollTop : element.scrollLeft;
		},
		[isVertical],
	);

	/**
	 *
	 */
	const handleScrollUp = () => {
		const list = listRef.current;

		if (!list || !canScrollUp) {
			return;
		}

		const listSize = getClientSize(list);
		const scrollAmount = listSize + GAP;

		list.scrollBy({
			top: isVertical ? -scrollAmount : 0,
			left: isVertical ? 0 : -scrollAmount,
			behavior: "smooth",
		});
	};

	/**
	 *
	 */
	const handleScrollDown = () => {
		const list = listRef.current;

		if (!list || !canScrollDown) {
			return;
		}

		const listSize = getClientSize(list);
		const scrollAmount = listSize + GAP;

		list.scrollBy({
			top: isVertical ? scrollAmount : 0,
			left: isVertical ? 0 : scrollAmount,
			behavior: "smooth",
		});
	};

	/**
	 * Scroll to bottom (show last questions)
	 * @warning This function only used when a new question is added. When question is added, this function called before questionLength is updated
	 */
	const scrollToBottom = () => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		list.scrollTo({
			top: isVertical ? getScrollSize(list) : 0,
			left: isVertical ? 0 : getScrollSize(list),
			behavior: "smooth",
		});
	};

	/**
	 *
	 */
	const getVisibleRange = useCallback(() => {
		const list = listRef.current;

		if (!list) {
			return { startIndex: 0, endIndex: 0 };
		}

		const scrollPosition = getScrollPosition(list);
		const listSize = getClientSize(list);

		const startIndex = Math.floor(scrollPosition / (BUTTON_SIZE + GAP));
		const endIndex = Math.min(
			Math.ceil((scrollPosition + listSize) / (BUTTON_SIZE + GAP)) - 1,
			questions.length - 1,
		);

		return { startIndex, endIndex };
	}, [getScrollPosition, getClientSize, questions.length]);

	//
	// Scroll to active question if it's out of view
	// biome-ignore lint/correctness/useExhaustiveDependencies: prevent calling effect when list size is changed
	useEffect(() => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		const activeQuestionIndex = questions.findIndex(
			(q) => q.id === activeQuestionId,
		);

		if (activeQuestionIndex === -1) {
			return;
		}

		const listSize = getClientSize(list);
		const scrollPosition = getScrollPosition(list);

		if (listSize === 0) {
			return;
		}

		const itemPosition =
			activeQuestionIndex * BUTTON_SIZE + activeQuestionIndex * GAP;

		// Check if active question is out of view
		if (
			itemPosition < scrollPosition ||
			itemPosition >= scrollPosition + listSize
		) {
			list.scrollTo({
				top: isVertical ? itemPosition : 0,
				left: isVertical ? 0 : itemPosition,
				behavior: "smooth",
			});
		}
	}, [
		questions,
		activeQuestionId,
		isVertical,
		listSizeUpdateSignal,
		getClientSize,
		getScrollPosition,
	]);

	//
	// Handle question navigation list size if question navigation container size changes
	//
	useEffect(() => {
		const container = containerRef.current;
		const list = listRef.current;

		if (!container || !list) {
			return;
		}

		const handleListSize = () => {
			list.style.height = "0";
			list.style.width = "0";

			const containerSize = getClientSize(container);

			const availableSize =
				containerSize -
				controlButtonCount * BUTTON_SIZE -
				controlButtonCount * GAP;

			const count = Math.min(
				Math.floor((availableSize + GAP) / (BUTTON_SIZE + GAP)),
				questions.length,
			);

			const size = Math.max(count * BUTTON_SIZE + (count - 1) * GAP, 0);

			list.style.height = isVertical ? `${size}px` : "auto";
			list.style.width = !isVertical ? `${size}px` : "auto";

			setListSizeUpdateSignal((prev) => prev + 1);
		};

		handleListSize();

		const resizeObserver = new ResizeObserver(() => {
			handleListSize();
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, [isVertical, controlButtonCount, questions, getClientSize]);

	//
	// Update scroll position when scrolling
	// biome-ignore lint/correctness/useExhaustiveDependencies: can scroll value need to be calculated when questions are fetcehd for container resizing
	useEffect(() => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		const handleCanScroll = () => {
			const listSize = getClientSize(list);
			const scrollPosition = getScrollPosition(list);
			const scrollSize = getScrollSize(list);

			setCanScrollUp(scrollPosition > 0);
			setCanScrollDown(listSize + scrollPosition < scrollSize);
		};

		handleCanScroll();
		list.addEventListener("scroll", handleCanScroll);

		return () => {
			list.removeEventListener("scroll", handleCanScroll);
		};
	}, [isVertical, questions, getClientSize, getScrollPosition, getScrollSize]);

	return {
		canScrollUp,
		canScrollDown,
		containerRef,
		listRef,
		handleScrollUp,
		handleScrollDown,
		scrollToBottom,
		getVisibleRange,
	};
};

export default useQuestionNavigationLayout;
