import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";
import useActiveTeamIdStore from "@/stores/useActiveTeamIdStore";
import useUser from "./useUser";

//
//
//

interface UseTeamsReturn {
	teams?: TeamApiResponse[];
	activeTeam?: TeamApiResponse;
	handleActiveTeamChange: (teamId: number) => void;
	refetch: () => void;
	isLoading: boolean;
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
		if (teams && teams.length > 0 && !activeTeamId) {
			setActiveTeamId(teams[0].teamId);
		}
	}, [teams, activeTeamId, setActiveTeamId]);

	return {
		teams,
		activeTeam,
		handleActiveTeamChange,
		refetch,
		isLoading: isPending,
	};
};

export default useTeams;
