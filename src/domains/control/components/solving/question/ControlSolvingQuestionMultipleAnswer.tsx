import { useRef } from "react";
import useControlSolvingQuestionAnswerContent from "@/domains/control/hooks/solving/question/answer/useControlSolvingQuestionAnswerContent";
import ControlSolvingQuestionAnswer from "./answer/ControlSolvingQuestionAnswer";
import ControlSolvingQuestionAnswerContent from "./answer/ControlSolvingQuestionAnswerContent";
import ControlSolvingQuestionAnswerExpandButton from "./answer/ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionMultipleAnswerProps {
	isCorrect: boolean;
	content?: string;
}

//
//
//

const ControlSolvingQuestionMultipleAnswer = ({
	isCorrect,
	content,
}: ControlSolvingQuestionMultipleAnswerProps) => {
	const answerContentRef = useRef<HTMLParagraphElement>(null);

	const { isExpanded, isContentOverflow, toggleExpanded } =
		useControlSolvingQuestionAnswerContent({
			answerContentRef,
		});

	return (
		<ControlSolvingQuestionAnswer variant={isCorrect ? "focused" : "default"}>
			<ControlSolvingQuestionAnswerContent
				ref={answerContentRef}
				expanded={isExpanded}
				variant={isCorrect ? "focused" : "default"}
				content={content ?? ""}
			/>
			<ControlSolvingQuestionAnswerExpandButton
				expanded={isExpanded}
				hide={!isContentOverflow && !isExpanded}
				onClick={toggleExpanded}
			/>
		</ControlSolvingQuestionAnswer>
	);
};

export default ControlSolvingQuestionMultipleAnswer;
