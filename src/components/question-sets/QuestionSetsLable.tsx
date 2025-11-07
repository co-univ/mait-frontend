import clsx from "clsx";

//
//
//

interface QuestionSetsLabelProps {
	label: string;
	variant?: "primary" | "secondary";
}

//
//
//

const QuestionSetsLabel = ({
	label,
	variant = "primary",
}: QuestionSetsLabelProps) => {
	return (
		<div className="flex gap-gap-5 items-center">
			<span
				className={clsx(
					"w-[10px] h-[10px] rounded-full",
					variant === "primary" && "bg-primary-50",
					variant === "secondary" && "bg-secondary-50",
				)}
			/>
			<h2
				className={clsx(
					"typo-heading-xsmall",
					variant === "primary" && "text-primary-50",
					variant === "secondary" && "text-secondary-50",
				)}
			>
				{label}
			</h2>
		</div>
	);
};

export default QuestionSetsLabel;
