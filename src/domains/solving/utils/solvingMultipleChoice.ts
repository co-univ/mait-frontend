export const MULTIPLE_ALL_SELECT_NOTICE = "(※ 모두 고르시오.)";

/**
 * Whether the multiple choice question has more than one correct choice.
 */
export const solvingIsMultipleAnswer = (answerCount?: number) =>
	(answerCount ?? 0) > 1;

/**
 * Appends the "select all" notice on a new line to the question content,
 * only when the question has more than one correct choice.
 */
export const solvingWithAllSelectNotice = (
	content: string | undefined,
	answerCount?: number,
) => {
	if (!content || !solvingIsMultipleAnswer(answerCount)) {
		return content;
	}

	return `${content}\n${MULTIPLE_ALL_SELECT_NOTICE}`;
};

/**
 * Computes the next selection state when a choice is clicked.
 * Multi answer questions toggle each choice, while single answer questions
 * behave as an exclusive (XOR) selection.
 */
export const solvingToggleMultipleChoice = (
	userAnswers: number[],
	choiceNumber: number,
	answerCount?: number,
) => {
	if (!solvingIsMultipleAnswer(answerCount)) {
		return userAnswers.includes(choiceNumber) ? [] : [choiceNumber];
	}

	return userAnswers.includes(choiceNumber)
		? userAnswers.filter((num) => num !== choiceNumber)
		: [...userAnswers, choiceNumber];
};
