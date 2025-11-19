import { useCallback, useEffect, useState } from "react";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
	OrderingUpdateAnswerPayload,
} from "@/libs/types";
import useControlSolvingQuestion from "./useControlSolvingQuestion";

//
//
//

interface UseControlSolvingQuestionOrderingProps {
	questionSetId: number;
	questionId: number;
}

interface ControlSolvingQuestionOrderingReturn {
	question?: OrderingQuestionApiResponse;
	options?: OrderingOptionApiResponse[];
	handleOrderingChange: (newOptions: OrderingOptionApiResponse[]) => void;
	handleOrderingAnswerAdd: () => Promise<boolean>;
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionOrdering = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionOrderingProps): ControlSolvingQuestionOrderingReturn => {
	const [options, setOptions] = useState<OrderingOptionApiResponse[]>();

	const { question, questionUpdatedAt, handleAnswerAdd, isLoading } =
		useControlSolvingQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const handleOrderingChange = (newOptions: OrderingOptionApiResponse[]) => {
		setOptions(newOptions);
	};

	/**
	 *
	 */
	const handleOrderingAnswerAdd = useCallback(() => {
		if (!options) {
			return Promise.resolve(false);
		}

		const payload = {
			type: "ORDERING",
			options: options.map((option, index) => ({
				optionId: option.id,
				answerOrder: index + 1,
			})),
		} as OrderingUpdateAnswerPayload;

		return handleAnswerAdd(payload);
	}, [options, handleAnswerAdd]);

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when question refetched, reset answers state
	useEffect(() => {
		if (question) {
			const newOptions = (question as OrderingQuestionApiResponse).options
				.slice()
				.sort((a, b) => (a.answerOrder || 0) - (b.answerOrder || 0));

			setOptions(newOptions);
		}
	}, [question, questionUpdatedAt]);

	return {
		question: question as OrderingQuestionApiResponse,
		options,
		handleOrderingChange,
		handleOrderingAnswerAdd,
		isLoading,
	};
};

export default useControlSolvingQuestionOrdering;
