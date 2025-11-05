import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const ManagementRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/management/team/1?mode=making", { replace: true });
	}, [navigate]);

	return null;
};

export default ManagementRedirect;
