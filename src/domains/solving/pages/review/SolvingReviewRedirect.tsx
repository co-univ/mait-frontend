import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHooks } from "@/libs/api";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";
import { createPath } from "@/utils/create-path";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

const SolvingReviewRedirect = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { data, isPending, isError } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/last-viewed",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const navigate = useNavigate();

	const lastViewedQuestionId = data?.data?.id;

	//
	//
	//
	useEffect(() => {
		if (!lastViewedQuestionId) {
			return;
		}

		navigate(
			createPath(SOLVING_ROUTE_PATH.REVIEW, {
				questionSetId,
				questionId: lastViewedQuestionId,
			}),
		);
	}, [lastViewedQuestionId, questionSetId, navigate]);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorDetect />;
	}

	return null;
};

export default SolvingReviewRedirect;
