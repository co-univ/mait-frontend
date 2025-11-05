import dayjs from "dayjs";
import { CalendarDays, LockKeyholeOpen, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuestionSetsCardButton from "@/components/question-sets/QuestionSetsCardButton";
import type { QuestionSetApiResponse } from "@/libs/types";

//
//
//

interface QuestionSetsCardProps {
	questionSet: QuestionSetApiResponse;
}

//
//
//

const QuestionSetsCard = ({ questionSet }: QuestionSetsCardProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		navigate(`/creation/question-set/${questionSet.id}`);
	};

	return (
		<div className="flex flex-col gap-gap-10 p-padding-11 border border-color-gray-10 rounded-medium1 bg-color-alpha-white100">
			<div className="flex justify-between items-center">
				<div className="flex gap-gap-5 items-center">
					<PencilLine />
					<span className="typo-heading-xsmall">{questionSet.subject}</span>
				</div>
				{/* <div className="flex gap-gap-5 items-center">
					<LockKeyholeOpen />
					<span>전체 공개</span>
				</div> */}
			</div>

			<div className="flex justify-between items-center">
				<div className="flex gap-gap-5 items-center text-color-gray-40">
					<CalendarDays size={20} />
					<span className="typo-body-xsmall">
						{dayjs(questionSet.updatedAt).format("YYYY.MM.DD")}
					</span>
				</div>
				<div className="flex gap-gap-5 items-center">
					<QuestionSetsCardButton
						item="문제 수정"
						onClick={handleButtonClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionSetsCard;
