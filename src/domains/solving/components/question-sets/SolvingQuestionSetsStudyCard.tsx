import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { QuestionSetCardAdditionalButton } from "@/components/question-sets/card-additional-button";
import useQuestionSetCopyModal from "@/components/question-sets/useQuestionSetCopyModal";
import { DASHBOARD_ROUTE_PATH } from "@/domains/dashboard/dashboard.routes";
import type { StudyQuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

interface SolvingQuestionSetsStudyCardProps {
	questionSet: StudyQuestionSetDto;
}

//
//
//

const SolvingQuestionSetsStudyCard = ({
	questionSet,
}: SolvingQuestionSetsStudyCardProps) => {
	const navigate = useNavigate();

	const { copyModal, handleCopyButtonClick } = useQuestionSetCopyModal({
		questionSetId: questionSet.id ?? 0,
		questionSetTitle: questionSet.title,
		solveMode: "STUDY",
	});

	const userStudyStatus = questionSet.userStudyStatus;

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		navigate(
			createPath(SOLVING_ROUTE_PATH.STUDY_REDIRECT, {
				questionSetId: questionSet.id ?? 0,
			}),
			{
				state: {
					userStudyStatus,
				},
			},
		);
	};

	/**
	 *
	 */
	const handleDashboardButtonClick = () => {
		navigate(
			createPath(DASHBOARD_ROUTE_PATH.QUESTION_ROOT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	/**
	 *
	 */
	const getButtonLabel = () => {
		if (userStudyStatus === "ONGOING") {
			return "이어 풀기";
		}

		return "문제 풀기";
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.title} />
				<QuestionSetCardAdditionalButton onCopy={handleCopyButtonClick} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				<div className="flex gap-gap-5">
					{userStudyStatus !== "AFTER" && (
						<QuestionSetsCard.Footer.Button
							variant="secondary"
							item={getButtonLabel()}
							onClick={handleSolveButtonClick}
						/>
					)}
					{userStudyStatus === "AFTER" && (
						<QuestionSetsCard.Footer.Button
							variant="secondary"
							item="통계 확인"
							onClick={handleDashboardButtonClick}
						/>
					)}
				</div>
			</QuestionSetsCard.Footer>

			{copyModal}
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsStudyCard;
