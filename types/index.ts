export type { components, paths } from "./api";
export * from "./api";

// Individual schema exports for easier importing
import type { components, paths } from "./api";

export type ApiResponseCreateQuestionSetApiResponse =
	components["schemas"]["ApiResponseCreateQuestionSetApiResponse"];
export type ApiResponseListParticipantInfoResponse =
	components["schemas"]["ApiResponseListParticipantInfoResponse"];
export type ApiResponseListQuestionAnswerSubmitRecordApiResponse =
	components["schemas"]["ApiResponseListQuestionAnswerSubmitRecordApiResponse"];
export type ApiResponseListQuestionApiResponse =
	components["schemas"]["ApiResponseListQuestionApiResponse"];
export type ApiResponseListQuestionSetApiResponse =
	components["schemas"]["ApiResponseListQuestionSetApiResponse"];
export type ApiResponseParticipantsCorrectAnswerRankResponse =
	components["schemas"]["ApiResponseParticipantsCorrectAnswerRankResponse"];
export type ApiResponseQuestionAnswerSubmitApiResponse =
	components["schemas"]["ApiResponseQuestionAnswerSubmitApiResponse"];
export type ApiResponseQuestionApiResponse =
	components["schemas"]["ApiResponseQuestionApiResponse"];
export type ApiResponseQuestionScorerApiResponse =
	components["schemas"]["ApiResponseQuestionScorerApiResponse"];
export type ApiResponseQuestionSetApiResponse =
	components["schemas"]["ApiResponseQuestionSetApiResponse"];
export type ApiResponseQuestionSetLiveStatusResponse =
	components["schemas"]["ApiResponseQuestionSetLiveStatusResponse"];
export type ApiResponseVoid = components["schemas"]["ApiResponseVoid"];
export type CreateFillBlankQuestionApiRequest =
	components["schemas"]["CreateFillBlankQuestionApiRequest"];
export type CreateMultipleQuestionApiRequest =
	components["schemas"]["CreateMultipleQuestionApiRequest"];
export type CreateOrderingQuestionApiRequest =
	components["schemas"]["CreateOrderingQuestionApiRequest"];
export type CreateQuestionApiRequest =
	components["schemas"]["CreateQuestionApiRequest"];
export type CreateQuestionSetApiRequest =
	components["schemas"]["CreateQuestionSetApiRequest"];
export type CreateQuestionSetApiResponse =
	components["schemas"]["CreateQuestionSetApiResponse"];
export type CreateShortQuestionApiRequest =
	components["schemas"]["CreateShortQuestionApiRequest"];
export type CreateTeamApiRequest =
	components["schemas"]["CreateTeamApiRequest"];
export type FillBlankAnswerApiResponse =
	components["schemas"]["FillBlankAnswerApiResponse"];
export type FillBlankAnswerDto = components["schemas"]["FillBlankAnswerDto"];
export type FillBlankQuestionApiResponse =
	components["schemas"]["FillBlankQuestionApiResponse"];
export type FillBlankQuestionSubmitApiRequest =
	components["schemas"]["FillBlankQuestionSubmitApiRequest"];
export type FillBlankSubmitAnswer =
	components["schemas"]["FillBlankSubmitAnswer"];
export type LoginApiRequest = components["schemas"]["LoginApiRequest"];
export type MultipleChoiceApiResponse =
	components["schemas"]["MultipleChoiceApiResponse"];
export type MultipleChoiceDto = components["schemas"]["MultipleChoiceDto"];
export type MultipleQuestionApiResponse =
	components["schemas"]["MultipleQuestionApiResponse"];
export type MultipleQuestionSubmitApiRequest =
	components["schemas"]["MultipleQuestionSubmitApiRequest"];
export type OrderingOptionApiResponse =
	components["schemas"]["OrderingOptionApiResponse"];
export type OrderingQuestionApiResponse =
	components["schemas"]["OrderingQuestionApiResponse"];
