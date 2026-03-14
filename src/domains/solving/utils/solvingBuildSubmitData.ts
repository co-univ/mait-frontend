import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import type { AnswersType } from "../stores/review/useSolvingReviewAnswerResultStore";

/**
 * Set up the submit data format
 * @param userAnswers - User's submitted answers
 * @param questionType - Type of question (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
 * @param userId - User's id
 * @returns Submit data format with error message if invalid questionType
 */
export const solvingBuildSubmitData = (
    userAnswers: AnswersType,
    questionType: QuestionType,
    userId: number,
  ) => {
    switch (questionType) {
      case "SHORT":
        return {
          userId,
          type: "SHORT" as const,
          submitAnswers: (userAnswers as string[]).filter(
            (answer) => answer.trim() !== "",
          ),
        };

      case "MULTIPLE":
        return {
          userId,
          type: "MULTIPLE" as const,
          submitAnswers: userAnswers as number[],
        };

      case "FILL_BLANK":
        return {
          userId,
          type: "FILL_BLANK" as const,
          submitAnswers: userAnswers as FillBlankSubmitAnswer[],
        };

      case "ORDERING":
        return {
          userId,
          type: "ORDERING" as const,
          submitAnswers: userAnswers as number[],
        };

      default:
        throw new Error("지원하지 않는 문제 타입입니다.");
    }
  };