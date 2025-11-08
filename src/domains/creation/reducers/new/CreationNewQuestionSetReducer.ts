import type { CreateQuestionSetApiRequest, QuestionCount } from "@/libs/types";

//
//
//

type CreationNewQuestionSetState = CreateQuestionSetApiRequest;

type CreationNewQuestionSetAction =
	| { type: "SET_SUBJECT"; payload: string }
	| {
			type: "SET_QUESTION_COUNT_CHECK";
			payload: { checked: boolean; type: QuestionCount["type"] };
	  }
	| {
			type: "SET_QUESTION_COUNT_COUNT";
			payload: { type: QuestionCount["type"]; count: number };
	  };

//
//
//

export const creationNewQuestionSetInitialState = (
	teamId: number,
): CreationNewQuestionSetState => ({
	teamId,
	creationType: "MANUAL",
	subject: "",
	counts: [],
});

//
//
//

export const creationNewQuestionSetReducer = (
	state: CreationNewQuestionSetState,
	action: CreationNewQuestionSetAction,
): CreationNewQuestionSetState => {
	switch (action.type) {
		case "SET_SUBJECT":
			return {
				...state,
				subject: action.payload,
			};
		case "SET_QUESTION_COUNT_CHECK": {
			const newCounts = !action.payload.checked
				? state.counts?.filter((c) => c.type !== action.payload.type)
				: [
						...(state.counts ?? []),
						{
							type: action.payload.type,
							count: 1,
						},
					];

			return {
				...state,
				counts: newCounts,
			};
		}
		case "SET_QUESTION_COUNT_COUNT": {
			const newCounts = state.counts?.map((c) => {
				if (c.type === action.payload.type) {
					return {
						...c,
						count: action.payload.count,
					};
				}

				return c;
			});

			return {
				...state,
				counts: newCounts,
			};
		}
		default:
			return state;
	}
};
