import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreationQuestionSet from "@/domains/creation/hooks/question/useCreationQuestionSet";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

const CreationRedirect = () => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);

	const { questions, isQuestionsLoading: isLoading } = useCreationQuestionSet({
		questionSetId,
	});

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
