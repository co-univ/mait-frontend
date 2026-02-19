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

//
//
//

type CreatoinQuestionStoreBaseQuestionType = Omit<
	QuestionResponseType,
	"choices" | "answers" | "options"
>;

type CreationQuestionStoreQuestionType =
	CreatoinQuestionStoreBaseQuestionType & {
		multipleAnswers: MultipleChoiceApiResponse[];
		shortAnswers: ShortAnswerApiResponse[];
		orderingAnswers: OrderingOptionApiResponse[];
		fillBlankAnswers: FillBlankAnswerApiResponse[];
	};

interface CreationQuestionStoreState {
	questionRecords: Record<number, CreationQuestionStoreQuestionType>;
}

interface CreationQuestionStoreActions {
	/**
	 * Retrieves question data converted to QuestionResponseType.
	 * @param questionId - The ID of the question to retrieve
	 * @returns QuestionResponseType for the current type, or undefined if not found
	 */
	getQuestion: (questionId: number) => QuestionResponseType | undefined;
	/**
	 * Stores or updates question data from QuestionResponseType.
	 * Preserves answer data from other question types when updating.
	 * @param questionId - The ID of the question to store/update
	 * @param question - The question data in QuestionResponseType format
	 */
	setQuestion: (questionId: number, question: QuestionResponseType) => void;
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
 * This store uses a Record-based structure (questionRecords) to manage multiple questions
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
	questionRecords: {},

	getQuestion: (questionId: number) => {
		const question = get().questionRecords[questionId];

		if (!question) {
			return undefined;
		}

		const baseQuestion: QuestionResponseType = {
			id: question.id,
			content: question.content,
			explanation: question.explanation,
			imageId: question.imageId,
			imageUrl: question.imageUrl,
		} as QuestionResponseType;

		switch (question.type as QuestionType) {
			case "MULTIPLE":
				return {
					...baseQuestion,
					choices: question.multipleAnswers,
				};
			case "SHORT":
				return {
					...baseQuestion,
					answers: question.shortAnswers,
				};
			case "ORDERING":
				return {
					...baseQuestion,
					options: question.orderingAnswers,
				};
			case "FILL_BLANK":
				return {
					...baseQuestion,
					answers: question.fillBlankAnswers,
				};
			default:
				return undefined;
		}
	},

	setQuestion: (questionId: number, question: QuestionResponseType) => {
		const storedQuestion = get().questionRecords[questionId];
		const newQuestion: CreationQuestionStoreQuestionType = {
			id: question.id,
			content: question.content,
			explanation: question.explanation,
			imageId: question.imageId,
			imageUrl: question.imageUrl,
			type: question.type,

			multipleAnswers: storedQuestion?.multipleAnswers || [],
			shortAnswers: storedQuestion?.shortAnswers || [],
			orderingAnswers: storedQuestion?.orderingAnswers || [],
			fillBlankAnswers: storedQuestion?.fillBlankAnswers || [],
		};

		switch (question.type as QuestionType) {
			case "MULTIPLE": {
				newQuestion.multipleAnswers =
					(question as MultipleQuestionApiResponse).choices || [];
				break;
			}
			case "SHORT": {
				newQuestion.shortAnswers =
					(question as ShortQuestionApiResponse).answers || [];
				break;
			}
			case "ORDERING": {
				newQuestion.orderingAnswers =
					(question as OrderingQuestionApiResponse).options || [];
				break;
			}
			case "FILL_BLANK": {
				newQuestion.fillBlankAnswers =
					(question as FillBlankQuestionApiResponse).answers || [];
				break;
			}
		}

		set((state) => ({
			questionRecords: {
				...state.questionRecords,
				[questionId]: newQuestion,
			},
		}));
	},

	resetStore: () => set(() => ({ questionRecords: {} })),
}));

export default useCreationQuestionStore;
