import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPath } from "@/utils/create-path";
import { DASHBOARD_ROUTE_PATH } from "../../dashboard.routes";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

const DashboardQuestionRedirect = () => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);

	const { firstQuestion, isLoading } = useDashboardQuestions({
		questionSetId,
	});

	//
	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (firstQuestion) {
			navigate(
				createPath(DASHBOARD_ROUTE_PATH.QUESTION, {
					questionSetId,
					questionId: firstQuestion.id,
				}),
				{
					replace: true,
				},
			);
		} else {
			navigate(DASHBOARD_ROUTE_PATH.ROOT, {
				replace: true,
			});
		}
	}, [firstQuestion, isLoading, navigate, questionSetId]);

	return null;
};

export default DashboardQuestionRedirect;
