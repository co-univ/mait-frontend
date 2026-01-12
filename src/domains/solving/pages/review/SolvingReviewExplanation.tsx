import clsx from "clsx";
import SqureCheckSuccess from "@/assets/icons/squre-check-success.svg";
import SquareXPoint from "@/assets/icons/squre-x-point.svg";

//
//
//

interface SolvingReviewExplanationProps {
	isExplanationShown: boolean;
	isCorrect: boolean | null;
	answer: string;
	explanation?: string;
}

//
//
//

const SolvingReviewExplanation = ({
	isExplanationShown,
	isCorrect,
	answer,
	explanation,
}: SolvingReviewExplanationProps) => {
	if (!isExplanationShown) {
		return null;
	}

	return (
		<div
			className={clsx(
				"flex flex-col gap-gap-9 p-padding-12 rounded-radius-medium1",
				{
					"bg-color-success-5": isCorrect,
					"bg-color-point-5": isCorrect === false,
				},
			)}
		>
			<div
				className={clsx("flex gap-gap-6 items-center typo-heading-medium", {
					"text-color-success-50": isCorrect,
					"text-color-point-50": isCorrect === false,
				})}
			>
				{isCorrect && <SqureCheckSuccess />}
				{isCorrect && "정답"}
				{isCorrect === false && <SquareXPoint />}
				{isCorrect === false && "오답"}
			</div>
			<div className="typo-body-large">정답 : {answer}</div>
			{explanation && (
				<div className="flex flex-col gap-gap-5">
					<div className="typo-body-large-bold text-color-gray-50">해설</div>
					<div className="typo-body-large text-color-gray-50">
						{`: ${explanation}`}
					</div>
				</div>
			)}
		</div>
	);
};

export default SolvingReviewExplanation;
