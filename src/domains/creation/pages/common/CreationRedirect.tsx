import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreationQuestionSet from "@/domains/creation/hooks/question/useCreationQuestionSet";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

const CreationRedirect = () => {
	const navigate = useNavigate();

	const { questionSetId: questionSetIdParam } = useParams();
	const questionSetId = Number(questionSetIdParam);

	const { questions, isQuestionsLoading: isLoading } = useCreationQuestionSet({
		questionSetId,
	});

	//
	//
	//
	useEffect(() => {
		if (!questionSetIdParam) {
			navigate(MANAGEMENT_ROUTE_PATH.ROOT, { replace: true });
			return;
		}

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
	}, [questions, questionSetIdParam, questionSetId, isLoading, navigate]);

	return null;
};

export default CreationRedirect;
