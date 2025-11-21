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

	if (activeTeam.role === "PLAYER") {
		return <ErrorDetect />;
	}

	return <>{children}</>;
};

export default TeamProtectRoute;
