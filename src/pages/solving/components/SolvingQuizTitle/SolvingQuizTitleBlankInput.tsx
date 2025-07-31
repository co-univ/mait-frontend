import clsx from "clsx";
import React from "react";

//
//
//

interface SolvingQuizTitleBlankInputProps {
	isActive?: boolean;
	number: number;
	value: string;
}

//
//
//

const SolvingQuizTitleBlankInput = ({
	isActive = false,
	number,
	value,
}: SolvingQuizTitleBlankInputProps) => {
	return (
		<span
			className={clsx(
				"inline-flex min-w-[152px] mx-1 gap-gap-2 border border-primary-50 rounded-medium1 px-padding-6 py-padding-4 typo-body-xsmall text-primary-50",
				{
					"border-primary-50 text-primary-50": isActive,
					"border-gray-20 text-gray-40": !isActive,
				},
			)}
		>
			<span>({number})</span>
			<span>{value}</span>
		</span>
	);
};

export default SolvingQuizTitleBlankInput;
