import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CreationQuestionBlankNode from "@/domains/creation/editors/question/CreationQuestionBlankNode";

//
//
//

const CreationQuestionBlankExtension = Node.create({
	name: "question-blank",

	group: "inline",

	inline: true,

	atom: true,

	addAttributes() {
		return {
			number: {
				default: 1,
			},
			answer: {
				default: "",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "question-blank",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["question-blank", mergeAttributes(HTMLAttributes)];
	},

	renderText({ node }) {
		return `{{${node.attrs.number}}}`;
	},

	addNodeView() {
		return ReactNodeViewRenderer(CreationQuestionBlankNode, { as: "span" });
	},
});

export default CreationQuestionBlankExtension;
