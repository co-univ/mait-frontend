import DashboardMySolving from "../../components/my-solving/DashboardMySolving";
import DashboardTeamRanking from "../../components/team-ranking/DashboardTeamRanking";
import DashboardLayout from "../../layouts/common/DashboardLayout";

//
//
//

const Dashboard = () => {
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
