import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { QuestionSetCardAdditionalButton } from "@/components/question-sets/card-additional-button";
import useQuestionSetCopyModal from "@/components/question-sets/useQuestionSetCopyModal";
// TEMP: backend removed QuestionSet.visibility from the API response; badge disabled, kept for when it returns.
// import {
// 	DEFAULT_VISIBILITY_ICON_SIZE,
// 	QUESTION_SET_VISIBILITY_CONFIG,
// } from "@/components/question-sets/question-sets.constants";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
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

	const { copyModal, handleCopyButtonClick } = useQuestionSetCopyModal({
		questionSetId: questionSet.id ?? 0,
		questionSetTitle: questionSet.title,
	});

	// TEMP: backend removed QuestionSet.visibility from the API response; badge disabled, kept for when it returns.
	// const { Icon, label } =
	// 	QUESTION_SET_VISIBILITY_CONFIG[questionSet.visibility ?? "PUBLIC"];

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		trackEvent(GTM_EVENT_NAMES.solvingReviewCtaClick, {
			question_set_id: (questionSet.id ?? 0).toString(),
			entry_source: "solving_question_sets_review",
			mode: "review",
		});

		navigate(
			createPath(SOLVING_ROUTE_PATH.REVIEW_REDIRECT, {
				questionSetId: questionSet.id ?? 0,
			}),
			{
				state: {
					entrySource: "solving_question_sets_review",
				},
			},
		);
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.title} />
				<QuestionSetCardAdditionalButton onCopy={handleCopyButtonClick} />
				{/* TEMP: backend removed QuestionSet.visibility from the API response; badge disabled, kept for when it returns.
				<div className="flex gap-gap-5 items-center">
					<Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />
					<span className="typo-body-xsmall">{label}</span>
				</div>
				*/}
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

			{copyModal}
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsReviewCard;
