import React from "react";
import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";

//
//
//

interface UseTeamsProps {
	teamId?: number;
}

interface UseTeamsReturn {
	teams?: TeamApiResponse[];
	selectedTeam?: TeamApiResponse;
	isLoading: boolean;
}

//
//
//

const useTeams = ({ teamId }: UseTeamsProps): UseTeamsReturn => {
	const { data, isPending } = apiHooks.useQuery("get", "/api/v1/teams/joined");

	const teams = data?.data;
	const selectedTeam = teams?.find((team) => team.teamId === teamId);

	return {
		teams,
		selectedTeam,
		isLoading: isPending,
	};
};

export default useTeams;
