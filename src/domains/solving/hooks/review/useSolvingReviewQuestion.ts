import { useEffect } from "react";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import QuestionAnswerString from "@/utils/question-answer-string";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";
import { solvingReviewAnswersValidation } from "../../utils/solving-review-answers-validation";

//
//
//

interface UseSolvingReviewQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewQuestionReturn {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	isExplanationShown: boolean;
	content?: string;
	answer?: string;
	explanation?: string;
	number?: number;
	imageUrl?: string;
	type?: QuestionType;
	handleAnswerSubmit: () => void;
	showExplanation: () => void;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewQuestionProps): UseSolvingReviewQuestionReturn => {
	const { user } = useUser();

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

	const {
		getUserAnswers,
		getIsSubmitted,
		getIsCorrect,
		getIsExplanationShown,
		setAnswerInitInfo,
		setAnswerSubmitted,
		setIsExplanationShown,
	} = useSolvingReviewAnswerResultStore();

	const { mutate: submitAnswer, isPending: isSubmitting } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit/review",
			{
				onSuccess: (data) => {
					const isCorrect = data.data?.isCorrect;

					setAnswerSubmitted(questionId, !!isCorrect);
				},
			},
		);

	const question = data?.data;

	/**
	 *
	 */
	const handleAnswerSubmit = () => {
		if (isSubmitting || !user?.id || !question) {
			return;
		}

		const { isValid, errorMessage } = solvingReviewAnswersValidation(
			getUserAnswers(questionId),
			question.type as QuestionType,
		);

		if (!isValid) {
			notify.warn(errorMessage || "답안을 입력해주세요.");
			return;
		}

		submitAnswer({
			params: {
				path: {
					questionSetId,
					questionId,
				},
			},
			body: {
				userId: user.id,
				// biome-ignore lint/suspicious/noExplicitAny: typescript-openapi use type value for distinguish object, but type in body is used for QuestionType
				type: question.type as QuestionType as any,
				// biome-ignore lint/suspicious/noExplicitAny: AnswersType is union of array types that matches API requirements, but TypeScript cannot infer the discriminated union
				submitAnswers: getUserAnswers(questionId) as any,
			},
		});
	};

	/**
	 *
	 */
	const showExplanation = () => {
		setIsExplanationShown(questionId, true);
	};

	//
	//
	//
	useEffect(() => {
		if (!question) {
			return;
		}

		setAnswerInitInfo(questionId, question.type as QuestionType);
	}, [questionId, question, setAnswerInitInfo]);

	return {
		isSubmitted: getIsSubmitted(questionId),
		isCorrect: getIsCorrect(questionId),
		isExplanationShown: getIsExplanationShown(questionId),
		content: question?.content,
		answer: question ? QuestionAnswerString(question) : undefined,
		explanation: question?.explanation,
		number: question?.number,
		imageUrl: question?.imageUrl,
		type: question?.type as QuestionType,
		handleAnswerSubmit,
		showExplanation,
		isLoading: isPending,
	};
};

export default useSolvingReviewQuestion;
