import clsx from "clsx";

//
//
//

interface FillBlankProps {
	number: number;
	answer?: string;
	className?: string;
}

//
//
//

const FillBlank = ({ number, answer, className }: FillBlankProps) => {
	return (
		<span
			className={clsx(
				"inline-flex min-w-[132px] items-center justify-between px-padding-4 py-padding-3 mx-padding-3 rounded-medium1 border border-color-gray-20 gap-gap-3",
				className,
			)}
		>
			<span className="typo-body-xsmall text-color-gray-40">({number})</span>
			<span className="flex flex-1 typo-body-small">{answer}</span>
		</span>
	);
};

export default FillBlank;
