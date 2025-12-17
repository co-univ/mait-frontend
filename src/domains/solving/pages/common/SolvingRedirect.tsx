import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

const SolvingRedirect = () => {
	const navigate = useNavigate();

	//
	useEffect(() => {
		navigate(SOLVING_ROUTE_PATH.QUESTION_SETS, {
			replace: true,
		});
	}, [navigate]);

	return null;
};

export default SolvingRedirect;
