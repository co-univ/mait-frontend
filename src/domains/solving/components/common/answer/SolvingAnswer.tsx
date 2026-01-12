import clsx from "clsx";
import AdjustableTextarea from "@/components/AdjustableTextarea";

//
//
//

const ANSWER_HEIGHT = 94;

export interface SolvingAnswerProps {
	readOnly?: boolean;
	placeholder?: string;
	variation?: "default" | "focused" | "correct" | "incorrect";
	content?: string;
	onChange?: (value: string) => void;
}

//
//
//

const SolvingAnswer = ({
	readOnly = false,
	placeholder = "답안을 입력하세요.",
	variation = "default",
	content,
	onChange,
}: SolvingAnswerProps) => {
	return (
		<div
			className={clsx(
				"w-full px-padding-12 py-padding-6 flex items-center border rounded-radius-medium1",
				{
					"bg-color-gray-5 border-none typo-body-medium":
						variation === "default",
					"bg-color-primary-5 border-color-primary-50 typo-heading-xsmall text-color-primary-50":
						variation === "focused",
					"bg-color-success-5 border-color-success-50 typo-heading-xsmall text-color-success-50":
						variation === "correct",
					"bg-color-point-5 border-color-point-50 typo-heading-xsmall text-color-point-50":
						variation === "incorrect",
				},
			)}
			style={{ minHeight: ANSWER_HEIGHT }}
		>
			{readOnly ? (
				<p className="w-full text-left">{content}</p>
			) : (
				<AdjustableTextarea
					placeholder={placeholder}
					value={content}
					onChange={(e) => onChange?.(e.target.value)}
					className="w-full"
				/>
			)}
		</div>
	);
};

export default SolvingAnswer;
