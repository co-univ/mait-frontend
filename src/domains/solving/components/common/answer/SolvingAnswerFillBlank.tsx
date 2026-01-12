import type { FillBlankSubmitAnswer } from "@/libs/types";
import type { SolvingAnswerProps } from "./SolvingAnswer";
import SolvingAnswer from "./SolvingAnswer";

//
//
//

interface SolvingAnswerFillBlankProps extends SolvingAnswerProps {
	answer: FillBlankSubmitAnswer;
	onAnswerChange: (number: number, answer: string) => void;
}

//
//
//

const SolvingAnswerFillBlank = ({
	answer,
	onAnswerChange,
	...props
}: SolvingAnswerFillBlankProps) => {
	return (
		<div className="flex gap-gap-9 items-center">
			<span className="typo-heading-small">({answer.number})</span>
			<SolvingAnswer
				{...props}
				content={answer.answer}
				onChange={(value) => onAnswerChange(answer.number, value)}
			/>
		</div>
	);
};

export default SolvingAnswerFillBlank;
