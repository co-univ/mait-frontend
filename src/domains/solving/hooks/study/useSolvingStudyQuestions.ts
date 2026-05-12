import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseSolvingStudyQuestionsProps {
	questionSetId: number;
}

interface UseSolvingStudyQuestionsReturn {
	questions: QuestionResponseType[];
	isLoading: boolean;
}

//
//
//

const useSolvingStudyQuestions = ({
	questionSetId,
}: UseSolvingStudyQuestionsProps): UseSolvingStudyQuestionsReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				query: {
					mode: "STUDY",
				},
				path: {
					questionSetId,
				},
			},
		},
		{
			enabled: questionSetId > 0,
		},
	);

	return {
		questions: data?.data ?? [],
		isLoading: isPending,
	};
};

export default useSolvingStudyQuestions;
