import type {
	QuestionResponseType,
	QuestionUpdateType,
} from "@/domains/creation/creation.constant";
import type {
	QuestionType,
	ShortQuestionApiResponse,
	UpdateMultipleQuestionApiRequest,
	UpdateOrderingQuestionApiRequest,
	UpdateShortQuestionApiRequest,
} from "@/libs/types";

//
//
//

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
	}

	return updateQuestion;
};

export default creationQuestionResponseToUpdate;
