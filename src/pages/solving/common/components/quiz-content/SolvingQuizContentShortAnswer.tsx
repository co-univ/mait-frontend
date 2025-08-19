import type { QuestionApiResponse } from "@/types";
import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentShortAnswerProps {
	questionInfo: any | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
	isAnswered?: boolean;
}

//
//
//

const SolvingQuizContentShortAnswer = ({
	questionInfo,
	userAnswers,
	onAnswersChange,
	isAnswered = false,
}: SolvingQuizContentShortAnswerProps) => {
	// number를 기준으로 그룹화하여 답안 개수 파악
	const answerGroups = questionInfo.answers.reduce(
		(groups: any, answer: any) => {
			const number = answer.number;
			if (!groups[number]) {
				groups[number] = [];
			}
			groups[number].push(answer);
			return groups;
		},
		{},
	);

	// 답안 개수만큼의 입력 필드 생성
	const shortAnswers = Object.keys(answerGroups).map((number) => ({
		number: parseInt(number),
		value:
			(userAnswers &&
				userAnswers.find((ans: any) => ans.number === parseInt(number))
					?.answer) ||
			"",
	}));

	const handleAnswerChange = (index: number, value: string) => {
		const newAnswers = [...(userAnswers || [])];
		const answerNumber = parseInt(Object.keys(answerGroups)[index]);

		// 기존 답안이 있으면 업데이트, 없으면 새로 추가
		const existingIndex = newAnswers.findIndex(
			(ans: any) => ans.number === answerNumber,
		);
		if (existingIndex >= 0) {
			newAnswers[existingIndex] = { number: answerNumber, answer: value };
		} else {
			newAnswers.push({ number: answerNumber, answer: value });
		}

		onAnswersChange(newAnswers);
	};

	return (
		<SolvingAnswerLayout
			readonly={isAnswered}
			answers={shortAnswers}
			placeholder="답변을 입력하세요."
			onAnswerChange={isAnswered ? undefined : handleAnswerChange}
			selectedChoices={userAnswers
				?.filter((ans: { answer: string | any[] }) => ans.answer.length > 0)
				.map((ans: { number: number }) => ans.number)}
		/>
	);
};

export default SolvingQuizContentShortAnswer;
