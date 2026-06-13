import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import DashboardMySolving from "../../components/my-solving/DashboardMySolving";
import DashboardTeamRanking from "../../components/team-ranking/DashboardTeamRanking";
import DashboardLayout from "../../layouts/common/DashboardLayout";
import DashboardCategory from "../category/DashboardCategory";

//
//
//

const Dashboard = () => {
	const location = useLocation();

	const { activeTeam } = useTeams();

	const hasTrackedEnterRef = useRef(false);
	const entrySource =
		(location.state as { entrySource?: string } | null)?.entrySource ??
		"direct";

	//
	useEffect(() => {
		if (hasTrackedEnterRef.current) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.dashboardEnter, {
			entry_source: entrySource,
		});
		hasTrackedEnterRef.current = true;
	}, [entrySource]);

	return (
		<DashboardLayout>
			<div className="flex gap-gap-9">
				{activeTeam?.teamType !== "PERSONAL" && (
					<div className="flex-[3]">
						<DashboardTeamRanking />
					</div>
				)}
				<div className="flex-[2]">
					<DashboardMySolving />
				</div>
			</div>

			<DashboardCategory />
		</DashboardLayout>
	);
};

export default Dashboard;
