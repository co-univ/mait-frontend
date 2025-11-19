import { useCallback, useEffect, useState } from "react";
import type {
	FillBlankAnswerApiResponse,
	FillBlankQuestionApiResponse,
	FillBlankUpdateAnswerPayload,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import useControlSolvingQuestion from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionFillBlankProps {
	questionSetId: number;
	questionId: number;
}

interface UseControlSolvingQuestionFillBlankReturn {
	question?: FillBlankQuestionApiResponse;
	groupedAnswers?: FillBlankAnswerApiResponse[][];
	handleAnswerChange: (id: number, answer: string) => void;
	handleSubAnswerAdd: (number: number) => void;
	handleSubAnswerDelete: (id: number) => void;
	handleAnswerAdd: () => Promise<boolean>;
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionFillBlank = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionFillBlankProps): UseControlSolvingQuestionFillBlankReturn => {
	const [groupedAnswers, setGroupedAnswers] =
		useState<FillBlankAnswerApiResponse[][]>();

	const { question, questionUpdatedAt, handleAnswerAdd, isLoading } =
		useControlSolvingQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const handleAnswerChange = (id: number, answer: string) => {
		if (!groupedAnswers) {
			return;
		}

		const updatedGroupedAnswers = groupedAnswers.map((answers) =>
			answers.map((ans) => {
				if (ans.id === id) {
					return {
						...ans,
						answer,
					};
				}

				return ans;
			}),
		);

		setGroupedAnswers(updatedGroupedAnswers);
	};

	/**
	 *
	 */
	const handleSubAnswerAdd = (number: number) => {
		if (!groupedAnswers) {
			return;
		}

		const newGroupedAnswers = groupedAnswers.map((answers, index) => {
			if (index + 1 === number) {
				const newAnswer: FillBlankAnswerApiResponse = {
					id: generateTemporaryId(),
					number,
					answer: "",
					isMain: false,
				};

				return [...answers, newAnswer];
			}

			return answers;
		});

		setGroupedAnswers(newGroupedAnswers);
	};

	/**
	 *
	 */
	const handleSubAnswerDelete = (id: number) => {
		if (!groupedAnswers) {
			return;
		}

		const newGroupedAnswers = groupedAnswers.map((answers) =>
			answers.filter((answer) => answer.id !== id),
		);

		setGroupedAnswers(newGroupedAnswers);
	};

	/**
	 *
	 */
	const handleFillBlankAnswerAdd = useCallback(() => {
		if (!groupedAnswers) {
			return Promise.resolve(false);
		}

		const payload = {
			type: "FILL_BLANK",
			answersssss: groupedAnswers.flat().map((answer) => ({
				id: answer.id,
				answer: answer.answer,
				main: answer.isMain,
				number: answer.number,
			})),
		} as unknown as FillBlankUpdateAnswerPayload;

		return handleAnswerAdd(payload);
	}, [groupedAnswers, handleAnswerAdd]);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when question refetched, reset answers state
	useEffect(() => {
		if (!question) {
			return;
		}

		const newGroupedAnswers: FillBlankAnswerApiResponse[][] = [];

		(question as FillBlankQuestionApiResponse)?.answers?.forEach((answer) => {
			const index = answer.number - 1;

			if (!newGroupedAnswers[index]) {
				newGroupedAnswers[index] = [];
			}

			newGroupedAnswers[index].push(answer);
		});

		setGroupedAnswers(newGroupedAnswers);
	}, [question, questionUpdatedAt]);

	return {
		question: question as FillBlankQuestionApiResponse,
		groupedAnswers,
		handleAnswerChange,
		handleSubAnswerAdd,
		handleSubAnswerDelete,
		handleAnswerAdd: handleFillBlankAnswerAdd,
		isLoading,
	};
};

export default useControlSolvingQuestionFillBlank;
