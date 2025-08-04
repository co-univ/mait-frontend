export * from './api';
export type { paths, components } from './api';

// Individual schema exports for easier importing
import type { components, paths } from './api';

export type CreateTeamApiRequest = components['schemas']['CreateTeamApiRequest'];
export type CreateQuestionSetApiRequest = components['schemas']['CreateQuestionSetApiRequest'];
export type ApiResponseCreateQuestionSetApiResponse = components['schemas']['ApiResponseCreateQuestionSetApiResponse'];
export type CreateQuestionSetApiResponse = components['schemas']['CreateQuestionSetApiResponse'];
export type CreateFillBlankQuestionApiRequest = components['schemas']['CreateFillBlankQuestionApiRequest'];
export type CreateMultipleQuestionApiRequest = components['schemas']['CreateMultipleQuestionApiRequest'];
export type CreateOrderingQuestionApiRequest = components['schemas']['CreateOrderingQuestionApiRequest'];
export type CreateQuestionApiRequest = components['schemas']['CreateQuestionApiRequest'];
export type CreateShortQuestionApiRequest = components['schemas']['CreateShortQuestionApiRequest'];
export type FillBlankAnswerDto = components['schemas']['FillBlankAnswerDto'];
export type MultipleChoiceDto = components['schemas']['MultipleChoiceDto'];
export type OrderingQuestionOptionDto = components['schemas']['OrderingQuestionOptionDto'];
export type ShortAnswerDto = components['schemas']['ShortAnswerDto'];
export type ApiResponseListQuestionSetApiResponse = components['schemas']['ApiResponseListQuestionSetApiResponse'];
export type QuestionSetApiResponse = components['schemas']['QuestionSetApiResponse'];
export type ApiResponseQuestionApiResponse = components['schemas']['ApiResponseQuestionApiResponse'];
export type FillBlankAnswerApiResponse = components['schemas']['FillBlankAnswerApiResponse'];
export type FillBlankQuestionApiResponse = components['schemas']['FillBlankQuestionApiResponse'];
export type MultipleChoiceApiResponse = components['schemas']['MultipleChoiceApiResponse'];
export type MultipleQuestionApiResponse = components['schemas']['MultipleQuestionApiResponse'];
export type OrderingOptionApiResponse = components['schemas']['OrderingOptionApiResponse'];
export type OrderingQuestionApiResponse = components['schemas']['OrderingQuestionApiResponse'];
export type QuestionApiResponse = components['schemas']['QuestionApiResponse'];
export type ShortAnswerApiResponse = components['schemas']['ShortAnswerApiResponse'];
export type ShortQuestionApiResponse = components['schemas']['ShortQuestionApiResponse'];

// Individual path exports for easier importing
export type TeamsPath = paths['/api/v1/teams'];
export type QuestionSetsPath = paths['/api/v1/question-sets'];
export type QuestionSetsQuestionSetIdQuestionsPath = paths['/api/v1/question-sets/{questionSetId}/questions'];
export type QuestionSetsQuestionSetIdQuestionsQuestionIdPath = paths['/api/v1/question-sets/{questionSetId}/questions/{questionId}'];
