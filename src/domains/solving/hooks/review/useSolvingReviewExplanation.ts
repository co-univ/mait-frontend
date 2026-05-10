import type { QuestionResponseType } from "@/app.constants";
import type { QuestionApiResponse } from "@/libs/types";
import QuestionAnswerString from "@/utils/question-answer-string";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

//
//
//

interface UseSolvingReviewExplanationProps {
	questionId: number;
	question?: QuestionApiResponse;
}

interface UseSolvingReviewExplanationReturn {
	isExplanationShown: boolean;
	answer?: string;
	explanation?: string;
	showExplanation: () => Promise<void>;
	hideExplanation: () => void;
}

//
//
//

const useSolvingReviewExplanation = ({
	questionId,
	question,
}: UseSolvingReviewExplanationProps): UseSolvingReviewExplanationReturn => {
	const { getIsSubmitted, getIsExplanationShown, setIsExplanationShown } =
		useSolvingReviewAnswerResultStore();

	/**
	 *
	 */
	const showExplanation = async () => {
		if (!getIsSubmitted(questionId) && question) {
			return;
		}

		setIsExplanationShown(questionId, true);
	};

	/**
	 *
	 */
	const hideExplanation = () => {
		setIsExplanationShown(questionId, false);
	};

	return {
		isExplanationShown: getIsExplanationShown(questionId),
		answer: question
			? QuestionAnswerString(question as unknown as QuestionResponseType)
			: undefined,
		explanation: question?.explanation,
		showExplanation,
		hideExplanation,
	};
};

export default useSolvingReviewExplanation;
