import type { QueryObserverResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";
import type { components } from "@/libs/types/api";
import useActiveTeamIdStore from "@/stores/useActiveTeamIdStore";
import useUser from "./useUser";

//
//
//

const ROLE_LEVEL: Record<TeamApiResponse["role"], number> = {
	OWNER: 3,
	MAKER: 2,
	PLAYER: 1,
};

//
//
//

interface UseTeamsReturn {
	teams?: TeamApiResponse[];
	activeTeam?: TeamApiResponse;
	handleActiveTeamChange: (teamId: number) => void;
	refetch: () => Promise<
		QueryObserverResult<
			{
				isSuccess?: boolean;
				data?: components["schemas"]["TeamApiResponse"][];
			},
			never
		>
	>;
	isLoading: boolean;
	isMakerOrAbove: boolean;
}

//
//
//

const useTeams = (): UseTeamsReturn => {
	const { user } = useUser();

	const { activeTeamId, setActiveTeamId } = useActiveTeamIdStore();

	const { data, isPending, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/joined",
		{},
		{
			enabled: !!user,
		},
	);

	const teams = data?.data;
	const activeTeam = teams?.find((team) => team.teamId === activeTeamId);
	const isMakerOrAbove = activeTeam
		? ROLE_LEVEL[activeTeam.role] >= ROLE_LEVEL.MAKER
		: false;

	/**
	 *
	 */
	const handleActiveTeamChange = (teamId: number) => {
		setActiveTeamId(teamId);
	};

	//
	//
	//
	useEffect(() => {
		if (teams && !teams.some((team) => team.teamId === activeTeamId)) {
			setActiveTeamId(teams[0].teamId);
		}
	}, [teams, activeTeamId, setActiveTeamId]);

	return {
		teams,
		activeTeam,
		handleActiveTeamChange,
		refetch,
		isLoading: isPending,
		isMakerOrAbove,
	};
};

export default useTeams;
