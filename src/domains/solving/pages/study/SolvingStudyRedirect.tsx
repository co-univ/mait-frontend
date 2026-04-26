import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/libs/api";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";
import { createPath } from "@/utils/create-path";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

const SolvingStudyRedirect = () => {
	const questionSetId = Number(useParams().questionSetId);
	const hasStartedRef = useRef(false);
	const [isPending, setIsPending] = useState(true);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (hasStartedRef.current || questionSetId <= 0) {
			return;
		}

		hasStartedRef.current = true;

		const startStudy = async () => {
			try {
				await apiClient.POST("/api/v1/question-sets/{questionSetId}/study-mode", {
					params: {
						path: {
							questionSetId,
						},
					},
				});

				const lastViewedResponse = await apiClient.GET(
					"/api/v1/question-sets/{questionSetId}/questions/last-viewed",
					{
						params: {
							path: {
								questionSetId,
							},
						},
					},
				);
				const lastViewedQuestionId = lastViewedResponse.data?.data?.id;

				if (lastViewedQuestionId) {
					navigate(
						createPath(SOLVING_ROUTE_PATH.STUDY, {
							questionSetId,
							questionId: lastViewedQuestionId,
						}),
						{ replace: true },
					);
					return;
				}

				const questionsResponse = await apiClient.GET(
					"/api/v1/question-sets/{questionSetId}/questions",
					{
						params: {
							path: {
								questionSetId,
							},
							query: {
								mode: "STUDY",
							},
						},
					},
				);

				const firstQuestionId = questionsResponse.data?.data?.find(
					(question) => question.number === 1,
				)?.id;

				if (!firstQuestionId) {
					throw new Error("Failed to find first study question");
				}

				navigate(
					createPath(SOLVING_ROUTE_PATH.STUDY, {
						questionSetId,
						questionId: firstQuestionId,
					}),
					{ replace: true },
				);
			} catch {
				setIsError(true);
			} finally {
				setIsPending(false);
			}
		};

		void startStudy();
	}, [questionSetId, navigate]);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorDetect />;
	}

	return null;
};

export default SolvingStudyRedirect;
