import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import type {
	ShortAnswerApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

interface UseQuestionShortProps {
	questionId: number;
}

interface UseQuestionShortReturn {
	question?: ShortQuestionApiResponse;
	groupedAnswers: ShortAnswerApiResponse[][];
	handleAnswerChange: (answerId: number, newAnswer: string) => void;
	handleMainAnswerAdd: () => void;
	handleSubAnswerAdd: (number: number) => void;
	handleMainAnswerDelete: (number: number) => void;
	handleSubAnswerDelete: (answerId: number) => void;
}

//
//
//

const useCreationQuestionShort = ({
	questionId,
}: UseQuestionShortProps): UseQuestionShortReturn => {
	const { questions, editQuestion } = useCreationQuestionsStore();

	const question = questions.find((q) => q.id === questionId) as
		| ShortQuestionApiResponse
		| undefined;

	const groupedAnswers: ShortAnswerApiResponse[][] = [];

	question?.answers?.forEach((answer) => {
		const index = answer.number - 1;

		if (!groupedAnswers[index]) {
			groupedAnswers[index] = [];
		}

		groupedAnswers[index].push(answer);
	});

	/**
	 *
	 */
	const handleAnswerChange = (answerId: number, newAnswer: string) => {
		const updatedAnswers = question?.answers?.map((answer) =>
			answer.id === answerId ? { ...answer, answer: newAnswer } : answer,
		);

		editQuestion({
			...question,
			answers: updatedAnswers,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleMainAnswerAdd = () => {
		if (groupedAnswers.length === 5) {
			notify.error("주관식 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (question) {
			const newAnswer: ShortAnswerApiResponse = {
				id: generateTemporaryId(),
				answer: "",
				isMain: true,
				number: groupedAnswers.length + 1,
			};

			const updatedAnswers = question.answers
				? [...question.answers, newAnswer]
				: [newAnswer];

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleSubAnswerAdd = (number: number) => {
		const groupedAnswer = groupedAnswers[number - 1];

		if (groupedAnswer && groupedAnswer.length === 6) {
			notify.error("인정 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (question) {
			const newAnswer: ShortAnswerApiResponse = {
				id: generateTemporaryId(),
				answer: "",
				isMain: false,
				number,
			};

			const updatedAnswers = question.answers
				? [...question.answers, newAnswer]
				: [newAnswer];

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleMainAnswerDelete = (number: number) => {
		if (groupedAnswers.length === 1) {
			notify.error("주관식 답안은 한개 이상 있어야 합니다.");

			return;
		}

		if (question) {
			const updatedAnswers = (question.answers || [])
				.filter((answer) => answer.number !== number)
				.map((answer) => {
					if (answer.number > number) {
						return { ...answer, number: answer.number - 1 };
					}
					return answer;
				});

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleSubAnswerDelete = (answerId: number) => {
		if (question) {
			const updatedAnswers = (question.answers || []).filter(
				(answer) => answer.id !== answerId,
			);

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	return {
		question,
		groupedAnswers,
		handleAnswerChange,
		handleMainAnswerAdd,
		handleSubAnswerAdd,
		handleMainAnswerDelete,
		handleSubAnswerDelete,
	};
};

export default useCreationQuestionShort;
