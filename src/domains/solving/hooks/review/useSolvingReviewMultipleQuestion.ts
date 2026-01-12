import { apiHooks } from "@/libs/api";
import type {
	MultipleChoiceApiResponse,
	MultipleQuestionApiResponse,
} from "@/libs/types";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface UseSolvingReviewMultipleQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewMultipleQuestionReturn {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	choices: MultipleChoiceApiResponse[];
	userAnswers: number[];
	handleChoiceChange: (choiceNumber: number) => void;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewMultipleQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewMultipleQuestionProps): UseSolvingReviewMultipleQuestionReturn => {
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

	const question = data?.data as MultipleQuestionApiResponse | undefined;

	const userAnswers = getUserAnswers(questionId) as number[];

	/**
	 *
	 */
	const handleChoiceChange = (choiceNumber: number) => {
		if (getIsSubmitted(questionId)) {
			return;
		}

		let newUserAnswers = [];

		if (userAnswers.includes(choiceNumber)) {
			newUserAnswers = userAnswers.filter(
				(answerId) => answerId !== choiceNumber,
			);
		} else {
			newUserAnswers = [...userAnswers, choiceNumber];
		}

		setUserAnswers(questionId, newUserAnswers);
	};

	return {
		isSubmitted: getIsSubmitted(questionId),
		isCorrect: getIsCorrect(questionId),
		choices: question?.choices ?? [],
		userAnswers,
		handleChoiceChange,
		isLoading: isPending,
	};
};

export default useSolvingReviewMultipleQuestion;
