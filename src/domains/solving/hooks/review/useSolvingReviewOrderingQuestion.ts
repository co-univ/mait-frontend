import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import type { OrderingQuestionApiResponse } from "@/libs/types";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface useSolvingReviewOrderingQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface useSolvingReviewOrderingQuestionReturn {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	userAnswers: number[];
	options: string[];
	handleAnswerChange: (sourceIndex: number, destinationIndex: number) => void;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewOrderingQuestion = ({
	questionSetId,
	questionId,
}: useSolvingReviewOrderingQuestionProps): useSolvingReviewOrderingQuestionReturn => {
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

	const question = data?.data as OrderingQuestionApiResponse | undefined;

	const userAnswers = getUserAnswers(questionId) as number[];

	const options = userAnswers.map(
		(order) =>
			question?.options.find((opt) => opt.originOrder === order)?.content || "",
	);

	/**
	 *
	 */
	const handleAnswerChange = (
		sourceIndex: number,
		destinationIndex: number,
	) => {
		const updatedAnswers = Array.from(userAnswers);
		const [movedAnswer] = updatedAnswers.splice(sourceIndex, 1);
		updatedAnswers.splice(destinationIndex, 0, movedAnswer);

		setUserAnswers(questionId, updatedAnswers);
	};

	//
	//
	//
	useEffect(() => {
		if (userAnswers.length !== question?.options.length) {
			const initialAnswers: number[] = Array.from(
				{ length: question?.options.length ?? 0 },
				(_, index) => index + 1,
			);

			setUserAnswers(questionId, initialAnswers);
		}
	}, [
		userAnswers.length,
		question?.options.length,
		questionId,
		setUserAnswers,
	]);

	return {
		isSubmitted: getIsSubmitted(questionId),
		isCorrect: getIsCorrect(questionId),
		userAnswers,
		options,
		handleAnswerChange,
		isLoading: isPending,
	};
};

export default useSolvingReviewOrderingQuestion;
