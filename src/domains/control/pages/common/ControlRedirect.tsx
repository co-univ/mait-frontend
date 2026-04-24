import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPath } from "@/utils/create-path";
import { CONTROL_ROUTE_PATH } from "../../control.routes";
import useControlSolvings from "../../hooks/solving/question/useControlSolvingQuestions";

//
//
//

interface ControlRedirectProps {
	routePath?: string;
}

//
//
//

const ControlRedirect = ({
	routePath = CONTROL_ROUTE_PATH.LIVE_SOLVING,
}: ControlRedirectProps) => {
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
					createPath(routePath, {
						questionSetId,
						questionId: firstQuestionId,
					}),
					{ replace: true },
				);
			}
		}
	}, [questions, isLoading, navigate, questionSetId, routePath]);

	return null;
};

export default ControlRedirect;
