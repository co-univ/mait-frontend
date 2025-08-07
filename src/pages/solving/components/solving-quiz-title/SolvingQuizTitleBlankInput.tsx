import clsx from "clsx";
import useSolvingCorrectStore from "src/stores/useSolvingCorrectStore";

//
//
//

interface SolvingQuizTitleBlankInputProps {
	number: number;
	index: number;
	questionInfo?: any;
	userAnswers?: any;
}

//
//
//

const SolvingQuizTitleBlankInput = ({
	number,
	index,
	questionInfo,
	userAnswers,
}: SolvingQuizTitleBlankInputProps) => {
	const { isSubmitted, isCorrected } = useSolvingCorrectStore();

	// questionInfo.answers에서 number별로 그룹화하여 빈칸 순서 파악
	const blankNumbers = questionInfo?.answers
		? Array.from(
				new Set(questionInfo.answers.map((answer: any) => answer.number)),
			).sort((a, b) => a - b)
		: [];

	// 해당 index의 빈칸 번호 찾기
	const blankNumber = blankNumbers[index];

	// 사용자 답안에서 해당 빈칸 번호의 답안 찾기
	const userAnswer = userAnswers?.find(
		(answer: any) => answer.number === blankNumber,
	);
	const value = userAnswer?.answer || "";
	const hasAnswer = Boolean(value);

	// SolvingQuizAnswer와 동일한 색상 로직
	const getColor = () => {
		if (!isSubmitted && hasAnswer) {
			return "primary";
		}

		if (isSubmitted && hasAnswer && isCorrected) {
			return "success";
		}

		if (isSubmitted && hasAnswer && !isCorrected) {
			return "point";
		}

		return "gray";
	};

	const color = getColor();

	return (
		<span
			className={clsx(
				"inline-flex min-w-[152px] mx-1 gap-gap-2 border rounded-medium1 px-padding-6 py-padding-4 typo-body-medium",
				{
					"bg-gray-5 border-gray-5 text-alpha-black100": color === "gray",
					"bg-primary-5 border-primary-50 text-primary-50": color === "primary",
					"bg-success-5 border-success-50 text-success-50": color === "success",
					"bg-point-5 border-point-50 text-point-50": color === "point",
				},
			)}
		>
			<span>({number})</span>
			<span>{value}</span>
		</span>
	);
};

export default SolvingQuizTitleBlankInput;
