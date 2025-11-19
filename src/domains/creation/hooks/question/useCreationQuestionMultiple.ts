import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import type {
	MultipleChoiceDto,
	MultipleQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

interface UseQuestionMultipleProps {
	questionId: number;
}

interface UseQuestionMultipleReturn {
	question?: MultipleQuestionApiResponse;
	handleChoiceCorrect: (choiceId: number, isCorrect: boolean) => void;
	handleChoiceContentChange: (choiceId: number, content: string) => void;
	handleChoiceAdd: () => void;
	handleChoiceDelete: (choiceId: number) => void;
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
	const handleChoiceAdd = () => {
		if (question?.choices.length === 8) {
			notify.error("객관식 선지는 최대 8개까지 추가할 수 있습니다.");

			return;
		}

		const newChoice: MultipleChoiceDto = {
			id: generateTemporaryId(),
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
	const handleChoiceDelete = (choiceId: number) => {
		if (question?.choices.length === 2) {
			notify.error("객관식 선지는 두개 이상 있어야 합니다.");

			return;
		}

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
		handleChoiceAdd,
		handleChoiceDelete,
	};
};

export default useCreationQuestionMultiple;
