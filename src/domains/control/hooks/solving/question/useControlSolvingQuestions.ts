import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseControlSolvingQuestionsProps {
	questionSetId: number;
}

interface UseControlSolvingQuestionsReturn {
	questions?: QuestionResponseType[];
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestions = ({
	questionSetId,
}: UseControlSolvingQuestionsProps): UseControlSolvingQuestionsReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: { questionSetId },
			},
		},
	);

	const questions = data?.data;

	return { questions, isLoading: isPending };
};

export default useControlSolvingQuestions;
