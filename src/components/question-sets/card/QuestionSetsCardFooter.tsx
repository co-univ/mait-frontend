import clsx from "clsx";
import QuestionSetsCardFooterButton from "./QuestionSetsCardFooterButton";
import QuestionSetsCardFooterDate from "./QuestionSetsCardFooterDate";

//
//
//

interface QuestionSetsCardFooterProps {
	children: React.ReactNode;
	className?: string;
}

//
//
//

const QuestionSetsCardFooter = ({
	children,
	className,
}: QuestionSetsCardFooterProps) => {
	return (
		<div
			className={clsx(
				"flex justify-between items-center gap-gap-10",
				className,
			)}
		>
			{children}
		</div>
	);
};

QuestionSetsCardFooter.Date = QuestionSetsCardFooterDate;
QuestionSetsCardFooter.Button = QuestionSetsCardFooterButton;

export default QuestionSetsCardFooter;
