import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { notify } from "@/components/Toast";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import { apiClient, apiHooks } from "@/libs/api";
import type { DeliveryMode, QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import useManagementDeleteQuestionSet from "../../hooks/useManagementDeleteQuestionSet";
import ManagementQuestionSetCardAdditionalButton from "./card-additional-button/ManagementQuestionSetCardAdditionalButton";

//
//
//

interface ManagementLiveTimeCardProps {
	questionSet: QuestionSetDto;
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
	invalidateQuestionSetsQuery,
}: ManagementLiveTimeCardProps) => {
	const { confirm } = useConfirm();

	const { mutate: startLiveTime } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/live-status/start",
		{
			onSuccess: () => {
				notify.success("문제 풀이가 시작되었습니다.");
				invalidateQuestionSetsQuery?.();
			},
			onError: () => {
				notify.error("문제 풀이 시작에 실패했습니다.");
			},
		},
	);

	const { handleDeleteButtonClick } = useManagementDeleteQuestionSet({
		questionSetId: questionSet.id ?? 0,
		invalidateQuestionSetsQuery,
	});

	const navigate = useNavigate();

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
		startLiveTime({
			params: {
				path: {
					questionSetId: questionSet.id ?? 0,
				},
			},
		});
	};

	/**
	 *
	 */
	const handleControlButtonClick = () => {
		navigate(
			createPath(CONTROL_ROUTE_PATH.LIVE_ROOT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	/**
	 *
	 */
	const handleReviewStatusButtonClick = async () => {
		const confirmed = await confirm({
			title: "문제셋을 복습상태로 이동합니다.",
			description: "이동 후에는 복습 목록에서 확인하실 수 있습니다.",
		});

		if (!confirmed) {
			return;
		}

		try {
			const res = await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/review",
				{
					params: {
						path: {
							questionSetId: questionSet.id ?? 0,
						},
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("Failed to change review status");
			}

			invalidateQuestionSetsQuery?.({
				mode: "LIVE_TIME",
			});
			invalidateQuestionSetsQuery?.({
				mode: "REVIEW",
			});

			notify.success("문제셋이 복습상태로 변경되었습니다.");
		} catch {
			notify.error("복습상태로 변경하는 도중 오류가 발생했습니다.");
		}
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
				mode: "LIVE_TIME",
			});
			notify.success("문제셋이 재시작되었습니다.");
		} catch {
			notify.error("문제셋 재시작에 실패했습니다.");
		}
	};

	/**
	 *
	 */
	const renderFooterButton = () => {
		if (questionSetStatus === "BEFORE") {
			return (
				<QuestionSetsCard.Footer.Button
					variant="secondary"
					item="시작하기"
					onClick={handleStartButtonClick}
				/>
			);
		}

		if (questionSetStatus === "ONGOING") {
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
					item="풀이 관리"
					onClick={handleControlButtonClick}
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
						status={questionSetStatus}
						onEdit={handleCreationButtonClick}
						onDelete={handleDeleteButtonClick}
					/>
				)}
				{questionSetStatus === "AFTER" && (
					<ManagementQuestionSetCardAdditionalButton
						status={questionSetStatus}
						onRestart={handleRestartButtonClick}
						onReviewStatus={handleReviewStatusButtonClick}
						onDelete={handleDeleteButtonClick}
					/>
				)}
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				{renderFooterButton()}
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementLiveTimeCard;
