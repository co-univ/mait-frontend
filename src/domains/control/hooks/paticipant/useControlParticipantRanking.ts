import { apiHooks } from "@/libs/api";
import type {
	AnswerRankApiResponse,
	ScorerRankApiResponse,
} from "@/libs/types";

//
//
//

type RankingType<T extends "SCORER" | "CORRECT"> = T extends "SCORER"
	? ScorerRankApiResponse[]
	: AnswerRankApiResponse[];

interface UseControlParticipantRankingProps<T extends "SCORER" | "CORRECT"> {
	questionSetId: number;
	type: T;
}

interface UseControlParticipantRankingReture<T extends "SCORER" | "CORRECT"> {
	ranking?: RankingType<T>;
	isLoading: boolean;
}

//
//
//

const useControlParticipantRanking = <T extends "SCORER" | "CORRECT">({
	questionSetId,
	type,
}: UseControlParticipantRankingProps<T>): UseControlParticipantRankingReture<T> => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/ranks",
		{
			params: {
				path: {
					questionSetId,
				},
				query: {
					type,
				},
			},
		},
	);

	const ranking = data?.data?.ranksGroup as RankingType<T> | undefined;

	return {
		ranking,
		isLoading: isPending,
	};
};

export default useControlParticipantRanking;
