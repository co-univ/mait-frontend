import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "@/components/tabs";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import DashboardTeamRankingHeader from "./DashboardTeamRankingHeader";
import DashboardTeamRankingTable from "./DashboardTeamRankingTable";
import DashboardTeamRankingTabsTrigger from "./DashboardTeamRankingTabsTrigger";

//
//
//

const RANKING_TYPE_VALUES: Record<RANKING_TYPES, string> = {
	scorer: "SCORER",
	correct: "CORRECT",
};

const RANK_COUNT = 3;

//
//
//

type RANKING_TYPES = "scorer" | "correct";

//
//
//

const DashboardTeamRanking = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { activeTeam } = useTeams();

	const rankingType =
		(searchParams.get("ranking") as RANKING_TYPES) || "scorer";

	const { data } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/question-ranks",
		{
			params: {
				path: {
					teamId: activeTeam?.teamId ?? 0,
				},
				query: {
					type: RANKING_TYPE_VALUES[rankingType],
					rankCount: RANK_COUNT,
				},
			},
		},
		{
			enabled: !!activeTeam,
		},
	);

	const queryClient = useQueryClient();

	const { containsUserRank, teamRankings, userRank } = data?.data ?? {};

	/**
	 *
	 */
	const handleRankingTypeChange = (value: string) => {
		if (value === rankingType) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.dashboardRankingTabClick, {
			ranking_type: value,
		});
		setSearchParams({ ranking: value });
	};

	// Prefetch ranking data when activeTeam changes to ensure the displayed rankings are up-to-date
	useEffect(() => {
		if (!activeTeam) {
			return;
		}

		for (const type of Object.values(RANKING_TYPE_VALUES)) {
			queryClient.prefetchQuery(
				apiHooks.queryOptions("get", "/api/v1/teams/{teamId}/question-ranks", {
					params: {
						path: {
							teamId: activeTeam.teamId,
						},
						query: {
							type,
							rankCount: RANK_COUNT,
						},
					},
				}),
			);
		}
	}, [activeTeam, queryClient]);

	return (
		<div className="flex w-full h-full flex-col gap-gap-9 rounded-radius-large2 border border-color-gray-10 bg-color-gray-5 p-padding-11 shadow-base">
			<DashboardTeamRankingHeader />
			<Tabs.Root
				defaultValue="scorer"
				value={rankingType}
				onValueChange={handleRankingTypeChange}
				className="flex flex-col gap-gap-9"
			>
				<DashboardTeamRankingTabsTrigger />
				<DashboardTeamRankingTable
					teamRankings={teamRankings}
					userRank={containsUserRank ? undefined : userRank}
				/>
			</Tabs.Root>
		</div>
	);
};

export default DashboardTeamRanking;
