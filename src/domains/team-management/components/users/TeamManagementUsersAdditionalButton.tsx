import { useState } from "react";
import { Dropdown } from "@/components/dropdown";
import AdditionalButtonTrigger from "@/domains/management/components/common/card-additional-button/AdditionalButtonTrigger";

//
//
//

interface TeamManagementAdditionalButtonProps {
	isOwner: boolean;
	editTeamName: () => void;
	onLeave: () => void;
	onDelete: () => void;
}

//
//
//

const TeamManagementUsersAdditionalButton = ({
	isOwner,
	editTeamName,
	onLeave,
	onDelete,
}: TeamManagementAdditionalButtonProps) => {
	const [open, setOpen] = useState(false);

	const dropdownItemList = [
		isOwner && {
			label: "팀명 수정",
			value: "edit",
			onClick: editTeamName,
			classNames: {
				label: "text-color-alpha-black100 font-pretendard",
				button: "hover:!bg-color-alpha-white100 !bg-color-alpha-white100",
			},
		},
		{
			label: isOwner ? "팀 삭제하기" : "탈퇴하기",
			value: "delete",
			onClick: isOwner ? onDelete : onLeave,
			classNames: {
				label: "text-color-point-50 font-pretendard",
				button: "hover:!bg-color-alpha-white100 !bg-color-alpha-white100",
			},
		},
	];

	return (
		<Dropdown.Root open={open} onOpenChange={setOpen}>
			<AdditionalButtonTrigger />
			<Dropdown.Content autoWidth className="min-w-[180px] !z-10">
				{dropdownItemList.map((item, index) =>
					item ? (
						<>
							<Dropdown.Item
								key={item.value}
								value={item.value}
								onClick={() => {
									item.onClick?.();
									setOpen(false);
								}}
								classNames={item.classNames}
							>
								{item.label}
							</Dropdown.Item>
							{index === 0 && <Dropdown.Divider />}
						</>
					) : null,
				)}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default TeamManagementUsersAdditionalButton;
