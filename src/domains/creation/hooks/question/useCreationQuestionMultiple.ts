import type { QuestionResponseType } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import type {
	MultipleChoiceDto,
	MultipleQuestionApiResponse,
} from "@/libs/types";

//
//
//

interface UseQuestionMultipleProps {
	questionId: number;
}

interface UseQuestionMultipleReturn {
	question: MultipleQuestionApiResponse | undefined;
	handleChoiceCorrect: (choiceId: number, isCorrect: boolean) => void;
	handleChoiceContentChange: (choiceId: number, content: string) => void;
	handleAddChoice: () => void;
	handleDeleteChoice: (choiceId: number) => void;
}

//
//
//

const useCreationQuestionMultiple = ({
	questionId,
}: UseQuestionMultipleProps): UseQuestionMultipleReturn => {
	const { questions, editQuestion } = useCreationQuestionsStore();

	const question = questions.find((q) => q.id === questionId) as
		| MultipleQuestionApiResponse
		| undefined;

	/**
	 *
	 */
	const handleChoiceCorrect = (choiceId: number, isCorrect: boolean) => {
		const updatedChoices = question?.choices.map((choice) =>
			choice.id === choiceId ? { ...choice, isCorrect } : choice,
		);

		editQuestion({
			...question,
			choices: updatedChoices,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleChoiceContentChange = (choiceId: number, content: string) => {
		const updatedChoices = question?.choices.map((choice) =>
			choice.id === choiceId ? { ...choice, content } : choice,
		);

		editQuestion({
			...question,
			choices: updatedChoices,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleAddChoice = () => {
		const newChoice: MultipleChoiceDto = {
			id: Date.now(),
			number: question ? question.choices.length + 1 : 1,
			content: "",
			isCorrect: false,
		};

		const updatedChoices = question
			? [...question.choices, newChoice]
			: [newChoice];

		editQuestion({
			...question,
			choices: updatedChoices,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleDeleteChoice = (choiceId: number) => {
		const updatedChoices = question?.choices
			.filter((choice) => choice.id !== choiceId)
			.map((choice, index) => ({
				...choice,
				number: index + 1,
			}));

		editQuestion({
			...question,
			choices: updatedChoices,
		} as QuestionResponseType);
	};

	return {
		question,
		handleChoiceCorrect,
		handleChoiceContentChange,
		handleAddChoice,
		handleDeleteChoice,
	};
};

export default useCreationQuestionMultiple;
