import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import {
	DEFAULT_VISIBILITY_ICON_SIZE,
	QUESTION_SET_VISIBILITY_CONFIG,
} from "@/components/question-sets/question-sets.constants";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

interface SolvingQuestionSetsReviewCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const SolvingQuestionSetsReviewCard = ({
	questionSet,
}: SolvingQuestionSetsReviewCardProps) => {
	const navigate = useNavigate();

	const { Icon, label } =
		QUESTION_SET_VISIBILITY_CONFIG[questionSet.visibility ?? "PUBLIC"];

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		navigate(
			createPath(SOLVING_ROUTE_PATH.REVIEW_REDIRECT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.title} />
				<div className="flex gap-gap-5 items-center">
					<Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />
					<span className="typo-body-xsmall">{label}</span>
				</div>
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				<div className="flex gap-gap-5">
					<QuestionSetsCard.Footer.Button
						variant="secondary"
						item="복습하기"
						onClick={handleSolveButtonClick}
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsReviewCard;
