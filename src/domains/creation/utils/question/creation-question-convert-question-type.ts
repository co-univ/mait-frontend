import type { QuestionResponseType } from "@/app.constants";
import type {
	FillBlankQuestionApiResponse,
	MultipleChoiceApiResponse,
	MultipleQuestionApiResponse,
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
	QuestionType,
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

/**
 * Convert a question to a new type while preserving common fields
 * and initializing type-specific fields with default values
 */
const CreationQuestionConvertQuestionType = (
	question: QuestionResponseType,
	newType: QuestionType,
): QuestionResponseType => {
	const currentType = question.type as QuestionType;

	if (currentType === newType) {
		return question;
	}

	const convertedQuestion = {
		...question,
		content: "",
		type: newType,
	} as unknown as QuestionResponseType;

	switch (newType) {
		case "MULTIPLE":
			return {
				...convertedQuestion,
				choices: [
					{
						id: generateTemporaryId(),
						number: 1,
						content: "",
						isCorrect: false,
					},
					{
						id: generateTemporaryId(),
						number: 2,
						content: "",
						isCorrect: false,
					},
					{
						id: generateTemporaryId(),
						number: 3,
						content: "",
						isCorrect: false,
					},
					{
						id: generateTemporaryId(),
						number: 4,
						content: "",
						isCorrect: false,
					},
				] as MultipleChoiceApiResponse[],
			} as unknown as MultipleQuestionApiResponse;

		case "SHORT":
			return {
				...convertedQuestion,
				answerCount: 1,
				answers: [
					{
						id: generateTemporaryId(),
						number: 1,
						answer: "",
						isMain: true,
					},
				] as ShortAnswerApiResponse[],
			} as unknown as ShortQuestionApiResponse;

		case "ORDERING":
			return {
				...convertedQuestion,
				options: [
					{
						id: generateTemporaryId(),
						content: "",
						originOrder: 1,
						answerOrder: 1,
					},
					{
						id: generateTemporaryId(),
						content: "",
						originOrder: 2,
						answerOrder: 2,
					},
					{
						id: generateTemporaryId(),
						content: "",
						originOrder: 3,
						answerOrder: 3,
					},
				] as OrderingOptionApiResponse[],
			} as unknown as OrderingQuestionApiResponse;

		case "FILL_BLANK":
			return {
				...convertedQuestion,
				answers: [],
				blankCount: 0,
			} as unknown as FillBlankQuestionApiResponse;

		default:
			return convertedQuestion;
	}
};

export default CreationQuestionConvertQuestionType;
