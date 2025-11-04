import { useMemo } from "react";
import { FILL_BLANK_PATTERN } from "@/app.constants";
import { notify } from "@/components/Toast";
import type { QuestionResponseType } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import creationQuestionGenerateId from "@/domains/creation/utils/question/creation-question-generate-id";
import type {
	FillBlankAnswerApiResponse,
	FillBlankQuestionApiResponse,
} from "@/libs/types";

//
//
//

interface UseQuestionFillBlankProps {
	questionId: number;
}

interface UseQuestionFillBlankReturn {
	question?: FillBlankQuestionApiResponse;
	fillBlankContent: string;
	groupedAnswers: FillBlankAnswerApiResponse[][];
	handleAnswerChange: (answerId: number, newAnswer: string) => void;
	handleContentChange: (editorHtml: string) => void;
	handleMainAnswerAdd: (editorHtml: string) => void;
	handleSubAnswerAdd: (number: number) => void;
	handleMainAnswerDelete: (number: number) => void;
	handleSubAnswerDelete: (answerId: number) => void;
}

//
//
//

const useCreationQuestionFillBlank = ({
	questionId,
}: UseQuestionFillBlankProps): UseQuestionFillBlankReturn => {
	const { questions, editQuestion } = useCreationQuestionsStore();

	const question = questions.find((q) => q.id === questionId) as
		| FillBlankQuestionApiResponse
		| undefined;

	const groupedAnswers: FillBlankAnswerApiResponse[][] = [];

	question?.answers?.forEach((answer) => {
		const index = answer.number - 1;

		if (!groupedAnswers[index]) {
			groupedAnswers[index] = [];
		}

		groupedAnswers[index].push(answer);
	});

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
			const answer = question.answers?.find(
				(ans) => ans.number === Number.parseInt(number, 10) && ans.isMain,
			);

			html = html.replace(
				original,
				`<question-blank number="${number}" answer="${answer?.answer || ""}"></question-blank>`,
			);
		}

		return html;
	}, [question?.content, question?.answers]);

	/**
	 * Convert editor HTML to {{number}} format and update store
	 */
	const handleContentChange = (editorHtml: string) => {
		if (!question) {
			return;
		}

		// Detect deleted question-blank nodes
		const previousNumbers = new Set<number>();
		const currentNumbers = new Set<number>();

		// Extract numbers from previous content
		const prevPattern = /<question-blank\s+number="(\d+)"/g;
		let match = prevPattern.exec(question.content || "");
		while (match) {
			previousNumbers.add(Number.parseInt(match[1], 10));
			match = prevPattern.exec(question.content || "");
		}

		// Extract numbers from current content
		const currPattern = /<question-blank\s+number="(\d+)"/g;
		match = currPattern.exec(editorHtml);
		while (match) {
			currentNumbers.add(Number.parseInt(match[1], 10));
			match = currPattern.exec(editorHtml);
		}

		// Find deleted numbers
		const deletedNumbers = Array.from(previousNumbers).filter(
			(num) => !currentNumbers.has(num),
		);

		let updatedAnswers = question.answers;

		// Remove answers for deleted question-blank nodes and renumber
		if (deletedNumbers.length > 0) {
			// Sort in descending order to handle deletions properly
			deletedNumbers.sort((a, b) => b - a);

			for (const deletedNumber of deletedNumbers) {
				updatedAnswers = (updatedAnswers || [])
					.filter((answer) => answer.number !== deletedNumber)
					.map((answer) => {
						if (answer.number > deletedNumber) {
							return { ...answer, number: answer.number - 1 };
						}
						return answer;
					});
			}
		}

		editQuestion({
			...question,
			content: editorHtml,
			answers: updatedAnswers,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleAnswerChange = (answerId: number, newAnswer: string) => {
		const targetAnswer = question?.answers?.find(
			(answer) => answer.id === answerId,
		);

		const updatedAnswers = question?.answers?.map((answer) =>
			answer.id === answerId ? { ...answer, answer: newAnswer } : answer,
		);

		let updatedContent = question?.content;

		// If the changed answer is main, update content's <question-blank> answer attribute
		if (targetAnswer?.isMain && updatedContent) {
			const number = targetAnswer.number;
			const pattern = new RegExp(
				`<question-blank\\s+number="${number}"\\s+answer="[^"]*"`,
				"g",
			);
			updatedContent = updatedContent.replace(
				pattern,
				`<question-blank number="${number}" answer="${newAnswer}"`,
			);
		}

		editQuestion({
			...question,
			answers: updatedAnswers,
			content: updatedContent,
		} as QuestionResponseType);
	};

	/**
	 *
	 */
	const handleMainAnswerAdd = (editorHtml: string) => {
		if (groupedAnswers.length === 5) {
			notify.error("빈칸은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (question) {
			const newAnswer: FillBlankAnswerApiResponse = {
				id: creationQuestionGenerateId(),
				answer: "",
				isMain: true,
				number: groupedAnswers.length + 1,
			};

			const updatedAnswers = question.answers
				? [...question.answers, newAnswer]
				: [newAnswer];

			editQuestion({
				...question,
				answers: updatedAnswers,
				content: editorHtml,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleSubAnswerAdd = (number: number) => {
		const groupedAnswer = groupedAnswers[number - 1];

		if (groupedAnswer && groupedAnswer.length === 6) {
			notify.error("인정 답안은 최대 5개까지 추가할 수 있습니다.");

			return;
		}

		if (question) {
			const newAnswer: FillBlankAnswerApiResponse = {
				id: creationQuestionGenerateId(),
				answer: "",
				isMain: false,
				number,
			};

			const updatedAnswers = question.answers
				? [...question.answers, newAnswer]
				: [newAnswer];

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleMainAnswerDelete = (number: number) => {
		if (groupedAnswers.length === 1) {
			notify.error("빈칸 답안은 한개 이상 있어야 합니다.");

			return;
		}

		if (question) {
			const updatedAnswers = (question.answers || [])
				.filter((answer) => answer.number !== number)
				.map((answer) => {
					if (answer.number > number) {
						return { ...answer, number: answer.number - 1 };
					}
					return answer;
				});

			let updatedContent = question.content;

			// Remove <question-blank> tag with the specified number from content
			if (updatedContent) {
				// Remove the question-blank tag with the specified number
				const removePattern = new RegExp(
					`<question-blank\\s+number="${number}"\\s+answer="[^"]*"[^>]*></question-blank>`,
					"g",
				);
				updatedContent = updatedContent.replace(removePattern, "");

				// Update numbers for question-blank tags with higher numbers
				for (let i = number + 1; i <= groupedAnswers.length; i++) {
					const updatePattern = new RegExp(
						`<question-blank\\s+number="${i}"\\s+answer="([^"]*)"`,
						"g",
					);
					updatedContent = updatedContent.replace(
						updatePattern,
						`<question-blank number="${i - 1}" answer="$1"`,
					);
				}
			}
			editQuestion({
				...question,
				answers: updatedAnswers,
				content: updatedContent,
			} as QuestionResponseType);
		}
	};

	/**
	 *
	 */
	const handleSubAnswerDelete = (answerId: number) => {
		if (question) {
			const updatedAnswers = (question.answers || []).filter(
				(answer) => answer.id !== answerId,
			);

			editQuestion({
				...question,
				answers: updatedAnswers,
			} as QuestionResponseType);
		}
	};

	return {
		question,
		fillBlankContent,
		groupedAnswers,
		handleAnswerChange,
		handleContentChange,
		handleMainAnswerAdd,
		handleSubAnswerAdd,
		handleMainAnswerDelete,
		handleSubAnswerDelete,
	};
};

export default useCreationQuestionFillBlank;
