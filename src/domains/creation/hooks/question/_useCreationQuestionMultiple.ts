import { notify } from "@/components/Toast";
import type { MultipleQuestionApiResponse } from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import type {
	UseCreationQuestionProps,
	UseCreationQuestionReturn,
} from "./_useCreationQuestion";
import useCreationQuestion from "./_useCreationQuestion";

//
//
//

interface UseCreationQuestionMultipleProps extends UseCreationQuestionProps {}

interface UseCreationQuestionMultipleReturn
	extends UseCreationQuestionReturn<MultipleQuestionApiResponse> {
	changeChoiceCorrect: (choiceId: number, isCorrect: boolean) => void;
	changeChoiceContent: (choiceId: number, content: string) => void;
	addChoice: () => void;
	deleteChoice: (choiceId: number) => void;
}

//
//
//

const useCreationQuestionMultiple = ({
	questionSetId,
	questionId,
}: UseCreationQuestionMultipleProps): UseCreationQuestionMultipleReturn => {
	const baseCreationQuestionResult =
		useCreationQuestion<MultipleQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { question, setQuestion } = baseCreationQuestionResult;
	const choices = question?.choices;

	/**
	 *
	 */
	const changeChoiceCorrect = (choiceId: number, isCorrect: boolean) => {
		if (!choices) {
			return;
		}

		const updatedChoices = choices.map((choice) =>
			choice.id === choiceId ? { ...choice, isCorrect } : choice,
		);

		setQuestion({
			...question,
			choices: updatedChoices,
		});
	};

	/**
	 *
	 */
	const changeChoiceContent = (choiceId: number, content: string) => {
		if (!choices) {
			return;
		}

		const updatedChoices = choices.map((choice) =>
			choice.id === choiceId ? { ...choice, content } : choice,
		);

		setQuestion({
			...question,
			choices: updatedChoices,
		});
	};

	/**
	 *
	 */
	const addChoice = () => {
		if (!choices) {
			return;
		}

		if (choices.length >= 8) {
			notify.warn("객관식 선지는 최대 8개까지 추가할 수 있습니다.");

			return;
		}

		const newChoice = {
			id: generateTemporaryId(),
			number: choices.length + 1,
			content: "",
			isCorrect: false,
		};
		const updatedChoices = [...choices, newChoice];

		setQuestion({
			...question,
			choices: updatedChoices,
		});
	};

	/**
	 *
	 */
	const deleteChoice = (choiceId: number) => {
		if (!choices) {
			return;
		}

		if (choices.length <= 2) {
			notify.warn("객관식 선지는 최소 2개 이상이어야 합니다.");

			return;
		}

		const updatedChoices = choices
			.filter((choice) => choice.id !== choiceId)
			.map((choice, index) => ({
				...choice,
				number: index + 1,
			}));

		setQuestion({
			...question,
			choices: updatedChoices,
		});
	};

	return {
		...baseCreationQuestionResult,
		changeChoiceCorrect,
		changeChoiceContent,
		addChoice,
		deleteChoice,
	};
};

export default useCreationQuestionMultiple;
