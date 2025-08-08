import { useNavigate } from "react-router-dom";

//
//
//

const QuizSolvingHome = () => {
	const navigate = useNavigate();

	const questionId = process.env.PUBLIC_QUESTION_ID;

	navigate(`/quiz-solving/${questionId}`);

	return null;
};

export default QuizSolvingHome;
