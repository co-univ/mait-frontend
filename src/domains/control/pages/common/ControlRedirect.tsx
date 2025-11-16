import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useControlQuestions from "../../hooks/question/useControlQuestions";

//
//
//

const ControlRedirect = () => {
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);

	const { questions, isLoading } = useControlQuestions({ questionSetId });

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (!isLoading && questions) {
			const firstQuestionId = questions[0]?.id;

			if (firstQuestionId) {
				navigate(
					`/control/question/team/${teamId}/question-set/${questionSetId}/question/${firstQuestionId}`,
				);
			}
		}
	}, [questions, isLoading, navigate, teamId, questionSetId]);

	return null;
};

export default ControlRedirect;