export type OrderingQuestionOptionDto =
	components["schemas"]["OrderingQuestionOptionDto"];
export type OrderingQuestionSubmitApiRequest =
	components["schemas"]["OrderingQuestionSubmitApiRequest"];
export type ParticipantCorrectAnswerResponse =
	components["schemas"]["ParticipantCorrectAnswerResponse"];
export type ParticipantInfoResponse =
	components["schemas"]["ParticipantInfoResponse"];
export type ParticipantsCorrectAnswerRankResponse =
	components["schemas"]["ParticipantsCorrectAnswerRankResponse"];
export type QuestionAnswerSubmitApiRequest =
	components["schemas"]["QuestionAnswerSubmitApiRequest"];
export type QuestionAnswerSubmitApiResponse =
	components["schemas"]["QuestionAnswerSubmitApiResponse"];
export type QuestionAnswerSubmitRecordApiResponse =
	components["schemas"]["QuestionAnswerSubmitRecordApiResponse"];
export type QuestionApiResponse = components["schemas"]["QuestionApiResponse"];
export type QuestionScorerApiResponse =
	components["schemas"]["QuestionScorerApiResponse"];
export type QuestionSetApiResponse =
	components["schemas"]["QuestionSetApiResponse"];
export type QuestionSetLiveStatusResponse =
	components["schemas"]["QuestionSetLiveStatusResponse"];
export type SendWinnerRequest = components["schemas"]["SendWinnerRequest"];
export type ShortAnswerApiResponse =
	components["schemas"]["ShortAnswerApiResponse"];
export type ShortAnswerDto = components["schemas"]["ShortAnswerDto"];
export type ShortQuestionApiResponse =
	components["schemas"]["ShortQuestionApiResponse"];
export type ShortQuestionSubmitApiRequest =
	components["schemas"]["ShortQuestionSubmitApiRequest"];
export type SubmitAnswerDtoFillBlankSubmitAnswer =
	components["schemas"]["SubmitAnswerDtoFillBlankSubmitAnswer"];
export type SubmitAnswerDtoLong = components["schemas"]["SubmitAnswerDtoLong"];
export type SubmitAnswerDtoObject =
	components["schemas"]["SubmitAnswerDtoObject"];
export type SubmitAnswerDtoString =
	components["schemas"]["SubmitAnswerDtoString"];
export type UpdateActiveParticipantsRequest =
	components["schemas"]["UpdateActiveParticipantsRequest"];
export type getLiveStatus = components["schemas"]["getLiveStatus"];

// Individual path exports for easier importing
export type QuestionSetsQuestionSetIdLiveStatusParticipantsPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status/participants"];
export type TeamsPath = paths["/api/v1/teams"];
export type QuestionSetsPath = paths["/api/v1/question-sets"];
export type QuestionSetsQuestionSetIdQuestionsPath =
	paths["/api/v1/question-sets/{questionSetId}/questions"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdSubmitPath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdControlSolvePath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}/control/solve"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdControlAccessPath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}/control/access"];
export type QuestionSetsQuestionSetIdLiveStatusWinnerPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status/winner"];
export type AuthLoginPath = paths["/api/v1/auth/login"];
export type QuestionSetsQuestionSetIdLiveStatusStartPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status/start"];
export type QuestionSetsQuestionSetIdLiveStatusEndPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status/end"];
export type QuestionSetsQuestionSetIdPath =
	paths["/api/v1/question-sets/{questionSetId}"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdPath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdSubmitRecordsPath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit-records"];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdScorerPath =
	paths["/api/v1/question-sets/{questionSetId}/questions/{questionId}/scorer"];
export type QuestionSetsQuestionSetIdLiveStatusPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status"];
export type QuestionSetsQuestionSetIdLiveStatusRankCorrectPath =
	paths["/api/v1/question-sets/{questionSetId}/live-status/rank/correct"];
