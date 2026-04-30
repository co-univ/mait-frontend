import { apiHooks } from "@/libs/api";

//
//
//

interface UseSolvingStudyDraftsProps {
	questionSetId: number;
}

interface UseSolvingStudyDraftsReturn {
	drafts: {
		questionId: number;
		submittedAnswer?: unknown;
		submitted: boolean;
	}[];
	isLoading: boolean;
}

//
//
//

const useSolvingStudyDrafts = ({
	questionSetId,
}: UseSolvingStudyDraftsProps): UseSolvingStudyDraftsReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/study-mode/drafts",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
		{
			enabled: questionSetId > 0,
			staleTime: 0,
			refetchOnMount: true,
		},
	);

	return {
		drafts: data?.data ?? [],
		isLoading: isPending,
	};
};

export default useSolvingStudyDrafts;
