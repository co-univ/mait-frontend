import type {
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
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
	groupedAnswers: ShortAnswerApiResponse[][];
	isLoading: boolean;
}

//
//
//

const useControlSolvingQuestionShort = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionShortProps): UseControlSolvingQuestionShortReturn => {
	const { question, isLoading } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	const groupedAnswers: ShortAnswerApiResponse[][] = [];

	(question as ShortQuestionApiResponse)?.answers?.forEach((answer) => {
		const index = answer.number - 1;

		if (!groupedAnswers[index]) {
			groupedAnswers[index] = [];
		}

		groupedAnswers[index].push(answer);
	});

	return {
		question: question as ShortQuestionApiResponse,
		groupedAnswers,
		isLoading,
	};
};
export default useControlSolvingQuestionShort;
