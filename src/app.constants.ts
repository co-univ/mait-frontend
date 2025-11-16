import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	ShortQuestionApiResponse,
	UpdateFillBlankQuestionApiRequest,
	UpdateMultipleQuestionApiRequest,
	UpdateOrderingQuestionApiRequest,
	UpdateShortQuestionApiRequest,
} from "./libs/types";

export const SMALL_PAGE_MARGIN_PATHS = ["/creation/question"];
export const SMALL_PAGE_MARGIN = 32;
export const LARGE_PAGE_MARGIN = 172;

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_TRANSITION =
	"transition-all duration-300 transition-ease-in-out";

export const HEADER_HEIGHT = 96;

export const FILL_BLANK_PATTERN = /\{\{(\d+)\}\}/g;

export type QuestionResponseType =
	| MultipleQuestionApiResponse
	| ShortQuestionApiResponse
	| OrderingQuestionApiResponse
	| FillBlankQuestionApiResponse;

export type QuestionUpdateType =
	| UpdateMultipleQuestionApiRequest
	| UpdateShortQuestionApiRequest
	| UpdateOrderingQuestionApiRequest
	| UpdateFillBlankQuestionApiRequest;
