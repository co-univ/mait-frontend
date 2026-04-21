import { useState } from "react";
import { Dropdown } from "@/components/dropdown";
import AdditionalButtonTrigger from "@/domains/management/components/common/card-additional-button/AdditionalButtonTrigger";

//
//
//

interface TeamManagementAdditionalButtonProps {
	isOwner: boolean;
	onLeave: () => void;
	onDelete: () => void;
}

//
//
//

const TeamManagementAdditionalButton = ({
	isOwner,
	onLeave,
	onDelete,
}: TeamManagementAdditionalButtonProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dropdown.Root open={open} onOpenChange={setOpen}>
			<AdditionalButtonTrigger />
			<Dropdown.Content autoWidth className="min-w-[180px] !z-10">
				<Dropdown.Item
					value="action"
					onClick={isOwner ? onDelete : onLeave}
					classNames={{
						label: "text-color-point-50 font-pretendard",
						button: "hover:!bg-color-alpha-white100 !bg-color-alpha-white100",
					}}
				>
					{isOwner ? "팀 삭제하기" : "탈퇴하기"}
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default TeamManagementAdditionalButton;
