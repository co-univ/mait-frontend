import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { notify } from "@/components/Toast";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import { apiClient } from "@/libs/api";
import type { DeliveryMode, QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import useManagementDeleteQuestionSet from "../../hooks/useManagementDeleteQuestionSet";
import ManagementQuestionSetCardAdditionalButton from "./card-additional-button/ManagementQuestionSetCardAdditionalButton";

//
//
//

interface ManagementStudyCardProps {
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

const ManagementStudyCard = ({
  questionSet,
	onReviewStatusModalOpen,
	invalidateQuestionSetsQuery,
}: ManagementStudyCardProps) => {
  const navigate = useNavigate();
	const { handleDeleteButtonClick } = useManagementDeleteQuestionSet({
		questionSetId: questionSet.id ?? 0,
		invalidateQuestionSetsQuery,
	});

  const questionSetStatus = questionSet.status;

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
	const handleStartButtonClick = () => {
		notify.info("학습모드 시작 API는 백엔드 확인 후 연결할 예정입니다.");
	};

	/**
	 *
	 */
	const handleControlButtonClick = () => {
		navigate(
			createPath(CONTROL_ROUTE_PATH.STUDY_ROOT, {
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
		try {
			const res = await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/restart",
				{
					params: {
						path: {
							questionSetId: questionSet.id ?? 0,
						},
					},
				},
			);
			if (!res.data?.isSuccess) {
				throw new Error("Failed to restart question set");
			}
				invalidateQuestionSetsQuery?.({
					mode: "STUDY",
				});
				notify.success("문제셋이 재시작되었습니다.");
			} catch {
			notify.error("문제셋 재시작에 실패했습니다.");
		}
	};

	/**
	 *
	 */
	const renderFirstButton = () => {
		return null;
	};

	/**
	 *
	 */
	const renderSecondButton = () => {
		if (questionSetStatus === "ONGOING") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="풀이 관리"
					onClick={handleControlButtonClick}
				/>
			);
		}

		if (questionSetStatus === "BEFORE") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="시작하기"
					onClick={handleStartButtonClick}
				/>
			);
		}

		if (questionSetStatus === "AFTER") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="복습 전환"
					onClick={handleReviewStatusButtonClick}
				/>
			);
		}

		return null;
	};

		return (
			<QuestionSetsCard.Root>
				<QuestionSetsCard.Header>
					<QuestionSetsCard.Header.Title title={questionSet.title} />
					{questionSetStatus === "BEFORE" && (
						<ManagementQuestionSetCardAdditionalButton
							onEdit={handleCreationButtonClick}
							onDelete={handleDeleteButtonClick}
						/>
					)}
					{questionSetStatus === "AFTER" && (
						<ManagementQuestionSetCardAdditionalButton
							onRestart={handleRestartButtonClick}
							onDelete={handleDeleteButtonClick}
						/>
					)}
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

export default ManagementStudyCard;
