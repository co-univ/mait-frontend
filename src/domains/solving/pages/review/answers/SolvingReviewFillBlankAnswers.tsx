import { useEffect } from "react";
import type {
	FillBlankQuestionApiResponse,
	FillBlankSubmitAnswer,
	GradedAnswerFillBlankResult,
} from "@/libs/types";
import SolvingAnswerFillBlank from "../../../components/common/answer/SolvingAnswerFillBlank";
import useSolvingReviewAnswerResultStore from "../../../stores/review/useSolvingReviewAnswerResultStore";
import useSolvingQuestion from "../../../hooks/common/useSolvingQuestion";

//
//
//

interface SolvingReviewFillBlankAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewFillBlankAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewFillBlankAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "REVIEW",
	});

	const fillBlankQuestion = question as
		| FillBlankQuestionApiResponse
		| undefined;
	const blankCount = fillBlankQuestion?.blankCount ?? 0;

	const { getUserAnswers, setUserAnswers, getIsSubmitted, getIsGradedResults } =
		useSolvingReviewAnswerResultStore();

	const userAnswers = getUserAnswers(questionId) as FillBlankSubmitAnswer[];
	const isSubmitted = getIsSubmitted(questionId);
	const gradedResults = getIsGradedResults(questionId) as
		| GradedAnswerFillBlankResult[]
		| null;

	/**
	 *
	 */
	const handleAnswerChange = (number: number, answer: string) => {
		if (isSubmitted) {
			return;
		}

		const updatedAnswers = userAnswers.map((ans) =>
			ans.number === number ? { number, answer } : ans,
		);

		setUserAnswers(questionId, updatedAnswers);
	};

	/**
	 *
	 */
	const getVariation = (number: number) => {
		if (isSubmitted && gradedResults) {
			const result = gradedResults.find((result) => result.number === number);
			return result?.isCorrect ? "correct" : "incorrect";
		}

		const answer = userAnswers.find(
			(userAnswer) => userAnswer.number === number,
		);
		return answer?.answer === "" ? "default" : "focused";
	};

	// 초기 답안 배열 설정
	useEffect(() => {
		if (blankCount > 0 && userAnswers.length !== blankCount) {
			const initialAnswers: FillBlankSubmitAnswer[] = Array.from(
				{ length: blankCount },
				(_, index) => ({
					number: index + 1,
					answer: "",
				}),
			);
			setUserAnswers(questionId, initialAnswers);
		}
	}, [blankCount, userAnswers.length, questionId, setUserAnswers]);

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{userAnswers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					readOnly={isSubmitted}
					answer={answer}
					variation={getVariation(answer.number)}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default SolvingReviewFillBlankAnswers;
