import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const QuestionSetsRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/question-sets/team/1?mode=making", { replace: true });
	}, [navigate]);

	return null;
};

export default QuestionSetsRedirect;
