// TEMP: unused — review-status change is now a confirm() flow inline in ManagementLiveTimeCard/ManagementStudyCard.
// Kept for reference in case a modal-based flow returns.
//
// import Button from "@/components/Button";
// import Modal from "@/components/modal/Modal";
// import { notify } from "@/components/Toast";
// import { apiClient } from "@/libs/api";
// import type { DeliveryMode } from "@/libs/types";
//
// interface ManagementReviewStatusModalProps {
// 	open: boolean;
// 	questionSetId: number | null;
// 	onClose: () => void;
// 	invalidateQuestionSetsQuery: (params?: {
// 		teamId?: number;
// 		mode?: DeliveryMode;
// 	}) => void;
// }
//
// const ManagementReviewStatusModal = ({
// 	open,
// 	questionSetId,
// 	invalidateQuestionSetsQuery,
// 	onClose,
// }: ManagementReviewStatusModalProps) => {
// 	const handleSaveButtonClick = async () => {
// 		try {
// 			const res = await apiClient.PATCH(
// 				"/api/v1/question-sets/{questionSetId}/review",
// 				{
// 					params: {
// 						path: {
// 							questionSetId: questionSetId ?? 0,
// 						},
// 					},
// 				},
// 			);
//
// 			if (!res.data?.isSuccess) {
// 				throw new Error("Failed to change review status");
// 			}
//
// 			invalidateQuestionSetsQuery({
// 				mode: "LIVE_TIME",
// 			});
// 			invalidateQuestionSetsQuery({
// 				mode: "REVIEW",
// 			});
//
// 			notify.success("문제셋이 복습상태로 변경되었습니다.");
// 		} catch {
// 			notify.error("복습상태로 변경하는 도중 오류가 발생했습니다.");
// 		} finally {
// 			onClose();
// 		}
// 	};
//
// 	return (
// 		<Modal open={open} onClose={onClose}>
// 			<div className="w-[512px] flex flex-col gap-gap-8">
// 				<h2 className="typo-heading-medium">문제셋을 복습상태로 이동합니다.</h2>
// 				<Button
// 					item="저장하기"
// 					onClick={handleSaveButtonClick}
// 					className="py-padding-4 px-padding-8 self-end"
// 				/>
// 			</div>
// 		</Modal>
// 	);
// };
//
// export default ManagementReviewStatusModal;
