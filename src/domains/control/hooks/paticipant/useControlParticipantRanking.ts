import { useEffect, useState } from "react";
import { apiHooks } from "@/libs/api";
import type {
	AnswerRankApiResponse,
	ParticipantInfoApiResponse,
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
	selectedRank: number;
	activeParticipants?: ParticipantInfoApiResponse[];
	eliminatedParticipants?: ParticipantInfoApiResponse[];
	handleSelectRank: (rank: number) => void;
	handleApplyRankSelection: () => void;
	handleActivateAllParticipants: () => void;
	handleEliminateAllParticipants: () => void;
	checkIsAllUsersActive: (users?: UserApiResponse[]) => boolean;
	handleRankingRowParticipantsChange: (
		checked: boolean,
		users?: UserApiResponse[],
	) => void;
	isLoading: boolean;
}

//
//
//

const useControlParticipantRanking = <T extends "SCORER" | "CORRECT">({
	questionSetId,
	type,
}: UseControlParticipantRankingProps<T>): UseControlParticipantRankingReture<T> => {
	const [selectedRank, setSelectedRank] = useState(0);

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
	const handleSelectRank = (rank: number) => {
		setSelectedRank(rank);
	};

	/**
	 *
	 */
	const handleApplyRankSelection = () => {
		if (!ranking || selectedRank === 0) {
			return;
		}

		const allUsers = ranking
			.slice(0, selectedRank)
			.flatMap((rank) => rank.users ?? []);

		handleRankingRowParticipantsChange(true, allUsers);
	};

	/**
	 *
	 */
	const handleActivateAllParticipants = () => {
		if (!eliminatedParticipants || eliminatedParticipants.length === 0) {
			return;
		}

		handleAddActiveParticipant(eliminatedParticipants);
	};

	/**
	 *
	 */
	const handleEliminateAllParticipants = () => {
		if (!activeParticipants || activeParticipants.length === 0) {
			return;
		}

		handleDeleteActiveParticipant(activeParticipants);
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

	//
	//
	//
	useEffect(() => {
		if (!ranking || !activeParticipants) {
			return;
		}

		let consecutiveRank = 0;

		for (let i = 0; i < ranking.length; i++) {
			const users = ranking[i].users;
			if (
				users &&
				users.length > 0 &&
				users.every((user) =>
					activeParticipants.some(
						(participant) => participant.userId === user.userId,
					),
				)
			) {
				consecutiveRank = i + 1;
			} else {
				break;
			}
		}

		setSelectedRank(consecutiveRank);
	}, [ranking, activeParticipants]);

	return {
		ranking,
		selectedRank,
		activeParticipants,
		eliminatedParticipants,
		handleSelectRank,
		handleApplyRankSelection,
		handleActivateAllParticipants,
		handleEliminateAllParticipants,
		checkIsAllUsersActive,
		handleRankingRowParticipantsChange,
		isLoading: isPending,
	};
};

export default useControlParticipantRanking;
