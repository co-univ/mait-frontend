import type { QuestionResponseType } from "@/app.constants";
import type { CreationQuestionType } from "../../creation.constant";

//
//
//

export interface UseCreationQuestionProps {
	questionSetID: number;
	questionId: number;
}

export type UseCreationQuestionReturn<
	TData extends CreationQuestionType = CreationQuestionType,
> = {
	question?: TData;
	changeQuestionContent: (content: string) => void;
	changeQuestionExplanation: (explanation: string) => void;
	changeQuestionType: (type: string) => void;
	addQuestionImage: (file: File | null) => void;
	saveQuestion: () => void;
	deleteQuestion: () => void;
};

//
//
//

const useCreationQuestion = () => {
	return {};
};

export default useCreationQuestion;
