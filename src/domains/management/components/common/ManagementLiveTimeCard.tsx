import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { notify } from "@/components/Toast";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import { apiClient } from "@/libs/api";
import type { DeliveryMode, QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";

//
//
//

interface ManagementLiveTimeCardProps {
	questionSet: QuestionSetDto;
	onReviewStatusModalOpen?: (questionSetId: number) => void;
	invalidateQuestionSetsQuery?: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
}

//
//
//

const ManagementLiveTimeCard = ({
	questionSet,
	onReviewStatusModalOpen,
	invalidateQuestionSetsQuery,
}: ManagementLiveTimeCardProps) => {
	const navigate = useNavigate();

	const questionSetStatus = questionSet.ongoingStatus;

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

	/**
	 *
	 */
	const handleReviewStatusButtonClick = () => {
		onReviewStatusModalOpen?.(questionSet.id ?? 0);
	};

	/**
	 *
	 */
	const handleRestartButtonClick = async () => {
		// try {
		// 	const res = await apiClient.PATCH(
		// 		"/api/v1/question-sets/{questionSetId}/live-status/start",
		// 		{
		// 			params: {
		// 				path: {
		// 					questionSetId: questionSet.id ?? 0,
		// 				},
		// 			},
		// 		},
		// 	);
		// 	if (!res.data?.isSuccess) {
		// 		throw new Error("Failed to restart question set");
		// 	}
		// 	invalidateQuestionSetsQuery?.({
		// 		mode: "LIVE_TIME",
		// 	});
		// 	notify.success("문제셋이 재시작되었습니다.");
		// } catch {
		// 	notify.error("문제셋 재시작에 실패했습니다.");
		// }
	};

	/**
	 *
	 */
	const renderFirstButton = () => {
		if (questionSetStatus === "ONGOING" || questionSetStatus === "BEFORE") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="문제 수정"
					onClick={handleCreationButtonClick}
				/>
			);
		}

		if (questionSetStatus === "AFTER") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="복습상태"
					onClick={handleReviewStatusButtonClick}
				/>
			);
		}

		return null;
	};

	/**
	 *
	 */
	const renderSecondButton = () => {
		if (questionSetStatus === "ONGOING" || questionSetStatus === "BEFORE") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="풀이 관리"
					onClick={handleControlButtonClick}
				/>
			);
		}

		if (questionSetStatus === "AFTER") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="재시작"
					onClick={handleRestartButtonClick}
				/>
			);
		}

		return null;
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				<div className="flex gap-gap-5">
					{renderFirstButton()}
					{renderSecondButton()}
				</div>
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementLiveTimeCard;
