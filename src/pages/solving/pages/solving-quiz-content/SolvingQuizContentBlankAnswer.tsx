import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentBlankAnswerProps {
	questionInfo: any | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
	isAnswered?: boolean;
}

interface Answer {
	id: number;
	answer: string;
	isMain: boolean;
	number: number;
}

//
//
//

const SolvingQuizContentBlankAnswer = ({
	questionInfo,
	userAnswers,
	onAnswersChange,
	isAnswered = false,
}: SolvingQuizContentBlankAnswerProps) => {
	// number를 기준으로 그룹화하여 빈칸 개수 파악
	const blankGroups = questionInfo.answers.reduce(
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

	// 빈칸 개수만큼의 답안 배열 생성
	const blankAnswers = Object.keys(blankGroups).map((number) => ({
		number: parseInt(number),
		value:
			(userAnswers &&
				userAnswers.find((ans: any) => ans.number === parseInt(number))
					?.answer) ||
			"",
	}));

	const handleAnswerChange = (index: number, value: string) => {
		const newAnswers = [...(userAnswers || [])];
		const blankNumber = parseInt(Object.keys(blankGroups)[index]);

		// 기존 답안이 있으면 업데이트, 없으면 새로 추가
		const existingIndex = newAnswers.findIndex(
			(ans: any) => ans.number === blankNumber,
		);
		if (existingIndex >= 0) {
			newAnswers[existingIndex] = { number: blankNumber, answer: value };
		} else {
			newAnswers.push({ number: blankNumber, answer: value });
		}

		onAnswersChange(newAnswers);
	};

	return (
		<SolvingAnswerLayout
			readonly={isAnswered}
			answers={blankAnswers}
			prefix="number"
			placeholder="빈칸에 들어갈 답안을 입력하세요."
			onAnswerChange={isAnswered ? undefined : handleAnswerChange}
			selectedChoices={userAnswers
				?.filter((ans: { answer: string | any[] }) => ans.answer.length > 0)
				.map((ans: { number: number }) => ans.number)}
		/>
	);
};

export default SolvingQuizContentBlankAnswer;
