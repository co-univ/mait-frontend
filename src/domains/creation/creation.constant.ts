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

export type QuestionResponseType = (
	| MultipleQuestionApiResponse
	| ShortQuestionApiResponse
	| OrderingQuestionApiResponse
	| FillBlankQuestionApiResponse
) & {
	imageId: number | null;
};

export type QuestionResponseTypeWithIsEditing = QuestionResponseType & {
	isEditing: boolean;
};

export type QuestionUpdateType =
	| UpdateMultipleQuestionApiRequest
	| UpdateShortQuestionApiRequest
	| UpdateOrderingQuestionApiRequest
	| UpdateFillBlankQuestionApiRequest;
