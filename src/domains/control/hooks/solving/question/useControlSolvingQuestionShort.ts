import { useCallback, useEffect, useMemo } from "react";
import { notify } from "@/components/Toast";
import { useControlQuestionSubmitShortAnswerStore } from "@/domains/control/stores/question/useControlQuestionSubmitAnswerStore";
import type {
	ShortAnswerApiResponse,
	ShortAnswerDto,
	ShortQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import useControlSolvingQuestion, {
	type UseControlSolvingQuestionProps,
	type UseControlSolvingQuestionReturn,
} from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionShortProps
	extends UseControlSolvingQuestionProps {
	isEditing: boolean;
}

interface UseControlSolvingQuestionShortReturn
	extends UseControlSolvingQuestionReturn<ShortQuestionApiResponse> {
	grouppedQuestionAnswers: ShortAnswerApiResponse[][];
	grouppedAddedAnswers: ShortAnswerDto[][];
	handleSubAnswerAdd: (number: number) => void;
	handleSubAnswerChange: (id: number, answer: string) => void;
	handleSubAnswerDelete: (id: number) => void;
}

//
//
//

const useControlSolvingQuestionShort = ({
	isEditing,
	questionSetId,
	questionId,
}: UseControlSolvingQuestionShortProps): UseControlSolvingQuestionShortReturn => {
	const { submitAnswerPayload, setSubmitAnswerPayload } =
		useControlQuestionSubmitShortAnswerStore();

	const { question, ...rest } =
		useControlSolvingQuestion<ShortQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const addedAnswers = submitAnswerPayload?.shortAnswers ?? [];

	/**
	 * Groups short answer responses by their number into a 2D array.
	 */
	const grouppedQuestionAnswers = useMemo(() => {
		const grouped = Array.from(
			{ length: question?.answerCount ?? 0 },
			() => [] as ShortAnswerApiResponse[],
		);

		question?.answers?.forEach((answer) => {
			if (answer.number >= 1 && answer.number <= grouped.length) {
				grouped[answer.number - 1].push(answer);
			}
		});

		return grouped;
	}, [question?.answers, question?.answerCount]);

	/**
	 * Groups added short answers by their number into a 2D array.
	 */
	const grouppedAddedAnswers = useMemo(() => {
		const grouped = Array.from(
			{ length: question?.answerCount ?? 0 },
			() => [] as ShortAnswerDto[],
		);

		addedAnswers.forEach((answer) => {
			if (answer.number >= 1 && answer.number <= grouped.length) {
				grouped[answer.number - 1].push(answer);
			}
		});

		return grouped;
	}, [addedAnswers, question?.answerCount]);

	/**
	 *
	 */
	const handleSubAnswerAdd = (number: number) => {
		const questoinAnswersCount = grouppedQuestionAnswers[number - 1].length;
		const addedAnswersCount = grouppedAddedAnswers[number - 1].length;

		// Answer count limit is 5 + 1 (main answer is included in questionAnswersCount)
		if (questoinAnswersCount + addedAnswersCount >= 5 + 1) {
			notify.warn("인정 답안은 최대 5개까지 등록할 수 있습니다.");

			return;
		}

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
			type: "SHORT" as "ShortUpdateAnswerPayload",
			shortAnswers: newAddedAnswers,
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
			type: "SHORT" as "ShortUpdateAnswerPayload",
			shortAnswers: newAddedAnswers,
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
			type: "SHORT" as "ShortUpdateAnswerPayload",
			shortAnswers: newAddedAnswers,
		});
	};

	/**
	 *
	 */
	const resetAddedAnswers = useCallback(() => {
		setSubmitAnswerPayload({
			type: "SHORT" as "ShortUpdateAnswerPayload",
			shortAnswers: [],
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

export default useControlSolvingQuestionShort;
