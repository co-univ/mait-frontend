import { create } from "zustand";
import type { QuestionResponseType } from "@/app.constants";
import type {
	FillBlankAnswerApiResponse,
	FillBlankQuestionApiResponse,
	MultipleChoiceApiResponse,
	MultipleQuestionApiResponse,
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
	QuestionType,
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

type CreatoinQuestionStoreBaseQuestionType = Omit<
	QuestionResponseType,
	"choices" | "answers" | "options"
> & {
	updatedAt: number;
};

type CreationQuestionStoreQuestionType =
	CreatoinQuestionStoreBaseQuestionType & {
		multipleAnswers?: MultipleChoiceApiResponse[];
		shortAnswers?: ShortAnswerApiResponse[];
		orderingAnswers?: OrderingOptionApiResponse[];
		fillBlankAnswers?: FillBlankAnswerApiResponse[];
	};

interface CreationQuestionStoreState {
	questionsRecord: Record<number, CreationQuestionStoreQuestionType>;
}

interface CreationQuestionStoreActions {
	/**
	 * Retrieves question data converted to QuestionResponseType.
	 * @param questionId - The ID of the question to retrieve
	 * @returns QuestionResponseType for the current type, or undefined if not found
	 */
	getQuestion: (questionId: number) => QuestionResponseType | undefined;
	/**
	 * Retrieves the updatedAt timestamp for a specific question.
	 * @param questionId - The ID of the question to retrieve the updatedAt timestamp for
	 * @returns The updatedAt timestamp, or undefined if not found
	 */
	getUpdatedAt: (questionId: number) => number | undefined;
	/**
	 * Stores or updates question data from QuestionResponseType.
	 * Preserves answer data from other question types when updating.
	 * @param questionId - The ID of the question to store/update
	 * @param question - The question data in QuestionResponseType format
	 * @param updatedAt - The timestamp of when the question data was last updated
	 */
	setQuestion: (
		questionId: number,
		question: QuestionResponseType,
		updatedAt: number,
	) => void;
	/**
	 * Resets the entire question store, clearing all stored question data.
	 */
	resetStore: () => void;
}

//
//
//

/**
 * A store for managing question data during creation/editing.
 *
 * This store uses a Record-based structure (questionsRecord) to manage multiple questions
 * simultaneously by their IDs, enabling efficient access to any question's data.
 *
 * It stores answer data for all question types (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
 * separately within each question record. This ensures that previously entered answers
 * are preserved even when the question type changes.
 *
 * Since useCreationQuestion only communicates with QuestionResponseType,
 * get/set methods handle the conversion between internal format and QuestionResponseType.
 */
const useCreationQuestionStore = create<
	CreationQuestionStoreState & CreationQuestionStoreActions
>((set, get) => ({
	questionsRecord: {},

	getQuestion: (questionId: number) => {
		const question = get().questionsRecord[questionId];

		if (!question) {
			return undefined;
		}

		const baseQuestion: QuestionResponseType = {
			id: question.id,
			content: question.content,
			explanation: question.explanation,
			imageId: question.imageId,
			imageUrl: question.imageUrl,
			type: question.type,
		} as QuestionResponseType;

		switch (question.type as QuestionType) {
			case "MULTIPLE":
				return {
					...baseQuestion,
					choices: question.multipleAnswers ?? [],
				};
			case "SHORT":
				return {
					...baseQuestion,
					answers: question.shortAnswers ?? [],
				};
			case "ORDERING":
				return {
					...baseQuestion,
					options: question.orderingAnswers ?? [],
				};
			case "FILL_BLANK":
				return {
					...baseQuestion,
					answers: question.fillBlankAnswers ?? [],
				};
			default:
				return undefined;
		}
	},

	getUpdatedAt: (questionId: number) => {
		const question = get().questionsRecord[questionId];

		return question?.updatedAt;
	},

	setQuestion: (
		questionId: number,
		question: QuestionResponseType,
		updatedAt: number,
	) => {
		const storedQuestion = get().questionsRecord[questionId];
		const newQuestion: CreationQuestionStoreQuestionType = {
			id: question.id,
			content: question.content,
			explanation: question.explanation,
			imageId: question.imageId,
			imageUrl: question.imageUrl,
			type: question.type,
			updatedAt,

			multipleAnswers:
				storedQuestion?.multipleAnswers ||
				Array.from({ length: 4 }, (_, index) => ({
					id: generateTemporaryId(),
					number: index + 1,
					content: "",
					isCorrect: false,
				})),
			shortAnswers:
				storedQuestion?.shortAnswers ||
				Array.from({ length: 1 }, (_, index) => ({
					id: generateTemporaryId(),
					main: true,
					number: index + 1,
					answer: "",
				})),
			orderingAnswers:
				storedQuestion?.orderingAnswers ||
				Array.from({ length: 3 }, (_, index) => ({
					id: generateTemporaryId(),
					originOrder: index + 1,
					answerOrder: index + 1,
					content: "",
				})),
			fillBlankAnswers: storedQuestion?.fillBlankAnswers || [],
		};

		switch (question.type as QuestionType) {
			case "MULTIPLE": {
				const choices = (question as MultipleQuestionApiResponse).choices;

				if (choices !== undefined) {
					newQuestion.multipleAnswers = choices;
				}

				break;
			}
			case "SHORT": {
				const answers = (question as ShortQuestionApiResponse).answers;

				if (answers !== undefined) {
					newQuestion.shortAnswers = answers;
				}

				break;
			}
			case "ORDERING": {
				const options = (question as OrderingQuestionApiResponse).options;

				if (options !== undefined) {
					newQuestion.orderingAnswers = options;
				}

				break;
			}
			case "FILL_BLANK": {
				const answers = (question as FillBlankQuestionApiResponse).answers;

				if (answers !== undefined) {
					newQuestion.fillBlankAnswers = answers;
				}

				break;
			}
		}

		set((state) => ({
			questionsRecord: {
				...state.questionsRecord,
				[questionId]: newQuestion,
			},
		}));
	},

	resetStore: () => set(() => ({ questionsRecord: {} })),
}));

export default useCreationQuestionStore;
