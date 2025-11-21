import clsx from "clsx";
import type React from "react";
import QuestionSetsCardHeaderBadge from "./QuestionSetsCardHeaderBadge";
import QuestionSetsCardHeaderTitle from "./QuestionSetsCardHeaderTitlie";

//
//
//

interface QuestionSetsCardHeaderProps {
	className?: string;
	children?: React.ReactNode;
}

//
//
//

const QuestionSetsCardHeader = ({
	className,
	children,
}: QuestionSetsCardHeaderProps) => {
	return (
		<div
			className={clsx("flex justify-between items-center gap-gap-8", className)}
		>
			{children}
		</div>
	);
};

QuestionSetsCardHeader.Title = QuestionSetsCardHeaderTitle;
QuestionSetsCardHeader.Badge = QuestionSetsCardHeaderBadge;

export default QuestionSetsCardHeader;
