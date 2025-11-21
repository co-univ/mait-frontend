import type { QuestionResponseType } from "@/app.constants";
import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	QuestionType,
	ShortQuestionApiResponse,
} from "@/libs/types";

//
//
//

/**
 * Get a string representation of the correct answers for display purposes
 */
const CreationQuestionAnswerString = (question: QuestionResponseType) => {
	switch (question.type as QuestionType) {
		case "MULTIPLE": {
			const choices = (question as MultipleQuestionApiResponse).choices;

			return (
				choices
					.filter((choice) => choice.isCorrect)
					.map((choice) => `${choice.number}번`)
					.join(", ") || ""
			);
		}

		case "SHORT": {
			const answers = (question as ShortQuestionApiResponse).answers;

			return (
				answers
					?.filter((answer) => answer.isMain)
					.map((answer) => answer.answer)
					.join("\n") || ""
			);
		}

		case "ORDERING": {
			const oprtions = (question as OrderingQuestionApiResponse).options;

			return (
				oprtions
					?.sort((a, b) => (a.answerOrder || 0) - (b.answerOrder || 0))
					.map((option) => String.fromCharCode(64 + option.originOrder))
					.join(" → ") || ""
			);
		}

		case "FILL_BLANK": {
			const answers = (question as FillBlankQuestionApiResponse).answers;

			return (
				answers
					?.filter((answer) => answer.isMain)
					.map((answer) => answer.answer)
					.join("\n") || ""
			);
		}

		default:
			return "";
	}
};

export default CreationQuestionAnswerString;
