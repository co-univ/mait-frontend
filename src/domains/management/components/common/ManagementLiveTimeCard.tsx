import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import type { QuestionSetApiResponse } from "@/libs/types";

//
//
//

interface ManagementLiveTimeCardProps {
	questionSet: QuestionSetApiResponse;
}

//
//
//

const ManagementLiveTimeCard = ({
	questionSet,
}: ManagementLiveTimeCardProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		navigate(`/creation/question-set/${questionSet.id}`);
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
						onClick={handleButtonClick}
					/>
					<QuestionSetsCard.Footer.Button
						variant="secondary"
						item="풀이 관리"
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementLiveTimeCard;
