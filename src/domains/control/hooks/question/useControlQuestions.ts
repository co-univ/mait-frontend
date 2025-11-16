import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface ControlQuestionsProps {
	questionSetId: number;
}

interface ControlQuestionsReturn {
	questions?: QuestionResponseType[];
	isLoading: boolean;
}

//
//
//

const useControlQuestions = ({
	questionSetId,
}: ControlQuestionsProps): ControlQuestionsReturn => {
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

export default useControlQuestions;
