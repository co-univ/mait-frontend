import type { CreateQuestionSetApiRequest, QuestionCount } from "@/libs/types";

//
//
//

export type CreationNewQuestionSetState = CreateQuestionSetApiRequest;

type CreationNewQuestionSetAction =
	| {
			type: "SET_CREATION_TYPE";
			payload: CreationNewQuestionSetState["creationType"];
	  }
	| { type: "SET_SUBJECT"; payload: string }
	| {
			type: "SET_QUESTION_COUNT_CHECK";
			payload: { checked: boolean; type: QuestionCount["type"] };
	  }
	| {
			type: "SET_QUESTION_COUNT_COUNT";
			payload: { type: QuestionCount["type"]; count: number };
	  }
	| {
			type: "SET_DIFFICULTY";
			payload: string;
	  }
	| {
			type: "SET_MATERIALS";
			payload: CreationNewQuestionSetState["materials"];
	  }
	| {
			type: "SET_INSTRUCTION";
			payload: string;
	  };

//
//
//

export const creationNewQuestionSetInitialState = (
	teamId: number,
): CreationNewQuestionSetState => ({
	teamId,
	creationType: "AI_GENERATED",
	subject: "",
	counts: [],
	difficulty: "",
	materials: undefined,
	instruction: "",
});

//
//
//

export const creationNewQuestionSetReducer = (
	state: CreationNewQuestionSetState,
	action: CreationNewQuestionSetAction,
): CreationNewQuestionSetState => {
	switch (action.type) {
		case "SET_CREATION_TYPE":
			return {
				...state,
				creationType: action.payload,
			};
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
		case "SET_DIFFICULTY":
			return {
				...state,
				difficulty: action.payload,
			};
		case "SET_MATERIALS":
			return {
				...state,
			};
		case "SET_INSTRUCTION":
			return {
				...state,
				instruction: action.payload,
			};
		default:
			return state;
	}
};
