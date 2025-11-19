import type { FillBlankUpdateAnswerPayload, MultipleChoiceUpdateAnswerPayload, OrderingUpdateAnswerPayload, ShortUpdateAnswerPayload } from "@/libs/types";

export type QuestionUpdatePayload = MultipleChoiceUpdateAnswerPayload | ShortUpdateAnswerPayload | OrderingUpdateAnswerPayload | FillBlankUpdateAnswerPayload