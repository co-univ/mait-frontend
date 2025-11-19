import type { QuestionResponseType } from "@/app.constants";

export type QuestionResponseTypeWithIsEditing = QuestionResponseType & {
	isEditing: boolean;
};
