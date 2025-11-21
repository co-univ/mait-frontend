import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const ManagementRedirect = () => {
	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		navigate("/management?mode=making", { replace: true });
	}, [navigate]);

	return null;
};

export default ManagementRedirect;
