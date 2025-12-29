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
	choices: MultipleChoiceApiResponse[];
	selectedChoices: number[];
	handleChoiceChange: (id: number) => void;
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

	const { selectedAnswers, setSelectedAnswers } =
		useSolvingReviewAnswerResultStore();

	const question = data?.data as MultipleQuestionApiResponse | undefined;

	const selectedChoices = selectedAnswers as number[];

	/**
	 *
	 */
	const handleChoiceChange = (id: number) => {
		let updatedChoices: number[] = [];

		if (selectedChoices.includes(id)) {
			updatedChoices = selectedChoices.filter((choiceId) => choiceId !== id);
		} else {
			updatedChoices = [...selectedChoices, id];
		}

		setSelectedAnswers(updatedChoices);
	};

	return {
		choices: question?.choices ?? [],
		selectedChoices,
		handleChoiceChange,
		isLoading: isPending,
	};
};

export default useSolvingReviewMultipleQuestion;
