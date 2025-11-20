import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";
import useActiveTeamIdStore from "@/stores/useActiveTeamIdStore";

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
	const { activeTeamId, setActiveTeamId } = useActiveTeamIdStore();

	const { data, isPending, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/joined",
	);

	const teams = data?.data;
	const activeTeam = teams?.find((team) => team.teamId === activeTeamId);

	/**
	 *
	 */
	const handleActiveTeamChange = (teamId: number) => {
		setActiveTeamId(teamId);
	};

	return {
		teams,
		activeTeam,
		handleActiveTeamChange,
		refetch,
		isLoading: isPending,
	};
};

export default useTeams;
