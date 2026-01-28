import { create } from "zustand";
import type {
	FillBlankUpdateAnswerPayload,
	ShortUpdateAnswerPayload,
} from "@/libs/types";

//
//
//

type UpdateAnswerPayloadType =
	| ShortUpdateAnswerPayload
	| FillBlankUpdateAnswerPayload;

interface ControlQuestionSubmitAnswerStoreState<TData> {
	hasSubmitAnswerPayload: boolean;
	submitAnswerPayload?: TData;
}

interface ControlQuestionSubmitAnswerStoreActions<TData> {
	setSubmitAnswerPayload: (payload: TData) => void;
}

//
//
//

const createControlQuestionSubmitAnswerStore = <
	TData extends UpdateAnswerPayloadType = UpdateAnswerPayloadType,
>() => {
	return create<
		ControlQuestionSubmitAnswerStoreState<TData> &
			ControlQuestionSubmitAnswerStoreActions<TData>
	>()((set) => ({
		hasSubmitAnswerPayload: false,

		setSubmitAnswerPayload: (payload) => {
			const shortAnswers =
				(payload as ShortUpdateAnswerPayload).shortAnswers ?? [];

			const fillBlankAnswers =
				(payload as FillBlankUpdateAnswerPayload).answers ?? [];

			const isShortAnswersArrayValid =
				shortAnswers.length > 0 &&
				shortAnswers.every((answer) => answer?.answer?.trim() !== "");

			const isFillBlankAnswersArrayValid =
				fillBlankAnswers.length > 0 &&
				fillBlankAnswers.every((answer) => answer?.answer?.trim() !== "");

			set({
				submitAnswerPayload: payload,
				hasSubmitAnswerPayload: Boolean(
					isShortAnswersArrayValid || isFillBlankAnswersArrayValid,
				),
			});
		},
	}));
};

const useControlQuestionSubmitAnswerStore =
	createControlQuestionSubmitAnswerStore();
const useControlQuestionSubmitShortAnswerStore =
	createControlQuestionSubmitAnswerStore<ShortUpdateAnswerPayload>();
const useControlQuestionSubmitFillBlankAnswerStore =
	createControlQuestionSubmitAnswerStore<FillBlankUpdateAnswerPayload>();

export default useControlQuestionSubmitAnswerStore;
export {
	useControlQuestionSubmitShortAnswerStore,
	useControlQuestionSubmitFillBlankAnswerStore,
};
