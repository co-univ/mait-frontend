import type {
	QuestionSetCategoryApiResponse,
	QuestionSetSolveMode,
	QuestionSetVisibility,
	UpdateQuestionSetApiRequest,
} from "@/libs/types";

//
//
//

export type CreationPublishQuestionSetState = UpdateQuestionSetApiRequest & {
	categories: QuestionSetCategoryApiResponse[];
};

type CreationPublishQuestionSetAction =
	| { type: "SET_TITLE"; payload: string }
	| { type: "SET_MODE"; payload: QuestionSetSolveMode }
	| { type: "SET_DIFFICULTY"; payload: string }
	| { type: "SET_VISIBILITY"; payload: QuestionSetVisibility }
	| { type: "SET_CATEGORIES"; payload: QuestionSetCategoryApiResponse[] }
	| { type: "ADD_CATEGORIES"; payload: QuestionSetCategoryApiResponse }
	| { type: "REMOVE_CATEGORY"; payload: number };

export const getCreationPublishQuestionInitialState = (
	teamType?: string,
): CreationPublishQuestionSetState => ({
	title: "",
	solveMode: (teamType === "PERSONAL" ? "STUDY" : "LIVE_TIME") as QuestionSetSolveMode,
	difficulty: "",
	visibility: "PUBLIC" as QuestionSetVisibility,
	categories: [],
});

//
//
//

export const creationPublishQuestionSetReducer = (
	state: CreationPublishQuestionSetState,
	action: CreationPublishQuestionSetAction,
): CreationPublishQuestionSetState => {
	switch (action.type) {
		case "SET_TITLE":
			return { ...state, title: action.payload };
		case "SET_MODE":
			return { ...state, solveMode: action.payload };
		case "SET_DIFFICULTY":
			return { ...state, difficulty: action.payload };
		case "SET_VISIBILITY":
			return { ...state, visibility: action.payload };
		case "SET_CATEGORIES":
			return { ...state, categories: action.payload };
		case "ADD_CATEGORIES":
			return { ...state, categories: [...state.categories, action.payload] };
		case "REMOVE_CATEGORY":
			return {
				...state,
				categories: state.categories.filter(
					(category) => category.id !== action.payload,
				),
			};
		default:
			return state;
	}
};
