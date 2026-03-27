import { useMemo } from "react";
import { notify } from "@/components/Toast";
import type {
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import type {
	UseCreationQuestionProps,
	UseCreationQuestionReturn,
} from "./useCreationQuestion";
import useCreationQuestion from "./useCreationQuestion";

//
//
//

interface UseCreationQuestionShortProps extends UseCreationQuestionProps {}

interface UseCreationQuestionShortReturn
	extends UseCreationQuestionReturn<ShortQuestionApiResponse> {
	groupedAnswers: ShortAnswerApiResponse[][];
	changeAnswer: (answerId: number, newAnswer: string) => void;
	addMainAnswer: () => void;
	addSubAnswer: (number: number) => void;
	deleteMainAnswer: (number: number) => void;
	deleteSubAnswer: (answerId: number) => void;
}

//
//
//

const useCreationQuestionShort = ({
	questionSetId,
	questionId,
}: UseCreationQuestionShortProps): UseCreationQuestionShortReturn => {
	const baseCreationQuestionResult =
		useCreationQuestion<ShortQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { question, setQuestion } = baseCreationQuestionResult;
	const answers = question?.answers;

	/**
	 * Groups short answer responses by their number into a 2D array.
	 */
	const groupedAnswers = useMemo(() => {
		const grouped: ShortAnswerApiResponse[][] = Array.from(
			{
				length: Math.max(...(answers?.map((ans) => ans.number) || [0])),
			},
			() => [],
		);

		answers?.forEach((answer) => {
			const index = answer.number - 1;

			grouped[index].push(answer);
		});

		return grouped;
	}, [answers]);

	/**
	 *
	 */
	const changeAnswer = (answerId: number, newAnswer: string) => {
		if (!answers) {
			return;
		}

		const updatedAnswers = answers.map((answer) =>
			answer.id === answerId ? { ...answer, answer: newAnswer } : answer,
		);

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 *
	 */
	const addMainAnswer = () => {
		if (!answers) {
			return;
		}

		if (groupedAnswers.length >= 5) {
			notify.warn("주관식 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		const newAnswer = {
			id: generateTemporaryId(),
			main: true,
			number: Math.max(...answers.map((a) => a.number), 0) + 1,
			answer: "",
		};
		const updatedAnswers = [...answers, newAnswer];

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 *
	 */
	const addSubAnswer = (number: number) => {
		if (!answers) {
			return;
		}

		// Answer count limit is 5 + 1 (main answer is included in groupedAnswers[number - 1].length)
		if (groupedAnswers[number - 1]?.length >= 5 + 1) {
			notify.warn("인정 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		const newAnswer = {
			id: generateTemporaryId(),
			main: false,
			number,
			answer: "",
		};
		const updatedAnswers = [...answers, newAnswer];

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 *
	 */
	const deleteMainAnswer = (number: number) => {
		if (!answers) {
			return;
		}

		if (groupedAnswers.length <= 1) {
			notify.warn("주관식 답안은 최소 1개 이상 존재해야 합니다.");

			return;
		}

		const updatedAnswers = answers.filter((answer) => answer.number !== number);

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 *
	 */
	const deleteSubAnswer = (answerId: number) => {
		if (!answers) {
			return;
		}

		const updatedAnswers = answers.filter((answer) => answer.id !== answerId);

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	return {
		...baseCreationQuestionResult,
		groupedAnswers,
		changeAnswer,
		addMainAnswer,
		addSubAnswer,
		deleteMainAnswer,
		deleteSubAnswer,
	};
};

export default useCreationQuestionShort;
