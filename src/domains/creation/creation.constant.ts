import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	ShortQuestionApiResponse,
	UpdateFillBlankQuestionApiRequest,
	UpdateMultipleQuestionApiRequest,
	UpdateOrderingQuestionApiRequest,
	UpdateShortQuestionApiRequest,
} from "@/libs/types";

export type QuestionResponseType =
	| MultipleQuestionApiResponse
	| ShortQuestionApiResponse
	| OrderingQuestionApiResponse
	| FillBlankQuestionApiResponse;

export type QuestionResponseTypeWithIsEditing = QuestionResponseType & {
	isEditing: boolean;
};

export type UpdateQuestionRequestType =
	| UpdateMultipleQuestionApiRequest
	| UpdateShortQuestionApiRequest
	| UpdateOrderingQuestionApiRequest
	| UpdateFillBlankQuestionApiRequest;
