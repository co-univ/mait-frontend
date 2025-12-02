import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreationQuestions from "@/domains/creation/hooks/question/useCreationQuestions";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

const CreationRedirect = () => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);

	const { questions, isLoading } = useCreationQuestions({ questionSetId });

	//
	//
	//
	useEffect(() => {
		if (questions && !isLoading) {
			const firstQuestionId = questions[0]?.id ?? 0;

			navigate(
				createPath(CREATION_ROUTE_PATH.QUESTION, {
					questionSetId: questionSetId,
					questionId: firstQuestionId,
				}),
				{ replace: true },
			);
		}
	}, [questions, questionSetId, isLoading, navigate]);

	return null;
};

export default CreationRedirect;
