import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

interface SolvingQuestionSetsLiveTimeCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const SolvingQuestionSetsLiveTimeCard = ({
	questionSet,
}: SolvingQuestionSetsLiveTimeCardProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		navigate(createPath(SOLVING_ROUTE_PATH.LIVE, { id: questionSet.id ?? 0 }));
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				<div className="flex gap-gap-5">
					<QuestionSetsCard.Footer.Button
						disabled={questionSet.ongoingStatus !== "ONGOING"}
						variant="secondary"
						item="문제 풀기"
						onClick={handleSolveButtonClick}
						className="disabled:bg-color-gray-5 disabled:border-color-gray-5 disabled:text-color-gray-30"
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsLiveTimeCard;
