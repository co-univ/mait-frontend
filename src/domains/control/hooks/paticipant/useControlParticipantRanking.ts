import { apiHooks } from "@/libs/api";
import type {
	AnswerRankApiResponse,
	ScorerRankApiResponse,
	UserApiResponse,
} from "@/libs/types";
import useControlParticipants from "./useControlParticipants";

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
	handleRankingRowParticipantsChange: (
		checked: boolean,
		users?: UserApiResponse[],
	) => void;
	checkIsAllUsersActive: (users?: UserApiResponse[]) => boolean;
}

//
//
//

const useControlParticipantRanking = <T extends "SCORER" | "CORRECT">({
	questionSetId,
	type,
}: UseControlParticipantRankingProps<T>): UseControlParticipantRankingReture<T> => {
	const {
		activeParticipants,
		eliminatedParticipants,
		handleAddActiveParticipant,
		handleDeleteActiveParticipant,
	} = useControlParticipants({ questionSetId });

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

	/**
	 *
	 */
	const checkIsAllUsersActive = (users?: UserApiResponse[]) => {
		if (!users || users.length === 0) {
			return false;
		}

		return users.every((user) =>
			activeParticipants?.some(
				(participant) => participant.userId === user.userId,
			),
		);
	};

	/**
	 *
	 */
	const handleRankingRowParticipantsChange = (
		checked: boolean,
		users?: UserApiResponse[],
	) => {
		if (!users || users.length === 0) {
			return;
		}

		const allParticipants = [
			...(activeParticipants ?? []),
			...(eliminatedParticipants ?? []),
		];

		const participants = users
			.map((user) =>
				allParticipants.find(
					(participant) => participant.userId === user.userId,
				),
			)
			.filter((participant) => participant !== undefined);

		if (checked) {
			const newParticipants = participants.filter(
				(participant) => participant.status === "ELIMINATED",
			);

			handleAddActiveParticipant(newParticipants);
		} else {
			const newParticipants = participants.filter(
				(participant) => participant.status === "ACTIVE",
			);

			handleDeleteActiveParticipant(newParticipants);
		}
	};

	return {
		ranking,
		isLoading: isPending,
		handleRankingRowParticipantsChange,
		checkIsAllUsersActive,
	};
};

export default useControlParticipantRanking;
