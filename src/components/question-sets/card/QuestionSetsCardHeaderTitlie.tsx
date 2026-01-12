import clsx from "clsx";
import { PencilLine } from "lucide-react";

//
//
//

interface QuestionSetsCardHeaderTitleProps {
	title?: string;
	icon?: React.ReactNode;
	className?: string;
}

//
//
//

const QuestionSetsCardHeaderTitle = ({
	title,
	icon = <PencilLine />,
	className,
}: QuestionSetsCardHeaderTitleProps) => {
	return (
		<div className={clsx("flex gap-gap-5 items-center min-w-0", className)}>
			{icon}
			<span className="typo-heading-xsmall truncate min-w-0">{title}</span>
		</div>
	);
};

export default QuestionSetsCardHeaderTitle;
