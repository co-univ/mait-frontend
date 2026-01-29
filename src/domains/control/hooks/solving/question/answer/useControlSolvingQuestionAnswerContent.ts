import type React from "react";
import { useEffect, useState } from "react";

//
//
//

interface UseConstrolSolvingQuestionAnswerContentProps {
	isEditing?: boolean;
	answerContentRef: React.RefObject<HTMLParagraphElement | null>;
}

interface UseConstrolSolvingQuestionAnswerContentReturn {
	isExpanded: boolean;
	isContentOverflow: boolean;
	toggleExpanded: () => void;
}

//
//
//

const useControlSolvingQuestionAnswerContent = ({
	isEditing,
	answerContentRef,
}: UseConstrolSolvingQuestionAnswerContentProps): UseConstrolSolvingQuestionAnswerContentReturn => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isContentOverflow, setIsContentOverflow] = useState(false);

	/**
	 *
	 */
	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
	};

	//
	// Check if content overflows
	//
	useEffect(() => {
		const element = answerContentRef.current;

		if (!element) {
			return;
		}

		const checkOverflow = () => {
			setIsContentOverflow(element.scrollWidth > element.clientWidth);
		};

		checkOverflow();

		const resizeObserver = new ResizeObserver(checkOverflow);
		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, [answerContentRef]);

	//
	// Expand by default in edit mode so the state persists after saving (for better UX).
	//
	useEffect(() => {
		if (isEditing) {
			setIsExpanded(true);
		}
	}, [isEditing]);

	return {
		isExpanded,
		isContentOverflow,
		toggleExpanded,
	};
};

export default useControlSolvingQuestionAnswerContent;
