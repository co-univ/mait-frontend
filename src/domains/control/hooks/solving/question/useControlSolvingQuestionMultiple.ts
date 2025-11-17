import type {
	MultipleChoiceApiResponse,
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

type UseControlSolvingQuestionMultipleReturn = {
	question?: MultipleQuestionApiResponse;
	choices?: MultipleChoiceApiResponse[];
	isLoading: boolean;
};

//
//
//

const useControlSolvingQuestionMultiple = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionMultipleProps): UseControlSolvingQuestionMultipleReturn => {
	const { question, isLoading } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	const choices = (question as MultipleQuestionApiResponse)?.choices.sort(
		(a, b) => a.number - b.number,
	);

	return {
		question: question as MultipleQuestionApiResponse,
		choices,
		isLoading,
	};
};

export default useControlSolvingQuestionMultiple;
