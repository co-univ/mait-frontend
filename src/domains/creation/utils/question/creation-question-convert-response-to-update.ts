import type { QuestionResponseType, QuestionUpdateType } from "@/app.constants";
import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
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
 * Convert QuestionResponseType to QuestionUpdateType for update API request.
 */
const creationQuestionConvertResponseToUpdate = (
	question: QuestionResponseType,
): QuestionUpdateType => {
	const baseQuestion = {
		id: question.id,
		content: question.content,
		explanation: question.explanation,
		imageId: question.imageId,
		imageUrl: question.imageUrl,
	};

	switch (question.type as QuestionType) {
		case "MULTIPLE":
			return {
				...baseQuestion,
				type: question.type as "UpdateMultipleQuestionApiRequest",
				choices: (question as MultipleQuestionApiResponse)
					.choices as UpdateMultipleQuestionApiRequest["choices"],
			};
		case "SHORT":
			return {
				...baseQuestion,
				type: question.type as "UpdateShortQuestionApiRequest",
				answers: (question as ShortQuestionApiResponse)
					.answers as UpdateShortQuestionApiRequest["answers"],
			};
		case "ORDERING":
			return {
				...baseQuestion,
				type: question.type as "UpdateOrderingQuestionApiRequest",
				options: (question as OrderingQuestionApiResponse)
					.options as UpdateOrderingQuestionApiRequest["options"],
			};
		case "FILL_BLANK":
			return {
				...baseQuestion,
				type: question.type as "UpdateFillBlankQuestionApiRequest",
				answers: (question as FillBlankQuestionApiResponse)
					.answers as UpdateFillBlankQuestionApiRequest["answers"],
			};
	}
};

export default creationQuestionConvertResponseToUpdate;
