import { useEffect } from "react";
import type { QuestionResponseType } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseQuestionsProps {
	questionSetId: number;
}

interface UseQuestionsReturn {
	questions: QuestionResponseType[];
	isLoading: boolean;
	error: Error | null;
}

//
//
//

const useCreationQuestions = ({
	questionSetId,
}: UseQuestionsProps): UseQuestionsReturn => {
	const { questions, initQuestions } = useCreationQuestionsStore();

	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: set function does not effect to the useEffect
	useEffect(() => {
		if (data?.data) {
			initQuestions(data.data);
		}
	}, [data]);

	// const questions = data?.data || [];

	return {
		questions,
		isLoading: isPending,
		error,
	};
};

export default useCreationQuestions;
