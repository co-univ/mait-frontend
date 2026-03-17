import { Tabs } from "@/components/tabs";

//
//
//

const DashboardTeamRankingTabsTrigger = () => {
	return (
		<Tabs.List>
			<Tabs.Trigger value="scorer">선착순 기준</Tabs.Trigger>
			<Tabs.Trigger value="correct">정답수 기준</Tabs.Trigger>
		</Tabs.List>
	);
};

export default DashboardTeamRankingTabsTrigger;
