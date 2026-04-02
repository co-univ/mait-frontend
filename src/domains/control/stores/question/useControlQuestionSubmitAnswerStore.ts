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

interface ControlQuestionSubmitAnswerStoreState {
	hasSubmitAnswerPayload: boolean;
	submitAnswerPayload?: UpdateAnswerPayloadType;
}

interface ControlQuestionSubmitAnswerStoreActions {
	setSubmitAnswerPayload: (payload: UpdateAnswerPayloadType) => void;
}

//
//
//

const useControlQuestionSubmitAnswerStore = create<
	ControlQuestionSubmitAnswerStoreState &
		ControlQuestionSubmitAnswerStoreActions
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

export default useControlQuestionSubmitAnswerStore;
