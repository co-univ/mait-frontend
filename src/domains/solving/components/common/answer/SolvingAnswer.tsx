import clsx from "clsx";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import useBreakpoint from "@/hooks/useBreakpoint";

//
//
//

const ANSWER_HEIGHT = {
	pc: 94,
	mobile: 60,
};

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
	const { isMobile } = useBreakpoint();

	const typoClass = isMobile
		? variation === "default" ? "typo-body-xsmall" : "typo-body-xsmall-bold"
		: variation === "default" ? "typo-body-medium" : "typo-heading-xsmall";

	return (
		<div
			className={clsx(
				"w-full flex items-center border rounded-radius-medium1",
				typoClass,
				{
					"px-padding-12 py-padding-6": !isMobile,
					"px-padding-10 py-padding-5": isMobile,
				},
				{
					"bg-color-gray-5 border-none":
						variation === "default",
					"bg-color-primary-5 border-color-primary-50 text-color-primary-50":
						variation === "focused",
					"bg-color-success-5 border-color-success-50 text-color-success-50":
						variation === "correct",
					"bg-color-point-5 border-color-point-50 text-color-point-50":
						variation === "incorrect",
				},
			)}
			style={{ minHeight: isMobile ? ANSWER_HEIGHT.mobile : ANSWER_HEIGHT.pc }}
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
