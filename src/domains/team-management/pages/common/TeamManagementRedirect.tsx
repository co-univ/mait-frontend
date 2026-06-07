import { Navigate } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import { TEAM_MANAGEMENT_ROUTE_PATH } from "../../team-management.routes";

//
//
//

const TeamManagementRedirect = () => {
	const { activeTeam } = useTeams();

	if (activeTeam?.teamType === "PERSONAL") {
		return <Navigate to={TEAM_MANAGEMENT_ROUTE_PATH.CATEGORIES} replace />;
	}

	return <Navigate to={TEAM_MANAGEMENT_ROUTE_PATH.USERS} replace />;
};

export default TeamManagementRedirect;
