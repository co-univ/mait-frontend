import type { QuestionResponseType } from "@/app.constants";
import type {
	FillBlankAnswerApiResponse,
	MultipleChoiceApiResponse,
	OrderingOptionApiResponse,
	ShortAnswerApiResponse,
} from "@/libs/types";

export type QuestionResponseTypeWithIsEditing = QuestionResponseType & {
	isEditing: boolean;
};

export type CreationQuestionType = Omit<
	QuestionResponseType,
	"choices" | "answers" | "options" | "type"
> & { type: "MULTIPLE" | "SHORT" | "ORDERING" | "FILL_BLANK" };

export type CreationMultipleQuestionType = CreationQuestionType & {
	choices: MultipleChoiceApiResponse[];
};

export type CreatoinShortQuestionType = CreationQuestionType & {
	answers: ShortAnswerApiResponse[];
};

export type CreationOrderingQuestionType = CreationQuestionType & {
	options: OrderingOptionApiResponse[];
};

export type CreationFillBlankQuestionType = CreationQuestionType & {
	answers: FillBlankAnswerApiResponse[];
};
