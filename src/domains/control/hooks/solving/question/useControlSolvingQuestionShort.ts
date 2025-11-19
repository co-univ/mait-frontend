import { useCallback, useEffect, useState } from "react";
import type {
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
	ShortUpdateAnswerPayload,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import useControlSolvingQuestion from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionShortProps {
	questionSetId: number;
	questionId: number;
}

interface UseControlSolvingQuestionShortReturn {
	question?: ShortQuestionApiResponse;
	groupedAnswers?: ShortAnswerApiResponse[][];
	handleAnswerChange: (id: number, answer: string) => void;
	handleSubAnswerAdd: (number: number) => void;
	handleSubAnswerDelete: (id: number) => void;
	handleAnswerAdd: () => Promise<boolean>;
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionShort = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionShortProps): UseControlSolvingQuestionShortReturn => {
	const [groupedAnswers, setGroupedAnswers] =
		useState<ShortAnswerApiResponse[][]>();

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
				const newAnswer: ShortAnswerApiResponse = {
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
	const handleShortAnswerAdd = useCallback(() => {
		if (!groupedAnswers) {
			return Promise.resolve(false);
		}

		const payload = {
			type: "SHORT",
			shortAnswers: groupedAnswers.flat().map((answer) => ({
				id: answer.id,
				answer: answer.answer,
				main: answer.isMain,
				number: answer.number,
			})),
		} as unknown as ShortUpdateAnswerPayload;

		return handleAnswerAdd(payload);
	}, [groupedAnswers, handleAnswerAdd]);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when question refetched, reset answers state
	useEffect(() => {
		if (!question) {
			return;
		}

		const newGroupedAnswers: ShortAnswerApiResponse[][] = [];

		(question as ShortQuestionApiResponse)?.answers?.forEach((answer) => {
			const index = answer.number - 1;

			if (!newGroupedAnswers[index]) {
				newGroupedAnswers[index] = [];
			}

			newGroupedAnswers[index].push(answer);
		});

		setGroupedAnswers(newGroupedAnswers);
	}, [question, questionUpdatedAt]);

	return {
		question: question as ShortQuestionApiResponse,
		groupedAnswers,
		handleAnswerChange,
		handleSubAnswerAdd,
		handleSubAnswerDelete,
		handleAnswerAdd: handleShortAnswerAdd,
		isLoading,
	};
};
export default useControlSolvingQuestionShort;
