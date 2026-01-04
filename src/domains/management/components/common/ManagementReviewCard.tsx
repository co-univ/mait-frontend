import { QuestionSetsCard } from "@/components/question-sets/card";
import {
	DEFAULT_VISIBILITY_ICON_SIZE,
	QUESTION_SET_VISIBILITY_CONFIG,
} from "@/components/question-sets/question-sets.constants";
import type { QuestionSetDto } from "@/libs/types";

//
//
//

interface ManagementReviewCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const ManagementReviewCard = ({ questionSet }: ManagementReviewCardProps) => {
	const { Icon, label } =
		QUESTION_SET_VISIBILITY_CONFIG[questionSet.visibility ?? "PUBLIC"];

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
				<div className="flex gap-gap-5 items-center">
					<Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />
					<span className="typo-body-xsmall">{label}</span>
				</div>
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementReviewCard;
