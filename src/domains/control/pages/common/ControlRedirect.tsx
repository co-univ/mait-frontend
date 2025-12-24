import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { createPath } from "@/utils/create-path";
import { CONTROL_ROUTE_PATH } from "../../control.routes";
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
					createPath(CONTROL_ROUTE_PATH.SOLVING, {
						questionSetId,
						questionId: firstQuestionId,
					}),
					{ replace: true },
				);
			}
		}
	}, [questions, isLoading, navigate, questionSetId]);

	return null;
};

export default ControlRedirect;
