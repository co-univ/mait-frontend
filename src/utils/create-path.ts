/**
 * Replaces path parameters in a template string with actual values
 *
 * @param template - Path template with parameter placeholders (e.g., "question-set/:questionSetId/question/:questionId")
 * @param params - Object containing parameter values to replace placeholders
 * @returns Resolved path with all parameters replaced
 *
 * @example
 * createPath("question-set/:questionSetId/question/:questionId", { questionSetId: "123", questionId: "456" })
 * // Returns: "question-set/123/question/456"
 */
export const createPath = <T extends Record<string, string | number>>(
	template: string,
	params: T,
) => {
	let path = template;

	for (const [key, value] of Object.entries(params)) {
		path = path.replace(`:${key}`, String(value));
	}

	return path;
};
