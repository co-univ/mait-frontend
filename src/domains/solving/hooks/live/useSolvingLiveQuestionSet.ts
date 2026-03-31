import { apiHooks } from "@/libs/api";

//
//
//

interface UseSolvingLiveQuestionSetProps {
	questionSetId: number;
}

interface UseSolvingLiveQuestionSetReturn {
	questionSetTitle: string;
	totalQuestionNum: number;
	isLoading: boolean;
}

//
//
//

const useSolvingLiveQuestionSet = ({
	questionSetId,
}: UseSolvingLiveQuestionSetProps): UseSolvingLiveQuestionSetReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const questionSet = data?.data;

	return {
		questionSetTitle: questionSet?.title ?? "",
		totalQuestionNum: questionSet?.questionCount ?? 10,
		isLoading: isPending,
	};
};

export default useSolvingLiveQuestionSet;
