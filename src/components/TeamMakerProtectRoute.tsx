import type React from "react";
import useTeams from "@/hooks/useTeams";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";

//
//
//

interface TeamMakerProtectRouteProps {
	children: React.ReactNode;
}

//
//
//

const TeamMakerProtectRoute = ({ children }: TeamMakerProtectRouteProps) => {
	const { activeTeam } = useTeams();

	if (!activeTeam) {
		return <Loading />;
	}

	if (activeTeam.role !== "MAKER" && activeTeam.role !== "OWNER") {
		return <ErrorDetect />;
	}

	return <>{children}</>;
};

export default TeamMakerProtectRoute;
