import { EllipsisVertical } from "lucide-react";
import { useDropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

const AdditionalButtonTrigger = () => {
	const { open, onOpenChange, setReference, triggerRef } = useDropdownContext();

	return (
		<button
			ref={(node) => {
				setReference?.(node);
				if (triggerRef) {
					triggerRef.current = node;
				}
			}}
			type="button"
			className="shrink-0"
			onClick={() => onOpenChange?.(!open)}
		>
			<EllipsisVertical size={24} />
		</button>
	);
};

export default AdditionalButtonTrigger;
