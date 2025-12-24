import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";

//
//
//

interface ManagementMakingCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const ManagementMakingCard = ({ questionSet }: ManagementMakingCardProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		navigate(
			createPath(CREATION_ROUTE_PATH.ROOT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				<QuestionSetsCard.Footer.Button
					item="문제 수정"
					variant="primary"
					onClick={handleButtonClick}
				/>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementMakingCard;
