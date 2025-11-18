import { Plus } from "lucide-react";

//
//
//

const ControlParticipantMemberAddButton = () => {
	return (
		<button
			type="button"
			className="flex gap-gap-4 p-padding-8 rounded-radius-medium1 border border-dashed border-color-gray-20 typo-body-large text-color-gray-30"
		>
			<Plus size={24} />
			<span>추가</span>
		</button>
	);
};

export default ControlParticipantMemberAddButton;
