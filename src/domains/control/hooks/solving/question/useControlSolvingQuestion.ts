import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

type UseControlSolvingQuestionProps = {
	questionSetId: number;
	questionId: number;
};

type UseControlSolvingQuestionReturn = {
	question?: QuestionResponseType;
	isLoading: boolean;
};

//
//
//

const useControlSolvingQuestion = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionProps): UseControlSolvingQuestionReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: { questionSetId, questionId },
				query: {
					mode: "MAKING",
				},
			},
		},
	);

	const question = data?.data;

	return { question, isLoading: isPending };
};

export default useControlSolvingQuestion;
