import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { createPath } from "@/utils/create-path";
import useControlSolvings from "../../hooks/solving/question/useControlSolvingQuestions";

//
//
//

interface ControlRedirectProps {
	routePath: string;
}

//
//
//

const ControlRedirect = ({ routePath }: ControlRedirectProps) => {
	const { questionSetId: questionSetIdParam } = useParams();
	const questionSetId = Number(questionSetIdParam);

	const { questions, isLoading } = useControlSolvings({ questionSetId });

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (!questionSetIdParam) {
			navigate(MANAGEMENT_ROUTE_PATH.ROOT, { replace: true });
			return;
		}

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
	}, [
		questions,
		isLoading,
		navigate,
		questionSetIdParam,
		questionSetId,
		routePath,
	]);

	return null;
};

export default ControlRedirect;
