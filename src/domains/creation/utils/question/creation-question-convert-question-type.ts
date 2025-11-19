import type { QuestionResponseType } from "@/app.constants";
import CreationQuestionGenerateId from "@/domains/creation/utils/question/creation-question-generate-id";
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
						id: CreationQuestionGenerateId(),
						number: 1,
						content: "",
						isCorrect: false,
					},
					{
						id: CreationQuestionGenerateId(),
						number: 2,
						content: "",
						isCorrect: false,
					},
					{
						id: CreationQuestionGenerateId(),
						number: 3,
						content: "",
						isCorrect: false,
					},
					{
						id: CreationQuestionGenerateId(),
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
						id: CreationQuestionGenerateId(),
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
						id: CreationQuestionGenerateId(),
						content: "",
						originOrder: 1,
						answerOrder: 1,
					},
					{
						id: CreationQuestionGenerateId(),
						content: "",
						originOrder: 2,
						answerOrder: 2,
					},
					{
						id: CreationQuestionGenerateId(),
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
