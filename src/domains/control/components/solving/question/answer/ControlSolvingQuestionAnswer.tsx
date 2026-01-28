import clsx from "clsx";
import type React from "react";

//
//
//

interface ControlSolvingQuestionAnswerProps {
	variant?: "default" | "focused";
	children: React.ReactNode;
}

//
//
//

const ControlSolvingQuestionAnswer = ({
	variant = "default",
	children,
}: ControlSolvingQuestionAnswerProps) => {
	return (
		<div
			className={clsx(
				"w-full flex items-start py-padding-9 px-padding-11 rounded-radius-medium1 border",
				{
					"border-none bg-color-gray-5 text-color-alpha-black100 typo-body-medium":
						variant === "default",
					"border-color-primary-50 bg-color-primary-5 text-color-primary-50 typo-heading-xsmall":
						variant === "focused",
				},
			)}
		>
			{children}
		</div>
	);
};

export default ControlSolvingQuestionAnswer;
