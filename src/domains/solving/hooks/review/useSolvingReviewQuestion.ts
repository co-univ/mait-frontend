import type { QuestionType } from "@/libs/types";
import useSolvingReviewQuestions from "./useSolvingReviewQuestions";

//
//
//

interface UseSolvingReviewQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewQuestionReturn {
	content?: string;
	number?: number;
	imageUrl?: string;
	type?: QuestionType;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewQuestionProps): UseSolvingReviewQuestionReturn => {
	const { questions, isLoading } = useSolvingReviewQuestions({ questionSetId });

	const question = questions.find((q) => q.id === questionId);

	return {
		content: question?.content,
		number: question?.number,
		imageUrl: question?.imageUrl,
		type: question?.type as QuestionType,
		isLoading,
	};
};

export default useSolvingReviewQuestion;
