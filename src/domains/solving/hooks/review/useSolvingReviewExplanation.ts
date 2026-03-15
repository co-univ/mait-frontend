import type { QuestionResponseType } from "@/app.constants";
import type { QuestionApiResponse } from "@/libs/types";
import QuestionAnswerString from "@/utils/question-answer-string";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";
import useSolvingReviewAnswerSubmit from "./useSolvingReviewAnswerSubmit";

//
//
//

interface UseSolvingReviewExplanationProps {
	questionSetId: number;
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
	questionSetId,
	questionId,
	question,
}: UseSolvingReviewExplanationProps): UseSolvingReviewExplanationReturn => {
	const { getIsSubmitted, getIsExplanationShown, setIsExplanationShown } =
		useSolvingReviewAnswerResultStore();

	const { submitAnswer } = useSolvingReviewAnswerSubmit();

	/**
	 *
	 */
	const showExplanation = async () => {
		if (!getIsSubmitted(questionId) && question) {
			const isSubmitted = await submitAnswer({
				questionSetId,
				questionId,
				questionType: question.type,
			});

			if (!isSubmitted) {
				return;
			}
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
