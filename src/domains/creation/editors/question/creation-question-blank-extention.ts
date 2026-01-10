import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CreationQuestionBlankNode from "@/domains/creation/editors/question/CreationQuestionBlankNode";

//
//
//

export interface QuestionBlankAttributes {
	number: number;
	answer: string;
}

//
//
//

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		questionBlank: {
			/**
			 * Insert a question blank node
			 */
			setQuestionBlank: (
				attributes?: Partial<QuestionBlankAttributes>,
			) => ReturnType;
			/**
			 * Update question blank attributes
			 */
			updateQuestionBlank: (
				attributes: Partial<QuestionBlankAttributes>,
			) => ReturnType;
		};
	}
}

//
//
//

const CreationQuestionBlankExtension = Node.create<QuestionBlankAttributes>({
	name: "question-blank",

	group: "inline",

	inline: true,

	atom: true,

	addAttributes() {
		return {
			number: {
				default: undefined,
				parseHTML: (element) => {
					const number = element.getAttribute("data-number");
					return Number(number);
				},
				renderHTML: (attributes) => {
					return {
						"data-number": attributes.number,
					};
				},
			},
			answer: {
				default: "",
				parseHTML: (element) => element.getAttribute("data-answer") || "",
				renderHTML: (attributes) => {
					return {
						"data-answer": attributes.answer,
					};
				},
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

	addCommands() {
		return {
			setQuestionBlank:
				(attributes) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: attributes,
					});
				},

			updateQuestionBlank:
				(attributes) =>
				({ commands }) => {
					return commands.updateAttributes(this.name, attributes);
				},
		};
	},
});

export default CreationQuestionBlankExtension;
