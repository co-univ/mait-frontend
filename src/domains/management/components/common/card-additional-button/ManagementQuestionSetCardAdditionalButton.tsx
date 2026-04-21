import { useState } from "react";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { Dropdown } from "@/components/dropdown";
import AdditionalButtonTrigger from "./AdditionalButtonTrigger";

//
//
//

interface ManagementQuestionSetCardAdditionalButtonProps {
	onEdit?: () => void;
	onRestart?: () => void;
	onDelete?: () => void;
}

//
//
//

const ManagementQuestionSetCardAdditionalButton = ({
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
		const confirmed = await confirm({
			title: "문제 셋 삭제",
			description: "문제 셋을 삭제하시겠습니까?",
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
