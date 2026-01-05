import { useState } from "react";
import Button from "@/components/Button";
import { Field } from "@/components/field";
import Modal from "@/components/modal/Modal";
import { Radio } from "@/components/radio";
import { notify } from "@/components/Toast";
import { apiClient } from "@/libs/api";
import type { DeliveryMode, QuestionSetVisibility } from "@/libs/types";

//
//
//

interface ManagementReviewStatusModalProps {
	open: boolean;
	questionSetId: number | null;
	onClose: () => void;
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
}

//
//
//

const ManagementReviewStatusModal = ({
	open,
	questionSetId,
	invalidateQuestionSetsQuery,
	onClose,
}: ManagementReviewStatusModalProps) => {
	const [visibility, setVisibility] = useState<QuestionSetVisibility>("PUBLIC");

	/**
	 *
	 */
	const handleVisibilityChange = (value: QuestionSetVisibility) => {
		setVisibility(value);
	};

	/**
	 *
	 */
	const handleSaveButtonClick = async () => {
		try {
			const res = await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/review",
				{
					params: {
						path: {
							questionSetId: questionSetId ?? 0,
						},
					},
					body: {
						visibility,
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("Failed to change review status");
			}

			invalidateQuestionSetsQuery({
				mode: "LIVE_TIME",
			});
			invalidateQuestionSetsQuery({
				mode: "REVIEW",
			});

			notify.success("문제셋이 복습상태로 변경되었습니다.");
		} catch {
			notify.error("복습상태로 변경하는 도중 오류가 발생했습니다.");
		} finally {
			onClose();
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="w-[512px] flex flex-col gap-gap-8">
				<h2 className="typo-heading-medium">문제셋을 복습상태로 이동합니다.</h2>
				<Field.Root className="gap-gap-9">
					<Field.Label className="typo-body-large">공개범위설정</Field.Label>
					<Radio.Group
						value={visibility}
						onChange={handleVisibilityChange}
						className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1"
					>
						<Radio.Item value="PUBLIC">
							<Radio.Input />
							<Radio.Label>전체공개</Radio.Label>
						</Radio.Item>
						<Radio.Item value="GROUP">
							<Radio.Input />
							<Radio.Label>그룹공개</Radio.Label>
						</Radio.Item>
						<Radio.Item value="PRIVATE">
							<Radio.Input />
							<Radio.Label>비공개</Radio.Label>
						</Radio.Item>
					</Radio.Group>
				</Field.Root>
				<Button
					item="저장하기"
					onClick={handleSaveButtonClick}
					className="py-padding-4 px-padding-8 self-end"
				/>
			</div>
		</Modal>
	);
};

export default ManagementReviewStatusModal;
