import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const TeamManagementRedirect = () => {
	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		navigate("/team-management");
	}, [navigate]);

	return null;
};

export default TeamManagementRedirect;
