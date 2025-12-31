import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import type { ShortQuestionApiResponse } from "@/libs/types";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface UseSolvingReviewShortQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewShortQuestionReturn {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	userAnswer: string[];
	handleAnswerChange: (number: number, answer: string) => void;
	isLoading: boolean;
}

//
//
//

const UseSolvingReviewShortQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewShortQuestionProps): UseSolvingReviewShortQuestionReturn => {
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

	const question = data?.data as ShortQuestionApiResponse | undefined;

	const userAnswers = getUserAnswers(questionId) as string[];

	/**
	 *
	 */
	const handleAnswerChange = (index: number, answer: string) => {
		const updatedAnswers = userAnswers.map((ans, idx) =>
			idx === index ? answer : ans,
		);

		setUserAnswers(questionId, updatedAnswers);
	};

	//
	//
	//
	useEffect(() => {
		if (userAnswers.length !== question?.answerCount) {
			const initialAnswers: string[] = Array.from(
				{ length: question?.answerCount || 0 },
				() => "",
			);

			setUserAnswers(questionId, initialAnswers);
		}
	}, [userAnswers.length, question?.answerCount, questionId, setUserAnswers]);

	return {
		isSubmitted: getIsSubmitted(questionId),
		isCorrect: getIsCorrect(questionId),
		userAnswer: userAnswers,
		handleAnswerChange,
		isLoading: isPending,
	};
};

export default UseSolvingReviewShortQuestion;
