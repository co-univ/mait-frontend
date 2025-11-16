import { useParams } from "react-router-dom";
import useControlQuestions from "../../hooks/question/useControlQuestions";

//
//
//

const ControlQuestion = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { questions } = useControlQuestions({ questionSetId });
	console.log(questions);
	return <div>ㅎㅇ</div>;
};

export default ControlQuestion;
