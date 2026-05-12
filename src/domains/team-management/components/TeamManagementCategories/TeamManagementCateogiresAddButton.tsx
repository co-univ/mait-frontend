import { Plus } from "lucide-react";

//
//
//

interface TeamManagementCateogiresAddButtonProps {
	onClick: () => void;
}

//
//
//

const TeamManagementCateogiresAddButton = ({
	onClick,
}: TeamManagementCateogiresAddButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex gap-gap-5 items-center typo-heading-xxsmall text-color-gray-30"
		>
			<Plus />
			카테고리 추가
		</button>
	);
};

export default TeamManagementCateogiresAddButton;
