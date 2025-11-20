import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import type { QuestionSetDto } from "@/libs/types";

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
		navigate(`/creation/question/question-set/${questionSet.id}`);
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
