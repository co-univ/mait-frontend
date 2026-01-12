import { useState } from "react";
import SolvingAnswerFillBlank from "@/domains/solving/components/common/answer/SolvingAnswerFillBlank";
import type {
	FillBlankQuestionApiResponse,
	FillBlankSubmitAnswer,
} from "@/libs/types";

//
//
//

interface CreationQuestionPreviewModalFillBlankAnswersProps {
	question: FillBlankQuestionApiResponse;
}

//
//
//

const CreationQuestionPreviewModalFillBlankAnswers = ({
	question,
}: CreationQuestionPreviewModalFillBlankAnswersProps) => {
	const [answers, setAnswers] = useState<FillBlankSubmitAnswer[]>(
		Array.from({ length: question.blankCount }, (_, index) => ({
			number: index + 1,
			answer: "",
		})),
	);

	/**
	 *
	 */
	const handleAnswerChange = (number: number, value: string) => {
		const newAnswers = answers.map((ans) =>
			ans.number === number ? { ...ans, answer: value } : ans,
		);
		setAnswers(newAnswers);
	};

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{answers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					answer={answer}
					variation={answer.answer === "" ? "default" : "focused"}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default CreationQuestionPreviewModalFillBlankAnswers;
