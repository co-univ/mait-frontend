import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
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
	options: OrderingOptionApiResponse[];
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionOrdering = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionOrderingProps): ControlSolvingQuestionOrderingReturn => {
	const { question, isLoading } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	const options = (question as OrderingQuestionApiResponse)?.options
		.slice()
		.sort((a, b) => (a.answerOrder || 0) - (b.answerOrder || 0));

	return {
		question: question as OrderingQuestionApiResponse,
		options,
		isLoading,
	};
};

export default useControlSolvingQuestionOrdering;
