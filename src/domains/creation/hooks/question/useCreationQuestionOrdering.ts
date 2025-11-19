import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

interface UseCreationQuestionOrderingProps {
	questionId: number;
}

interface UseCreationQuestionOrderingReturn {
	question?: OrderingQuestionApiResponse;
	originOrderOptions: OrderingOptionApiResponse[];
	answerOrderOptions: OrderingOptionApiResponse[];
	handleOptionContentChange: (optionId: number, content: string) => void;
	handleAnswerOrderChange: (
		reorderedOptions: OrderingOptionApiResponse[],
	) => void;
	handleOptionAdd: () => void;
	handleOptionDelete: (optionId: number) => void;
}

//
//
//

const useCreationQuestionOrdering = ({
	questionId,
}: UseCreationQuestionOrderingProps): UseCreationQuestionOrderingReturn => {
	const { questions, editQuestion } = useCreationQuestionsStore();

	const question = questions.find((q) => q.id === questionId) as
		| OrderingQuestionApiResponse
		| undefined;

	const options = question?.options || [];

	const originOrderOptions = [...options].sort(
		(a, b) => a.originOrder - b.originOrder,
	);
	const answerOrderOptions = [...options].sort(
		(a, b) => (a.answerOrder || 0) - (b.answerOrder || 0),
	);

	/**
	 *
	 */
	const handleOptionContentChange = (optionId: number, content: string) => {
		const updatedOptions = question?.options.map((option) =>
			option.id === optionId ? { ...option, content } : option,
		);

		editQuestion({
			...question,
			options: updatedOptions,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleAnswerOrderChange = (
		reorderedOptions: OrderingOptionApiResponse[],
	) => {
		const updatedOptions = reorderedOptions.map((option, index) => ({
			...option,
			answerOrder: index + 1,
		}));

		editQuestion({
			...question,
			options: updatedOptions,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleOptionAdd = () => {
		if (options.length === 6) {
			notify.error("순서 정답은 최대 6개까지 추가할 수 있습니다.");

			return;
		}

		const newOption: OrderingOptionApiResponse = {
			id: generateTemporaryId(),
			content: "",
			originOrder: options.length + 1,
			answerOrder: options.length + 1,
		};

		const updatedOptions = question?.options.concat(newOption);

		editQuestion({
			...question,
			options: updatedOptions,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleOptionDelete = (optionId: number) => {
		if (options.length === 2) {
			notify.error("순서 정답은 두개 이상 있어야 합니다.");

			return;
		}

		const updatedOptions = question?.options
			.filter((option) => option.id !== optionId)
			.map((option, index) => ({
				...option,
				originOrder: index + 1,
				answerOrder: index + 1,
			}));

		editQuestion({
			...question,
			options: updatedOptions,
		} as QuestionResponseType);
	};

	return {
		question,
		originOrderOptions,
		answerOrderOptions,
		handleOptionContentChange,
		handleAnswerOrderChange,
		handleOptionAdd,
		handleOptionDelete,
	};
};

export default useCreationQuestionOrdering;
