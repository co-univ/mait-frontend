import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const TeamManagementRedirect = () => {
	const navigate = useNavigate();

	// TODO: manage active team id
	const teamId = 1;

	//
	//
	//
	useEffect(() => {
		navigate(`/team-management/team/${teamId}`);
	}, [navigate]);

	return null;
};

export default TeamManagementRedirect;
