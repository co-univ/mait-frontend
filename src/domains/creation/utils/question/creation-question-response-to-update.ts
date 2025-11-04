import type {
	QuestionResponseType,
	QuestionUpdateType,
} from "@/domains/creation/creation.constant";
import type {
	FillBlankQuestionApiResponse,
	QuestionType,
	ShortQuestionApiResponse,
	UpdateFillBlankQuestionApiRequest,
	UpdateMultipleQuestionApiRequest,
	UpdateOrderingQuestionApiRequest,
	UpdateShortQuestionApiRequest,
} from "@/libs/types";

//
//
//

/**
 * Convert editor HTML format to {{number}} format for API
 */
const convertFormatHtmlToString = (content: string): string => {
	if (!content) {
		return "";
	}

	let result = content;

	// Replace <question-blank> tags with {{number}}
	result = result.replace(
		/<question-blank[^>]*number="(\d+)"[^>]*><\/question-blank>/g,
		"{{$1}}",
	);

	// Replace closing </p> tags with newline
	result = result.replace(/<\/p>/g, "\n");

	// Remove all other HTML tags
	result = result.replace(/<[^>]*>/g, "");

	// Replace HTML entities
	result = result.replace(/&nbsp;/g, " ");
	result = result.replace(/&lt;/g, "<");
	result = result.replace(/&gt;/g, ">");
	result = result.replace(/&amp;/g, "&");
	result = result.replace(/&quot;/g, '"');

	// Trim trailing newlines
	result = result.replace(/\n+$/, "");

	return result;
};

const creationQuestionResponseToUpdate = (
	question: QuestionResponseType,
): QuestionUpdateType => {
	const updateQuestion: QuestionUpdateType =
		question as unknown as QuestionUpdateType;

	switch (question.type as QuestionType) {
		case "MULTIPLE":
			return updateQuestion as UpdateMultipleQuestionApiRequest;

		case "SHORT": {
			const shortQuestion = question as ShortQuestionApiResponse;

			return {
				...updateQuestion,
				shortAnswers: shortQuestion.answers?.map((answer) => ({
					id: answer.id,
					answer: answer.answer,
					main: answer.isMain,
					number: answer.number,
				})),
			} as UpdateShortQuestionApiRequest;
		}

		case "ORDERING":
			return updateQuestion as UpdateOrderingQuestionApiRequest;

		case "FILL_BLANK": {
			const fillBlankQuestion = question as FillBlankQuestionApiResponse;

			// Check if content contains editor format (<question-blank> tags)
			const content = fillBlankQuestion.content || "";
			const hasEditorFormat = content.includes("<question-blank");

			return {
				...updateQuestion,
				content: hasEditorFormat ? convertFormatHtmlToString(content) : content,
				fillBlankAnswers: fillBlankQuestion.answers?.map((answer) => ({
					id: answer.id,
					answer: answer.answer,
					main: answer.isMain,
					number: answer.number,
				})),
			} as UpdateFillBlankQuestionApiRequest;
		}
	}

	return updateQuestion;
};

export default creationQuestionResponseToUpdate;
