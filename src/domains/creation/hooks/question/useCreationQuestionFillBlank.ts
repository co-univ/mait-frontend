import type { Editor } from "@tiptap/core";
import { useCallback, useEffect, useMemo } from "react";
import { FILL_BLANK_PATTERN } from "@/app.constants";
import { notify } from "@/components/Toast";
import type {
	FillBlankAnswerApiResponse,
	FillBlankQuestionApiResponse,
} from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";
import type {
	UseCreationQuestionProps,
	UseCreationQuestionReturn,
} from "./useCreationQuestion";
import useCreationQuestion from "./useCreationQuestion";

//
//
//

interface UseCreationQuestionFillBlankProps extends UseCreationQuestionProps {
	editor?: Editor;
}

interface UseCreationQuestionFillBlankReturn
	extends UseCreationQuestionReturn<FillBlankQuestionApiResponse> {
	fillBlankContent: string;
	groupedAnswers: FillBlankAnswerApiResponse[][];
	changeAnswer: (answerId: number, newAnswer: string) => void;
	addMainAnswer: () => void;
	addSubAnswer: (number: number) => void;
	deleteMainAnswer: (number: number) => void;
	deleteSubAnswer: (answerId: number) => void;
}

//
//
//

const useCreationQuestionFillBlank = ({
	questionSetId,
	questionId,
	editor,
}: UseCreationQuestionFillBlankProps): UseCreationQuestionFillBlankReturn => {
	const baseCreationQuestionResult =
		useCreationQuestion<FillBlankQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { question, setQuestion } = baseCreationQuestionResult;
	const answers = question?.answers;

	/**
	 * Groups fill blank answer responses by their number into a 2D array.
	 */
	const groupedAnswers = useMemo(() => {
		const grouped: FillBlankAnswerApiResponse[][] = Array.from(
			{
				length: Math.max(...(answers?.map((ans) => ans.number) || [0])),
			},
			() => [],
		);

		answers?.forEach((answer) => {
			const index = answer.number - 1;

			grouped[index].push(answer);
		});

		return grouped;
	}, [answers]);

	/**
	 * Convert {{number}} format to <question-blank> format for editor
	 */
	const fillBlankContent = useMemo(() => {
		if (!question?.content) {
			return "";
		}

		let html = question.content;
		const pattern = new RegExp(
			FILL_BLANK_PATTERN.source,
			FILL_BLANK_PATTERN.flags,
		);
		let match = pattern.exec(question.content);

		const replacements: Array<{ original: string; number: string }> = [];
		while (match) {
			const number = match[1];
			replacements.push({ original: match[0], number });
			match = pattern.exec(question.content);
		}

		for (const { original, number } of replacements) {
			html = html.replace(
				original,
				`<question-blank data-number="${number}"></question-blank>`,
			);
		}

		return html;
	}, [question?.content]);

	/**
	 * Change editor content and synchronize blank numbers with answers.
	 *
	 * When blanks ({{n}}) are deleted from the editor, this function:
	 * 1. Detects deleted blank numbers by comparing current content with existing answers
	 * 2. Removes all answers associated with deleted blanks
	 * 3. Renumbers remaining blanks and their answers to maintain sequential order
	 *
	 * @param content {string} - editor content in text format (ex: "Blank 1 is {{1}} and Blank 2 is {{2}}")
	 */
	const changeContent = useCallback(
		(content: string) => {
			if (!question) {
				return;
			}

			let updatedContent = content;
			let updatedAnswers = question.answers;

			const numbers: number[] = [];

			const pattern = new RegExp(
				FILL_BLANK_PATTERN.source,
				FILL_BLANK_PATTERN.flags,
			);
			let match = pattern.exec(content);

			while (match) {
				const number = Number(match[1]);

				if (!numbers.includes(number)) {
					numbers.push(number);
				}

				match = pattern.exec(content);
			}

			if (numbers.length < groupedAnswers.length) {
				const deletedNumbers: number[] = [];

				for (let i = 0; i < groupedAnswers.length; i += 1) {
					const number = i + 1;

					if (!numbers.includes(number)) {
						deletedNumbers.push(number);
					}
				}

				updatedAnswers = question.answers
					?.filter((answer) => !deletedNumbers.includes(answer.number))
					.map((answer) => {
						const shift = deletedNumbers.filter(
							(num) => num < answer.number,
						).length;

						if (shift > 0) {
							return { ...answer, number: answer.number - shift };
						}

						return answer;
					});

				updatedContent = content.replace(FILL_BLANK_PATTERN, (_, p1) => {
					const num = Number(p1);
					const shift = deletedNumbers.filter((dn) => dn < num).length;

					if (shift > 0) {
						return `{{${num - shift}}}`;
					}

					return `{{${num}}}`;
				});
			}

			setQuestion({
				...question,
				content: updatedContent,
				answers: updatedAnswers,
			});
		},
		[question, setQuestion, groupedAnswers.length],
	);

	/**
	 *
	 */
	const changeAnswer = (answerId: number, newAnswer: string) => {
		if (!answers) {
			return;
		}

		const updatedAnswers = answers.map((answer) =>
			answer.id === answerId ? { ...answer, answer: newAnswer } : answer,
		);

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 * Add a new blank at the current cursor position.
	 * Renumbers existing blanks and their associated answers accordingly.
	 */
	const addMainAnswer = () => {
		if (!answers) {
			return;
		}

		if (groupedAnswers.length >= 5) {
			notify.warn("빈칸은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (!editor || !question) {
			return;
		}

		// 1. Get cursor position
		const cursorPos = editor.state.selection.head;

		// 2. Count blank nodes before cursor to determine new blank number
		let blanksBeforeCursor = 0;

		editor.state.doc.nodesBetween(0, cursorPos, (node) => {
			if (node.type.name === "question-blank") {
				blanksBeforeCursor += 1;
			}
		});

		const newBlankNumber = blanksBeforeCursor + 1;

		const insertPos =
			editor.state.doc.textBetween(0, cursorPos).length +
			Array.from({ length: blanksBeforeCursor }, (_, idx) =>
				(idx + 1).toString(),
			).reduce((acc, cur) => acc + cur.length + 4, 0);

		// 3. Insert new blank at position in original content
		const originalContent = question.content || "";
		let updatedContent =
			originalContent.slice(0, insertPos) +
			`{{${newBlankNumber}}}` +
			originalContent.slice(insertPos);

		// 4. Find and renumber blanks that come after insertion and have number >= newBlankNumber
		const newBlankLength = `{{${newBlankNumber}}}`.length;
		const afterInsertPos = insertPos + newBlankLength;

		// Collect blanks to renumber
		const toRenumber: Array<{ start: number; end: number; oldNum: number }> =
			[];
		const pattern = new RegExp(
			FILL_BLANK_PATTERN.source,
			FILL_BLANK_PATTERN.flags,
		);
		let match = pattern.exec(updatedContent);

		while (match) {
			const matchStart = match.index;
			const matchEnd = match.index + match[0].length;
			const num = Number(match[1]);

			// Only renumber blanks that come after our insertion and have number >= newBlankNumber
			if (matchStart >= afterInsertPos && num >= newBlankNumber) {
				toRenumber.push({ start: matchStart, end: matchEnd, oldNum: num });
			}

			match = pattern.exec(updatedContent);
		}

		// Renumber from end to start to avoid position shifts
		toRenumber.reverse();

		for (const { start, end, oldNum } of toRenumber) {
			updatedContent =
				updatedContent.slice(0, start) +
				`{{${oldNum + 1}}}` +
				updatedContent.slice(end);
		}

		// 5. Update answers array (increment numbers >= newBlankNumber)
		const updatedAnswers = (question.answers || []).map((answer) => {
			if (answer.number >= newBlankNumber) {
				return { ...answer, number: answer.number + 1 };
			}

			return answer;
		});

		// 6. Add new main answer
		const newMainAnswer: FillBlankAnswerApiResponse = {
			id: generateTemporaryId(),
			answer: "",
			main: true,
			number: newBlankNumber,
		};

		updatedAnswers.push(newMainAnswer);

		// 7. Update question (this will trigger editor sync)
		setQuestion({
			...question,
			content: updatedContent,
			answers: updatedAnswers,
		});
	};

	/**
	 *
	 */
	const addSubAnswer = (number: number) => {
		if (!answers) {
			return;
		}

		// Answer count limit is 5 + 1 (main answer is included in groupedAnswers[number - 1].length)
		if (groupedAnswers[number - 1]?.length >= 5 + 1) {
			notify.warn("인정 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		const newAnswer = {
			id: generateTemporaryId(),
			main: false,
			number,
			answer: "",
		};
		const updatedAnswers = [...answers, newAnswer];

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	/**
	 * Delete {{number}} pattern from content.
	 * The rest (answer deletion and renumbering) is delegated to handleContentChange.
	 *
	 * @param number - The blank number to delete
	 */
	const deleteMainAnswer = (number: number) => {
		if (!answers) {
			return;
		}

		const updatedContent = question?.content?.replace(
			FILL_BLANK_PATTERN,
			(match, capturedNumber) => {
				return Number(capturedNumber) === number ? "" : match;
			},
		);

		console.log("Updated content after main answer deletion:", updatedContent);

		changeContent(updatedContent ?? "");
	};

	/**
	 *
	 */
	const deleteSubAnswer = (answerId: number) => {
		if (!answers) {
			return;
		}

		const updatedAnswers = answers.filter((answer) => answer.id !== answerId);

		setQuestion({
			...question,
			answers: updatedAnswers,
		});
	};

	//
	//
	//
	useEffect(() => {
		if (editor) {
			editor.on("update", () => {
				changeContent(editor.getText());
			});
		}
	}, [editor, changeContent]);

	//
	//
	//
	useEffect(() => {
		if (editor) {
			if (editor.getText() !== question?.content) {
				editor.commands.setContent(fillBlankContent);
			}
		}
	}, [editor, question?.content, fillBlankContent]);

	return {
		...baseCreationQuestionResult,
		fillBlankContent,
		groupedAnswers,
		changeAnswer,
		addMainAnswer,
		addSubAnswer,
		deleteMainAnswer,
		deleteSubAnswer,
	};
};

export default useCreationQuestionFillBlank;
