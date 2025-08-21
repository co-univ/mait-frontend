import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const Solving = () => {
	const navigate = useNavigate();

	const questionId = 7;

	useEffect(() => {
		navigate(`/quiz-solving/${questionId}`);
	}, []);

	return null;
};

export default Solving;
