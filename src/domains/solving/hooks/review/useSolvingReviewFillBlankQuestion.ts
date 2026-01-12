import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import type { FillBlankSubmitAnswer } from "@/libs/types";
import type { FillBlankQuestionApiResponse } from "@/types";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface UseSolvingReviewFillBlankQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewFillBlankQuestionReturn {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	userAnswers: FillBlankSubmitAnswer[];
	handleAnswerChange: (number: number, answer: string) => void;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewFillBlankQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewFillBlankQuestionProps): UseSolvingReviewFillBlankQuestionReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: {
					questionSetId,
					questionId,
				},
				query: {
					mode: "REVIEW",
				},
			},
		},
	);

	const { getUserAnswers, getIsSubmitted, getIsCorrect, setUserAnswers } =
		useSolvingReviewAnswerResultStore();

	const question = data?.data as FillBlankQuestionApiResponse | undefined;

	const userAnswers = getUserAnswers(questionId) as FillBlankSubmitAnswer[];

	/**
	 *
	 */
	const handleAnswerChange = (number: number, answer: string) => {
		if (getIsSubmitted(questionId)) {
			return;
		}

		const updatedAnswers = userAnswers.map((ans) =>
			ans.number === number ? { number, answer } : ans,
		);

		setUserAnswers(questionId, updatedAnswers);
	};

	//
	//
	//
	useEffect(() => {
		if (userAnswers.length !== question?.blankCount) {
			const initialAnswers: FillBlankSubmitAnswer[] = Array.from(
				{ length: question?.blankCount || 0 },
				(_, index) => ({
					number: index + 1,
					answer: "",
				}),
			);

			setUserAnswers(questionId, initialAnswers);
		}
	}, [userAnswers.length, question?.blankCount, questionId, setUserAnswers]);

	return {
		isSubmitted: getIsSubmitted(questionId),
		isCorrect: getIsCorrect(questionId),
		userAnswers,
		handleAnswerChange,
		isLoading: isPending,
	};
};

export default useSolvingReviewFillBlankQuestion;
