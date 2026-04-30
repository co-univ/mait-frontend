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
	readOnly?: boolean;
	isCorrect: boolean | null;
}

//
//
//

const SolvingStudyFillBlankAnswers = ({
	questionSetId,
	questionId,
	readOnly = false,
	isCorrect,
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
		if (readOnly) {
			return;
		}

		const updatedAnswers = userAnswers.map((ans) =>
			ans.number === number ? { number, answer } : ans,
		);

		setUserAnswers(questionId, updatedAnswers);
	};

	const getVariation = (number: number) => {
		const answer = userAnswers.find(
			(userAnswer) => userAnswer.number === number,
		);

		if (!answer || answer.answer === "") {
			return "default";
		}

		if (!readOnly) {
			return "focused";
		}

		return isCorrect ? "correct" : "incorrect";
	};

	useEffect(() => {
		if (blankCount > 0 && userAnswers.length < blankCount) {
			const existingNumbers = new Set(userAnswers.map((answer) => answer.number));
			const missingAnswers = Array.from({ length: blankCount }, (_, index) => index + 1)
				.filter((number) => !existingNumbers.has(number))
				.map((number) => ({
					number,
					answer: "",
				}));

			setUserAnswers(questionId, [...userAnswers, ...missingAnswers]);
		}
	}, [blankCount, userAnswers, questionId, setUserAnswers]);

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{userAnswers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					readOnly={readOnly}
					answer={answer}
					variation={getVariation(answer.number)}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default SolvingStudyFillBlankAnswers;
