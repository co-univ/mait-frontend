import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Toast from "./components/Toast";
import useTeams from "./hooks/useTeams";
import useUser from "./hooks/useUser";
import useActiveTeamIdStore from "./stores/useActiveTeamIdStore";

//
//
//

const App = () => {
	const { user } = useUser();
	const { teams, activeTeam } = useTeams();
	const { setActiveTeamId } = useActiveTeamIdStore();

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only when user is logged in
	useEffect(() => {
		if (user && !activeTeam && teams && teams.length > 0 && teams[0].teamId) {
			setActiveTeamId(teams[0].teamId);
		}
	}, [user]);

	return (
		<>
			<AppLayout>
				<Outlet />
			</AppLayout>
			<Toast />
		</>
	);
};

export default App;
