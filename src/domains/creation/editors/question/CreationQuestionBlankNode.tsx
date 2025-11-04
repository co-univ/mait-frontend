import type { ReactNodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import useCreationQuestionFillBlank from "../../hooks/question/useCreationQuestionFillBlank";

//
//
//

const CreationQuestionBlankNode = (props: ReactNodeViewProps) => {
	const { number, answer } = props.node.attrs;

	const questionId = Number(useParams().questionId);

	const { handleMainAnswerDelete } = useCreationQuestionFillBlank({
		questionId,
	});

	return (
		<NodeViewWrapper className="question-blank" as="span">
			<span
				className={clsx(
					"inline-flex min-w-[132px] items-center justify-between px-padding-4 py-padding-3 mx-padding-3 rounded-medium1 border border-color-gray-20 gap-gap-3",
				)}
			>
				<span className="typo-body-xsmall text-color-gray-40">({number})</span>

				<span className="flex flex-1 typo-body-small">{answer}</span>

				<DeleteCheckBox onClick={() => handleMainAnswerDelete(number)} />
			</span>
		</NodeViewWrapper>
	);
};

export default CreationQuestionBlankNode;
