import type { QuestionResponseType } from "@/domains/creation/creation.constant";
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

	switch (newType) {
		case "MULTIPLE":
			return {
				...question,
				type: "MULTIPLE",
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
				] as MultipleChoiceApiResponse[],
			} as unknown as MultipleQuestionApiResponse;

		case "SHORT":
			return {
				...question,
				type: "SHORT",
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
				...question,
				type: "ORDERING",
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
				] as OrderingOptionApiResponse[],
			} as unknown as OrderingQuestionApiResponse;

		case "FILL_BLANK":
			return {
				...question,
				type: "FILL_BLANK",
				answers: [],
				blankCount: 0,
			} as unknown as FillBlankQuestionApiResponse;

		default:
			return question;
	}
};

export default CreationQuestionConvertQuestionType;
