import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const Solving = () => {
	const navigate = useNavigate();

	const questionId = 14;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		navigate(`/quiz-solving/${questionId}`);
	}, []);

	return null;
};

export default Solving;
