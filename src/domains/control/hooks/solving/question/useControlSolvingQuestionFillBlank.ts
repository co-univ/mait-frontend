import type {
	FillBlankAnswerApiResponse,
	FillBlankQuestionApiResponse,
} from "@/libs/types";
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
	groupedAnswers: FillBlankAnswerApiResponse[][];
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionFillBlank = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionFillBlankProps): UseControlSolvingQuestionFillBlankReturn => {
	const { question, isLoading } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	const groupedAnswers: FillBlankAnswerApiResponse[][] = [];

	(question as FillBlankQuestionApiResponse)?.answers?.forEach((answer) => {
		const index = answer.number - 1;

		if (!groupedAnswers[index]) {
			groupedAnswers[index] = [];
		}

		groupedAnswers[index].push(answer);
	});

	return {
		question: question as FillBlankQuestionApiResponse,
		groupedAnswers,
		isLoading,
	};
};

export default useControlSolvingQuestionFillBlank;
