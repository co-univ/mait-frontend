import clsx from "clsx";
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

	const questionSetStatus = questionSet.ongoingStatus;

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		navigate(createPath(SOLVING_ROUTE_PATH.LIVE, { id: questionSet.id ?? 0 }));
	};

	return (
		<QuestionSetsCard.Root
			className={clsx({
				"text-color-gray-20 pointer-events-none":
					questionSetStatus !== "ONGOING",
			})}
		>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date
					date={questionSet.updatedAt}
					className={clsx({
						"!text-color-gray-20": questionSetStatus !== "ONGOING",
					})}
				/>
				<div className="flex gap-gap-5">
					<QuestionSetsCard.Footer.Button
						disabled={questionSet.ongoingStatus !== "ONGOING"}
						variant="secondary"
						item="문제 풀기"
						onClick={handleSolveButtonClick}
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsLiveTimeCard;
