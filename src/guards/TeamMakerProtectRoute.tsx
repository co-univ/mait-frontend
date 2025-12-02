import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
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
	const { activeTeam, isLoading } = useTeams();

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (
			!isLoading &&
			activeTeam?.role !== "MAKER" &&
			activeTeam?.role !== "OWNER"
		) {
			navigate("/");
		}
	}, [activeTeam, isLoading, navigate]);

	if (isLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default TeamMakerProtectRoute;
