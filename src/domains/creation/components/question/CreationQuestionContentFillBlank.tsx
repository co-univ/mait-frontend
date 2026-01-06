import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { clsx } from "clsx";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import CreationQuestionBlankExtension from "@/domains/creation/editors/question/creation-question-blank-extention";
import useCreationQuestionFillBlank from "../../hooks/question/useCreationQuestionFillBlank";
import "./editor.css";

//
//
//

const CreationQuestionContentFillBlank = () => {
	const questionId = Number(useParams().questionId);

	const {
		fillBlankContent,
		groupedAnswers,
		handleContentChange,
		handleMainAnswerAdd,
	} = useCreationQuestionFillBlank({
		questionId,
	});

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
		content: fillBlankContent,
		editorProps: {
			attributes: {
				class:
					"typo-body-large placeholder:text-color-gray-40 focus-visible:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			handleContentChange(editor.getHTML());
		},
	});

	/**
	 * Get next blank number from groupedAnswers
	 */
	const getNextBlankNumber = (): number => {
		return groupedAnswers.length + 1;
	};

	/**
	 * Add blank at cursor position
	 */
	const handleAddBlank = () => {
		if (groupedAnswers.length === 5) {
			notify.error("빈칸은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (!editor) {
			return;
		}

		const nextNumber = getNextBlankNumber();

		editor
			.chain()
			.focus()
			.insertContent(
				`<question-blank number="${nextNumber}" answer=""></question-blank>`,
			)
			.run();

		handleMainAnswerAdd(editor.getHTML());
	};

	/**
	 * Update editor content when fillBlankContent changes
	 */
	useEffect(() => {
		if (editor && fillBlankContent !== editor.getHTML()) {
			editor.commands.setContent(fillBlankContent);
		}
	}, [editor, fillBlankContent]);

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
					onClick={handleAddBlank}
				/>
			</div>
		</div>
	);
};

export default CreationQuestionContentFillBlank;
