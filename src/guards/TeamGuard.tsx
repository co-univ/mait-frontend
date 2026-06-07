import type React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import Loading from "@/pages/Loading";

//
//
//

interface TeamGuardProps {
	children: React.ReactNode;
	rootPath: string;
}

//
//
//

const TeamGuard = ({ children, rootPath }: TeamGuardProps) => {
	const navigate = useNavigate();

	const { activeTeam, isLoading } = useTeams();

	const prevTeamIdRef = useRef<number | null>(null);

	//
	//
	//
	useEffect(() => {
		if (isLoading) {
			return;
		}

		const currentTeamId = activeTeam?.teamId ?? null;

		if (prevTeamIdRef.current === null) {
			prevTeamIdRef.current = currentTeamId;
			return;
		}

		if (currentTeamId !== prevTeamIdRef.current) {
			prevTeamIdRef.current = currentTeamId;
			navigate(rootPath);
		}
	}, [activeTeam?.teamId, isLoading, navigate, rootPath]);

	if (isLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default TeamGuard;
