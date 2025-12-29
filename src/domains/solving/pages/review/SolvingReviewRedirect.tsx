import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHooks } from "@/libs/api";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";

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

	//
	//
	//
	useEffect(() => {
		if (!data) {
			return;
		}

		navigate();
	}, [data, questionSetId]);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorDetect />;
	}

	return null;
};

export default SolvingReviewRedirect;
