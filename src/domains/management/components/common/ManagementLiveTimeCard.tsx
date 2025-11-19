import { useNavigate, useParams } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import type { QuestionSetDto } from "@/libs/types";

//
//
//

interface ManagementLiveTimeCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const ManagementLiveTimeCard = ({
	questionSet,
}: ManagementLiveTimeCardProps) => {
	const navigate = useNavigate();

	const teamId = Number(useParams().teamId);

	/**
	 *
	 */
	const handleCreationButtonClick = () => {
		navigate(
			`/creation/question/team/${teamId}/question-set/${questionSet.id}`,
		);
	};

	/**
	 *
	 */
	const handleControlButtonClick = () => {
		navigate(`/control/solving/team/${teamId}/question-set/${questionSet.id}`);
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
						variant="secondary"
						item="문제 수정"
						onClick={handleCreationButtonClick}
					/>
					<QuestionSetsCard.Footer.Button
						variant="secondary"
						item="풀이 관리"
						onClick={handleControlButtonClick}
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementLiveTimeCard;
