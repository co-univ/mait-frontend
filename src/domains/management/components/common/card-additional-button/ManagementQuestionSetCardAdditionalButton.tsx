import { useState } from "react";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { Dropdown } from "@/components/dropdown";
import type { QuestionSetStatus } from "@/libs/types";
import AdditionalButtonTrigger from "./AdditionalButtonTrigger";

//
//
//

interface ManagementQuestionSetCardAdditionalButtonProps {
	status: QuestionSetStatus;
	onEdit?: () => void;
	onRestart?: () => void;
	onDelete?: () => void;
}

//
//
//

const ManagementQuestionSetCardAdditionalButton = ({
	status,
	onEdit,
	onRestart,
	onDelete,
}: ManagementQuestionSetCardAdditionalButtonProps) => {
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();

	/**
	 *
	 */
	const handleDeleteClick = async () => {
		const confirmDescriptions: Record<QuestionSetStatus, string> = {
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
			description: confirmDescriptions[status],
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
					<>
						{index > 0 && (
							<Dropdown.Divider
								key={`divider-${(item as { key: string }).key}`}
							/>
						)}
						{item}
					</>
				))}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default ManagementQuestionSetCardAdditionalButton;
