import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import DashboardMySolving from "../../components/my-solving/DashboardMySolving";
import DashboardTeamRanking from "../../components/team-ranking/DashboardTeamRanking";
import DashboardLayout from "../../layouts/common/DashboardLayout";

//
//
//

const Dashboard = () => {
	const location = useLocation();
	const hasTrackedEnterRef = useRef(false);
	const entrySource =
		(location.state as { entrySource?: string } | null)?.entrySource ??
		"direct";

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
				<div className="flex-[3]">
					<DashboardTeamRanking />
				</div>
				<div className="flex-[2]">
					<DashboardMySolving />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
