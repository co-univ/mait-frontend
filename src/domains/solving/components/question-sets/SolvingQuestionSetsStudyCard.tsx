import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
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

	const userStudyStatus = questionSet.userStudyStatus;
	const isDisabled = userStudyStatus === "AFTER";

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		navigate(
			createPath(SOLVING_ROUTE_PATH.STUDY_REDIRECT, {
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
		<QuestionSetsCard.Root
			className={clsx({
				"text-color-gray-20 pointer-events-none": isDisabled,
			})}
		>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.title} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date
					date={questionSet.updatedAt}
					className={clsx({
						"!text-color-gray-20": isDisabled,
					})}
				/>
				<div className="flex gap-gap-5">
					<QuestionSetsCard.Footer.Button
						disabled={isDisabled}
						variant="secondary"
						item={getButtonLabel()}
						onClick={handleSolveButtonClick}
					/>
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsStudyCard;
