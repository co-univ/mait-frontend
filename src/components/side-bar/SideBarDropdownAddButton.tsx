import { Plus } from "lucide-react";

//
//
//

interface SideBarDropdownAddButtonProps {
	onClick: () => void;
}

//
//
//

const SideBarDropdownAddButton = ({
	onClick,
}: SideBarDropdownAddButtonProps) => {
	return (
		<div className="px-padding-4 w-full">
			<button
				type="button"
				onClick={onClick}
				className="flex gap-gap-5 items-center py-padding-2 px-padding-4 mb-padding-2 rounded-sm w-full text-color-gray-30 typo-body-small hover:bg-color-primary-5"
			>
				<span className="w-[14px]" />
				<Plus size={20} />
				<span>팀 추가하기</span>
			</button>
		</div>
	);
};

export default SideBarDropdownAddButton;
