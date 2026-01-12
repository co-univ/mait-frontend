import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import Loading from "@/pages/Loading";

//
//
//

interface TeamMakerGuardProps {
	children: React.ReactNode;
}

//
//
//

const TeamMakerGuard = ({ children }: TeamMakerGuardProps) => {
	const { user, isLoading: isUserLoading } = useUser();
	const { activeTeam, isLoading: isTeamLoading } = useTeams();

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (isUserLoading || (user && isTeamLoading)) {
			return;
		}

		if (
			!user ||
			(activeTeam?.role !== "MAKER" && activeTeam?.role !== "OWNER")
		) {
			navigate("/");
		}
	}, [activeTeam, isTeamLoading, navigate, user, isUserLoading]);

	if (isTeamLoading || isUserLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default TeamMakerGuard;
