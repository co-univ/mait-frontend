import { useEffect } from "react";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import type {
	GradedAnswerShortResult,
	ShortQuestionApiResponse,
} from "@/libs/types";
import SolvingAnswerShort from "../../components/common/answer/SolvingAnswerShort";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface SolvingReviewShortAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewShortAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewShortAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "REVIEW",
	});

	const shortQuestion = question as ShortQuestionApiResponse | undefined;
	const answerCount = shortQuestion?.answerCount ?? 0;

	const { getUserAnswers, setUserAnswers, getIsSubmitted, getIsGradedResults } =
		useSolvingReviewAnswerResultStore();

	const userAnswers = getUserAnswers(questionId) as string[];
	const isSubmitted = getIsSubmitted(questionId);
	const gradedResults = getIsGradedResults(questionId) as
		| GradedAnswerShortResult[]
		| null;

	/**
	 *
	 */
	const handleAnswerChange = (index: number, value: string) => {
		if (isSubmitted) {
			return;
		}

		const newAnswers = [...userAnswers];
		newAnswers[index] = value;
		setUserAnswers(questionId, newAnswers);
	};

	/**
	 *
	 */
	const getVariation = (index: number) => {
		if (isSubmitted && gradedResults) {
			const result = gradedResults[index];
			return result?.isCorrect ? "correct" : "incorrect";
		}

		return userAnswers[index] === "" ? "default" : "focused";
	};

	// 초기 답안 배열 설정
	useEffect(() => {
		if (answerCount > 0 && userAnswers.length !== answerCount) {
			const initialAnswers: string[] = Array.from(
				{ length: answerCount },
				() => "",
			);
			setUserAnswers(questionId, initialAnswers);
		}
	}, [answerCount, userAnswers.length, questionId, setUserAnswers]);

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{userAnswers.map((answer, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly={isSubmitted}
					variation={getVariation(index)}
					answer={answer}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default SolvingReviewShortAnswers;
