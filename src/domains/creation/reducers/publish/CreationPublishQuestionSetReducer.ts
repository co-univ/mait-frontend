import type {
	QuestionSetSolveMode,
	QuestionSetVisibility,
	UpdateQuestionSetApiRequest,
} from "@/libs/types";

//
//
//

type CreationPublishQuestionSetState = UpdateQuestionSetApiRequest;

type CreationPublishQuestionSetAction =
	| { type: "SET_TITLE"; payload: string }
	| { type: "SET_SUBJECT"; payload: string }
	| { type: "SET_MODE"; payload: QuestionSetSolveMode }
	| { type: "SET_DIFFICULTY"; payload: string }
	| { type: "SET_VISIBILITY"; payload: QuestionSetVisibility };

export const CREATION_PUBLISH_QUESTION_INITIAL_STATE = {
	title: "",
	subject: "",
	solveMode: "LIVE_TIME" as QuestionSetSolveMode,
	difficulty: "",
	visibility: "PUBLIC" as QuestionSetVisibility,
};

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
		case "SET_SUBJECT":
			return { ...state, subject: action.payload };
		case "SET_MODE":
			return { ...state, solveMode: action.payload };
		case "SET_DIFFICULTY":
			return { ...state, difficulty: action.payload };
		case "SET_VISIBILITY":
			return { ...state, visibility: action.payload };
		default:
			return state;
	}
};
