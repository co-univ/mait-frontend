import { useCallback, useEffect, useState } from "react";
import type {
	MultipleChoiceApiResponse,
	MultipleChoiceUpdateAnswerPayload,
	MultipleQuestionApiResponse,
} from "@/libs/types";
import useControlSolvingQuestion from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionMultipleProps {
	questionSetId: number;
	questionId: number;
}

interface UseControlSolvingQuestionMultipleReturn {
	question?: MultipleQuestionApiResponse;
	choices?: MultipleChoiceApiResponse[];
	handleCheckChoice: (id: number, checked: boolean) => void;
	handleAnswerAdd: () => Promise<boolean>;
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionMultiple = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionMultipleProps): UseControlSolvingQuestionMultipleReturn => {
	const [choices, setChoices] = useState<MultipleChoiceApiResponse[]>();

	const { question, handleAnswerAdd, questionUpdatedAt, isLoading } =
		useControlSolvingQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const handleCheckChoice = (id: number, checked: boolean) => {
		if (!choices) {
			return;
		}

		const updatedChoices = choices.map((choice) => {
			if (choice.id === id) {
				return {
					...choice,
					isCorrect: checked,
				};
			}

			return choice;
		});

		setChoices(updatedChoices);
	};

	/**
	 *
	 */
	const handleMultipleAnswerAdd = useCallback(() => {
		if (!choices) {
			return Promise.resolve(false);
		}

		const payload = {
			type: "MULTIPLE",
			correctChoiceIds: choices
				.filter((choice) => choice.isCorrect)
				.map((choice) => choice.id),
		} as MultipleChoiceUpdateAnswerPayload;

		return handleAnswerAdd(payload);
	}, [choices, handleAnswerAdd]);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when question refetched, reset choices state
	useEffect(() => {
		if (question) {
			const sortedChoices = (question as MultipleQuestionApiResponse).choices
				.slice()
				.sort((a, b) => a.number - b.number);

			setChoices(sortedChoices);
		}
	}, [question, questionUpdatedAt]);

	return {
		question: question as MultipleQuestionApiResponse,
		choices,
		handleCheckChoice,
		handleAnswerAdd: handleMultipleAnswerAdd,
		isLoading,
	};
};

export default useControlSolvingQuestionMultiple;
