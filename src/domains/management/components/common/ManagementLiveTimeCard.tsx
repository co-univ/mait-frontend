import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";

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

	/**
	 *
	 */
	const handleCreationButtonClick = () => {
		navigate(
			createPath(CREATION_ROUTE_PATH.ROOT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	/**
	 *
	 */
	const handleControlButtonClick = () => {
		navigate(
			createPath(CONTROL_ROUTE_PATH.ROOT, {
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
