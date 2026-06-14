import { apiHooks } from "@/libs/api";

//
//
//

/**
 * @param questionSetId Question set ID
 */
export const questionSetResultQueryOptions = (questionSetId: number) =>
	apiHooks.queryOptions(
		"get",
		"/api/v1/question-sets/{questionSetId}/user/result",
		{
			params: {
				path: { questionSetId },
			},
		},
	);

/**
 * @param questionSetId Question set ID
 */
export const questionsQueryOptions = (questionSetId: number) =>
	apiHooks.queryOptions(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: { questionSetId },
				query: { mode: "REVIEW" },
			},
		},
	);

/**
 * @param questionSetId Question set ID
 */
export const questionWrongRatesQueryOptions = (questionSetId: number) =>
	apiHooks.queryOptions(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/wrong-rates",
		{
			params: {
				path: { questionSetId },
			},
		},
	);
