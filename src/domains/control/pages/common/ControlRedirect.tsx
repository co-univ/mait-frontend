import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useControlSolvings from "../../hooks/solving/question/useControlSolvingQuestions";

//
//
//

const ControlRedirect = () => {
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);

	const { questions, isLoading } = useControlSolvings({ questionSetId });

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (!isLoading && questions) {
			const firstQuestionId = questions[0]?.id;

			if (firstQuestionId) {
				navigate(
					`/control/solving/team/${teamId}/question-set/${questionSetId}/question/${firstQuestionId}`,
					{
						replace: true,
					},
				);
			}
		}
	}, [questions, isLoading, navigate, teamId, questionSetId]);

	return null;
};

export default ControlRedirect;
