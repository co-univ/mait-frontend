export * from './api';
export type { paths, components } from './api';

// Individual schema exports for easier importing
import type { components, paths } from './api';

export type CreateQuestionSetApiRequest = components['schemas']['CreateQuestionSetApiRequest'];
export type ApiResponseCreateQuestionSetApiResponse = components['schemas']['ApiResponseCreateQuestionSetApiResponse'];
export type CreateQuestionSetApiResponse = components['schemas']['CreateQuestionSetApiResponse'];
export type CreateMultipleQuestionApiRequest = components['schemas']['CreateMultipleQuestionApiRequest'];
export type MultipleChoiceDto = components['schemas']['MultipleChoiceDto'];

// Individual path exports for easier importing
export type QuestionSetsPath = paths['/api/v1/question-sets'];
export type QuestionSetsQuestionSetIdQuestionsPath = paths['/api/v1/question-sets/{questionSetId}/questions'];
