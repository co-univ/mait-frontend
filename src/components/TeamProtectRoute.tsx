import type React from "react";
import useTeams from "@/hooks/useTeams";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";

//
//
//

interface TeamProtectRouteProps {
	children: React.ReactNode;
}

//
//
//

const TeamProtectRoute = ({ children }: TeamProtectRouteProps) => {
	const { activeTeam } = useTeams();

	if (!activeTeam) {
		return <Loading />;
	}

	// TODO: check memer role in team
	if (!activeTeam) {
		return <ErrorDetect />;
	}

	return <>{children}</>;
};

export default TeamProtectRoute;
