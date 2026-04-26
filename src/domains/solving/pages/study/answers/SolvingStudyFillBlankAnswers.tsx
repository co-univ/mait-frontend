import { useEffect } from "react";
import type {
	FillBlankQuestionApiResponse,
	FillBlankSubmitAnswer,
} from "@/libs/types";
import SolvingAnswerFillBlank from "@/domains/solving/components/common/answer/SolvingAnswerFillBlank";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import useSolvingStudyAnswerStore from "@/domains/solving/stores/study/useSolvingStudyAnswerStore";

//
//
//

interface SolvingStudyFillBlankAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingStudyFillBlankAnswers = ({
	questionSetId,
	questionId,
}: SolvingStudyFillBlankAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "STUDY",
	});

	const fillBlankQuestion = question as
		| FillBlankQuestionApiResponse
		| undefined;
	const blankCount = fillBlankQuestion?.blankCount ?? 0;

	const { getUserAnswers, setUserAnswers } = useSolvingStudyAnswerStore();
	const userAnswers = getUserAnswers(questionId) as FillBlankSubmitAnswer[];

	/**
	 *
	 */
	const handleAnswerChange = (number: number, answer: string) => {
		const updatedAnswers = userAnswers.map((ans) =>
			ans.number === number ? { number, answer } : ans,
		);

		setUserAnswers(questionId, updatedAnswers);
	};

	useEffect(() => {
		if (blankCount > 0 && userAnswers.length !== blankCount) {
			setUserAnswers(
				questionId,
				Array.from({ length: blankCount }, (_, index) => ({
					number: index + 1,
					answer: "",
				})),
			);
		}
	}, [blankCount, userAnswers.length, questionId, setUserAnswers]);

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{userAnswers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					readOnly={false}
					answer={answer}
					variation={answer.answer === "" ? "default" : "focused"}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default SolvingStudyFillBlankAnswers;
