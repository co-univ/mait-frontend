import { Fragment, useState } from "react";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { Dropdown } from "@/components/dropdown";
import type { QuestionSetSolveMode, QuestionSetStatus } from "@/libs/types";
import AdditionalButtonTrigger from "./AdditionalButtonTrigger";

//
//
//

interface QuestionSetCardAdditionalButtonProps {
	/** Drives the delete confirm copy. Only required when `onDelete` is provided. */
	status?: QuestionSetStatus;
	availableMoveModes?: QuestionSetSolveMode[];
	isMoving?: boolean;
	onMove?: (mode: QuestionSetSolveMode) => void;
	onEdit?: () => void;
	onRestart?: () => void;
	onReviewStatus?: () => void;
	onControl?: () => void;
	onCopy?: () => void;
	onDelete?: () => void;
}

//
//
//

const QuestionSetCardAdditionalButton = ({
	status,
	availableMoveModes = [],
	isMoving = false,
	onMove,
	onEdit,
	onRestart,
	onReviewStatus,
	onControl,
	onCopy,
	onDelete,
}: QuestionSetCardAdditionalButtonProps) => {
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();
	const modeLabels: Record<QuestionSetSolveMode, string> = {
		LIVE_TIME: "실시간모드",
		STUDY: "학습모드",
	};

	/**
	 *
	 */
	const handleDeleteClick = async () => {
		const confirmDescriptions: Record<QuestionSetStatus, string> = {
			MAKING: "생성한 문제셋 전체가 삭제됩니다.",
			BEFORE: "생성한 문제셋 전체가 삭제됩니다.",
			ONGOING:
				"생성한 문제셋과 해당 셋의 풀이 기록 데이터가 모두 삭제됩니다.\n삭제된 데이터는 복구가 어렵습니다.",
			AFTER:
				"생성한 문제셋과 해당 셋의 풀이 기록 데이터가 모두 삭제됩니다.\n삭제된 데이터는 복구가 어렵습니다.",
			REVIEW:
				"생성한 문제셋과 해당 셋의 풀이 기록 데이터가 모두 삭제됩니다.\n삭제된 데이터는 복구가 어렵습니다.",
		};

		const confirmed = await confirm({
			title: "정말 삭제하시겠습니까?",
			description: confirmDescriptions[status ?? "MAKING"],
		});

		if (confirmed) {
			onDelete?.();
		}
	};

	const items = [
		onEdit && (
			<Dropdown.Item
				key="edit"
				value="edit"
				onClick={onEdit}
				classNames={{
					label: "font-pretendard text-color-alpha-black100",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				수정하기
			</Dropdown.Item>
		),
		onRestart && (
			<Dropdown.Item
				key="restart"
				value="restart"
				onClick={onRestart}
				classNames={{
					label: "font-pretendard text-color-alpha-black100",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				재시작하기
			</Dropdown.Item>
		),
		...availableMoveModes.map(
			(mode) =>
				onMove && (
					<Dropdown.Item
						key={`move-${mode}`}
						value={`move-${mode}`}
						disabled={isMoving}
						onClick={() => onMove(mode)}
						classNames={{
							label: "font-pretendard text-color-alpha-black100",
							button: "hover:!bg-color-alpha-white100",
						}}
					>
						{modeLabels[mode]}로 이동
					</Dropdown.Item>
				),
		),
		onReviewStatus && (
			<Dropdown.Item
				key="review-status"
				value="review-status"
				onClick={onReviewStatus}
				classNames={{
					label: "font-pretendard text-color-alpha-black100",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				복습 전환
			</Dropdown.Item>
		),
		onControl && (
			<Dropdown.Item
				key="control"
				value="control"
				onClick={onControl}
				classNames={{
					label: "font-pretendard text-color-alpha-black100",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				풀이 관리
			</Dropdown.Item>
		),
		onCopy && (
			<Dropdown.Item
				key="copy"
				value="copy"
				onClick={onCopy}
				classNames={{
					label: "font-pretendard text-color-alpha-black100",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				복제하기
			</Dropdown.Item>
		),
		onDelete && (
			<Dropdown.Item
				key="delete"
				value="delete"
				onClick={handleDeleteClick}
				classNames={{
					label: "text-color-point-50 font-pretendard",
					button: "hover:!bg-color-alpha-white100",
				}}
			>
				삭제하기
			</Dropdown.Item>
		),
	].filter(Boolean);

	return (
		<Dropdown.Root open={open} onOpenChange={setOpen}>
			<AdditionalButtonTrigger />
			<Dropdown.Content autoWidth className="min-w-[180px] !z-10">
				{items.map((item, index) => (
					<Fragment key={(item as { key: string }).key}>
						{index > 0 && (
							<Dropdown.Divider
								key={`divider-${(item as { key: string }).key}`}
							/>
						)}
						{item}
					</Fragment>
				))}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default QuestionSetCardAdditionalButton;
