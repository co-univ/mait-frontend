import { useCallback, useEffect, useMemo } from "react";
import { useControlQuestionSubmitFillBlankAnswerStore } from "@/domains/control/stores/question/useControlQuestionSubmitAnswerStore";
import type {
	FillBlankAnswerApiResponse,
	FillBlankAnswerDto,
	FillBlankQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import useControlSolvingQuestion, {
	type UseControlSolvingQuestionProps,
	type UseControlSolvingQuestionReturn,
} from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionFillBlankProps
	extends UseControlSolvingQuestionProps {
	isEditing: boolean;
}

interface UseControlSolvingQuestionFillBlankReturn
	extends UseControlSolvingQuestionReturn<FillBlankQuestionApiResponse> {
	grouppedQuestionAnswers: FillBlankAnswerApiResponse[][];
	grouppedAddedAnswers: FillBlankAnswerDto[][];
	handleSubAnswerAdd: (number: number) => void;
	handleSubAnswerChange: (id: number, answer: string) => void;
	handleSubAnswerDelete: (id: number) => void;
}

//
//
//

const useControlSolvingQuestionFillBlank = ({
	isEditing,
	questionSetId,
	questionId,
}: UseControlSolvingQuestionFillBlankProps): UseControlSolvingQuestionFillBlankReturn => {
	const { submitAnswerPayload, setSubmitAnswerPayload } =
		useControlQuestionSubmitFillBlankAnswerStore();

	const { question, ...rest } =
		useControlSolvingQuestion<FillBlankQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const addedAnswers = submitAnswerPayload?.answers ?? [];

	/**
	 * Groups fill blank answer responses by their number into a 2D array.
	 */
	const grouppedQuestionAnswers = useMemo(() => {
		const grouped = Array.from(
			{ length: question?.blankCount ?? 0 },
			() => [] as FillBlankAnswerApiResponse[],
		);

		question?.answers?.forEach((answer) => {
			if (answer.number >= 1 && answer.number <= grouped.length) {
				grouped[answer.number - 1].push(answer);
			}
		});

		return grouped;
	}, [question?.answers, question?.blankCount]);

	/**
	 * Groups added fill blank answers by their number into a 2D array.
	 */
	const grouppedAddedAnswers = useMemo(() => {
		const grouped = Array.from(
			{ length: question?.blankCount ?? 0 },
			() => [] as FillBlankAnswerDto[],
		);

		addedAnswers.forEach((answer) => {
			if (
				answer.number &&
				answer.number >= 1 &&
				answer.number <= grouped.length
			) {
				grouped[answer.number - 1].push(answer);
			}
		});

		return grouped;
	}, [addedAnswers, question?.blankCount]);

	/**
	 *
	 */
	const handleSubAnswerAdd = (number: number) => {
		const newAddedAnswers = [
			...addedAnswers,
			{
				id: generateTemporaryId(),
				answer: "",
				main: false,
				number,
			},
		];

		setSubmitAnswerPayload({
			type: "FILL_BLANK" as "FillBlankUpdateAnswerPayload",
			answers: newAddedAnswers,
		});
	};

	/**
	 *
	 */
	const handleSubAnswerChange = (id: number, answer: string) => {
		const newAddedAnswers = addedAnswers.map((addedAnswer) =>
			addedAnswer.id === id ? { ...addedAnswer, answer } : addedAnswer,
		);

		setSubmitAnswerPayload({
			type: "FILL_BLANK" as "FillBlankUpdateAnswerPayload",
			answers: newAddedAnswers,
		});
	};

	/**
	 *
	 */
	const handleSubAnswerDelete = (id: number) => {
		const newAddedAnswers = addedAnswers.filter(
			(addedAnswer) => addedAnswer.id !== id,
		);

		setSubmitAnswerPayload({
			type: "FILL_BLANK" as "FillBlankUpdateAnswerPayload",
			answers: newAddedAnswers,
		});
	};

	/**
	 *
	 */
	const resetAddedAnswers = useCallback(() => {
		setSubmitAnswerPayload({
			type: "FILL_BLANK" as "FillBlankUpdateAnswerPayload",
			answers: [],
		});
	}, [setSubmitAnswerPayload]);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: submitPayload is refreshed on selected question change
	useEffect(() => {
		resetAddedAnswers();
	}, [questionId, resetAddedAnswers]);

	//
	//
	//
	useEffect(() => {
		if (!isEditing) {
			resetAddedAnswers();
		}
	}, [isEditing, resetAddedAnswers]);

	return {
		...rest,
		question,
		grouppedQuestionAnswers,
		grouppedAddedAnswers,
		handleSubAnswerAdd,
		handleSubAnswerChange,
		handleSubAnswerDelete,
	};
};

export default useControlSolvingQuestionFillBlank;
