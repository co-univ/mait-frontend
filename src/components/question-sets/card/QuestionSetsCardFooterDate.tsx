import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

//
//
//

interface QuestionSetsCardFooterDateProps {
	date?: string;
	className?: string;
}

//
//
//

const QuestionSetsCardFooterDate = ({
	date,
	className,
}: QuestionSetsCardFooterDateProps) => {
	if (!date) {
		return null;
	}

	return (
		<div
			className={clsx(
				"flex gap-gap-5 items-center text-color-gray-40",
				className,
			)}
		>
			<CalendarDays size={20} />

			<span className="typo-body-xsmall">
				{dayjs(date).format("YYYY.MM.DD")}
			</span>
		</div>
	);
};

export default QuestionSetsCardFooterDate;
