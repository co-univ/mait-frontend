import { apiHooks } from "@/libs/api";

//
//
//

/**
 * @param teamId Team ID
 * @param type Ranking type ("SCORER" | "CORRECT"), default: "SCORER"
 * @param rankCount Number of rankings to fetch
 */
export const teamRankingQueryOptions = (teamId: number, type = "SCORER", rankCount?: number) =>
	apiHooks.queryOptions("get", "/api/v1/teams/{teamId}/question-ranks", {
		params: {
			path: { teamId },
			query: { type, ...(rankCount !== undefined && { rankCount }) },
		},
	});

/**
 * @param teamId Team ID
 */
export const userSolvingStatsQueryOptions = (teamId: number) =>
	apiHooks.queryOptions("get", "/api/v1/teams/{teamId}/user-solving-stats", {
		params: {
			path: { teamId },
		},
	});

/**
 * @param teamId Team ID
 */
export const categoryCorrectRatesQueryOptions = (teamId: number) =>
	apiHooks.queryOptions(
		"get",
		"/api/v1/teams/{teamId}/categories/correct-rates",
		{
			params: {
				path: { teamId },
			},
		},
	);

/**
 * @param teamId Team ID
 */
export const questionSetsStatisticsQueryOptions = (teamId: number) =>
	apiHooks.queryOptions("get", "/api/v1/question-sets/statistics", {
		params: {
			query: { teamId },
		},
	});
