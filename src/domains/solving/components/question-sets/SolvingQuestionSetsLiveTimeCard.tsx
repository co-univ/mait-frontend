import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { DASHBOARD_ROUTE_PATH } from "@/domains/dashboard/dashboard.routes";
import type { QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

interface SolvingQuestionSetsLiveTimeCardProps {
	questionSet: QuestionSetDto;
}

//
//
//

const SolvingQuestionSetsLiveTimeCard = ({
	questionSet,
}: SolvingQuestionSetsLiveTimeCardProps) => {
	const navigate = useNavigate();

	const questionSetStatus = questionSet.status;

	const isDisabled = questionSetStatus === "BEFORE";

	/**
	 *
	 */
	const handleSolveButtonClick = () => {
		trackEvent(GTM_EVENT_NAMES.solvingLiveCtaClick, {
			question_set_id: questionSet.id?.toString(),
			entry_source: "solving_question_sets",
			mode: "live_time",
		});

		navigate(createPath(SOLVING_ROUTE_PATH.LIVE, { id: questionSet.id ?? 0 }), {
			state: {
				entrySource: "solving_question_sets",
			},
		});
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
					{(questionSetStatus === "BEFORE" ||
						questionSetStatus === "ONGOING") && (
						<QuestionSetsCard.Footer.Button
							disabled={isDisabled}
							variant="secondary"
							item="문제 풀기"
							onClick={handleSolveButtonClick}
						/>
					)}
					{questionSetStatus === "AFTER" && (
						<QuestionSetsCard.Footer.Button
							variant="secondary"
							item="통계 확인"
							onClick={handleDashboardButtonClick}
						/>
					)}
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default SolvingQuestionSetsLiveTimeCard;
