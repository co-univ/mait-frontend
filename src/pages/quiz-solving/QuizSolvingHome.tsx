import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const QuizSolvingHome = () => {
	const navigate = useNavigate();

	const questionId = process.env.PUBLIC_QUESTION_ID;

	useEffect(() => {
		navigate(`/quiz-solving/${questionId}`);
	}, []);

	return null;
};

export default QuizSolvingHome;
