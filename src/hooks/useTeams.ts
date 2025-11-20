import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";
import useActiveTeamIdStore from "@/stores/useActiveTeamIdStore";

//
//
//

interface UseTeamsReturn {
	teams?: TeamApiResponse[];
	activeTeam?: TeamApiResponse;
	isLoading: boolean;
}

//
//
//

const useTeams = (): UseTeamsReturn => {
	const { activeTeamId } = useActiveTeamIdStore();

	const { data, isPending } = apiHooks.useQuery("get", "/api/v1/teams/joined");

	const teams = data?.data;
	const activeTeam = teams?.find((team) => team.teamId === activeTeamId);

	return {
		teams,
		activeTeam,
		isLoading: isPending,
	};
};

export default useTeams;
