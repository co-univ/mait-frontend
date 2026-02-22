import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { clsx } from "clsx";
import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionBlankExtension from "@/domains/creation/editors/question/creation-question-blank-extention";
import useCreationQuestionFillBlank from "../../hooks/question/_useCreationQuestionFillBlank";
import "./editor.css";

//
//
//

interface CreationQuestionContentFillBlankProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionContentFillBlank = ({
	questionSetId,
	questionId,
}: CreationQuestionContentFillBlankProps) => {
	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Paragraph,
			CreationQuestionBlankExtension,
			Placeholder.configure({
				placeholder: "문제를 입력하세요",
			}),
		],
		editorProps: {
			attributes: {
				class:
					"typo-body-large placeholder:text-color-gray-40 focus-visible:outline-none",
			},
		},
	});

	const { addMainAnswer } = useCreationQuestionFillBlank({
		questionSetId,
		questionId,
		editor,
	});

	return (
		<div className="w-full flex flex-col gap-gap-5">
			<EditorContent
				editor={editor}
				className={clsx(
					"question-content-fill-blank",
					"w-full py-padding-9 px-padding-12 rounded-medium1 border border-color-gray-40",
				)}
			/>

			<div className="self-end">
				<Button
					icon={<Plus />}
					item="빈칸 추가"
					className="bg-color-gray-5 border-none"
					onClick={addMainAnswer}
				/>
			</div>
		</div>
	);
};

export default CreationQuestionContentFillBlank;
