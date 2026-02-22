import { useMemo } from "react";
import { notify } from "@/components/Toast";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import type {
	UseCreationQuestionProps,
	UseCreationQuestionReturn,
} from "./_useCreationQuestion";
import useCreationQuestion from "./_useCreationQuestion";

//
//
//

interface UseCreationQuestionOrderingProps extends UseCreationQuestionProps {}

interface UseCreationQuestionOrderingReturn
	extends UseCreationQuestionReturn<OrderingQuestionApiResponse> {
	originOrderOptions?: OrderingOptionApiResponse[];
	answerOrderOptions?: OrderingOptionApiResponse[];
	changeOptionContent: (optionId: number, content: string) => void;
	changeAnswerOrder: (reorderedOptions: OrderingOptionApiResponse[]) => void;
	addOption: () => void;
	deleteOption: (optionId: number) => void;
}

//
//
//

const useCreationQuestionOrdering = ({
	questionSetId,
	questionId,
}: UseCreationQuestionOrderingProps): UseCreationQuestionOrderingReturn => {
	const baseCreationQuestionResult =
		useCreationQuestion<OrderingQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { question, setQuestion } = baseCreationQuestionResult;
	const options = question?.options;
	const originOrderOptions = useMemo(
		() => options?.sort((a, b) => a.originOrder - b.originOrder),
		[options],
	);
	const answerOrderOptions = useMemo(
		() => options?.sort((a, b) => (a.answerOrder ?? 0) - (b.answerOrder ?? 0)),
		[options],
	);

	/**
	 *
	 */
	const changeOptionContent = (optionId: number, content: string) => {
		if (!options) {
			return;
		}

		const updatedOptions = options.map((option) =>
			option.id === optionId ? { ...option, content } : option,
		);

		setQuestion({
			...question,
			options: updatedOptions,
		});
	};

	/**
	 *
	 */
	const changeAnswerOrder = (reorderedOptions: OrderingOptionApiResponse[]) => {
		if (!options) {
			return;
		}

		const updatedOptions = reorderedOptions.map((option, index) => ({
			...option,
			answerOrder: index + 1,
		}));

		setQuestion({
			...question,
			options: updatedOptions,
		});
	};

	/**
	 *
	 */
	const addOption = () => {
		if (!options) {
			return;
		}

		if (options.length >= 6) {
			notify.warn("순서 정답은 최대 6개까지 추가할 수 있습니다.");

			return;
		}

		const newOption: OrderingOptionApiResponse = {
			id: generateTemporaryId(),
			originOrder: options.length + 1,
			answerOrder: options.length + 1,
			content: "",
		};
		const updatedOptions = [...options, newOption];

		setQuestion({
			...question,
			options: updatedOptions,
		});
	};

	/**
	 *
	 */
	const deleteOption = (optionId: number) => {
		const deletedOption = options?.find((option) => option.id === optionId);

		if (!options || !deletedOption) {
			return;
		}

		if (options.length <= 2) {
			notify.warn("순서 정답은 최소 2개 이상 있어야 합니다.");

			return;
		}

		const updatedOptions = options
			.filter((option) => option.id !== optionId)
			.map((option) => ({
				...option,
				originOrder:
					option.originOrder > deletedOption.originOrder
						? option.originOrder - 1
						: option.originOrder,
				answerOrder:
					(option?.answerOrder ?? 0) > (deletedOption?.answerOrder ?? 0)
						? (option?.answerOrder ?? 1) - 1
						: option.answerOrder,
			}));

		setQuestion({
			...question,
			options: updatedOptions,
		});
	};

	return {
		...baseCreationQuestionResult,
		originOrderOptions,
		answerOrderOptions,
		changeOptionContent,
		changeAnswerOrder,
		addOption,
		deleteOption,
	};
};

export default useCreationQuestionOrdering;
