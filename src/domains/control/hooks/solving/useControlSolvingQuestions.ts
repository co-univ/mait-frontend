import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface useControlSolvingQuestionsProps {
	questionSetId: number;
}

interface useControlSolvingQuestionsReturn {
	questions?: QuestionResponseType[];
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestions = ({
	questionSetId,
}: useControlSolvingQuestionsProps): useControlSolvingQuestionsReturn => {
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
