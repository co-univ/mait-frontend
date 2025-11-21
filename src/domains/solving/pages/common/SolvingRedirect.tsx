import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const SolvingRedirect = () => {
	const navigate = useNavigate();

	//
	useEffect(() => {
		navigate("/solving/question-sets?mode=live-time");
	}, [navigate]);

	return null;
};

export default SolvingRedirect;
