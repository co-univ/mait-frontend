import clsx from "clsx";

//
//
//

interface ControlSolvingQuestionAnswerContentProps {
	ref?: React.Ref<HTMLParagraphElement>;
	expanded?: boolean;
	variant?: "default" | "focused";
	content: string;
}

//
//
//

const ControlSolvingQuestionAnswerContent = ({
	ref,
	expanded = false,
	variant = "default",
	content,
}: ControlSolvingQuestionAnswerContentProps) => {
	return (
		<p
			ref={ref}
			className={clsx("min-w-0 w-full", {
				"typo-body-medium text-color-alpha-black100": variant === "default",
				"typo-heading-xsmall text-color-primary-50": variant === "focused",
				truncate: !expanded,
			})}
		>
			{content}
		</p>
	);
};

export default ControlSolvingQuestionAnswerContent;
