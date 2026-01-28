import { useRef } from "react";
import useControlSolvingQuestionAnswerContent from "@/domains/control/hooks/solving/question/answer/useControlSolvingQuestionAnswerContent";
import type { OrderingOptionApiResponse } from "@/libs/types";
import ControlSolvingQuestionAnswer from "./answer/ControlSolvingQuestionAnswer";
import ControlSolvingQuestionAnswerContent from "./answer/ControlSolvingQuestionAnswerContent";
import ControlSolvingQuestionAnswerExpandButton from "./answer/ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionOrderingAnswerProps {
	option: OrderingOptionApiResponse;
}

//
//
//

const ControlSolvingQuestionOrderingAnswer = ({
	option,
}: ControlSolvingQuestionOrderingAnswerProps) => {
	const answerContentRef = useRef<HTMLParagraphElement>(null);

	const { isExpanded, isContentOverflow, toggleExpanded } =
		useControlSolvingQuestionAnswerContent({
			answerContentRef,
		});

	return (
		<div className="flex items-center gap-gap-9">
			<div className="typo-heading-xsmall">
				{String.fromCharCode(64 + option.originOrder)}
			</div>
			<ControlSolvingQuestionAnswer>
				<ControlSolvingQuestionAnswerContent
					ref={answerContentRef}
					expanded={isExpanded}
					content={option.content ?? ""}
				/>
				<ControlSolvingQuestionAnswerExpandButton
					expanded={isExpanded}
					hide={!isContentOverflow && !isExpanded}
					onClick={toggleExpanded}
				/>
			</ControlSolvingQuestionAnswer>
		</div>
	);
};

export default ControlSolvingQuestionOrderingAnswer;
