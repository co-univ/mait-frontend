/**
 * Replaces path parameters in a template string with actual values,
 * and optionally appends query string parameters
 *
 * @param template - Path template with parameter placeholders (e.g., "question-set/:questionSetId/question/:questionId")
 * @param params - Object containing parameter values to replace placeholders
 * @param query - Optional object containing query string key-value pairs
 * @returns Resolved path with all parameters replaced and query string appended
 *
 * @example
 * createPath("question-set/:questionSetId/question/:questionId", { questionSetId: "123", questionId: "456" })
 * // Returns: "question-set/123/question/456"
 *
 * createPath("question-set/:questionSetId", { questionSetId: "123" }, { page: 1, size: 10 })
 * // Returns: "question-set/123?page=1&size=10"
 */
export const createPath = <T extends Record<string, string | number>>(
	template: string,
	params: T,
	query?: Record<string, string | number>,
) => {
	let path = template;

	for (const [key, value] of Object.entries(params)) {
		path = path.replace(`:${key}`, String(value));
	}

	if (query && Object.keys(query).length > 0) {
		const queryString = new URLSearchParams(
			Object.fromEntries(Object.entries(query).map(([k, v]) => [k, String(v)])),
		).toString();

		path = `${path}?${queryString}`;
	}

	return path;
};
