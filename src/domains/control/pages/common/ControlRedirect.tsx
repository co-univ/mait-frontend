import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useControlSolvings from "../../hooks/solving/question/useControlSolvingQuestions";

//
//
//

const ControlRedirect = () => {
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
					`/control/solving/question-set/${questionSetId}/question/${firstQuestionId}?submit-type=all`,
					{
						replace: true,
					},
				);
			}
		}
	}, [questions, isLoading, navigate, questionSetId]);

	return null;
};

export default ControlRedirect;
