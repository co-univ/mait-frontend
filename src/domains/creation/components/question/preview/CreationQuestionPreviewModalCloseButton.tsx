import { X } from "lucide-react";

//
//
//

interface CreationQuestionPreviewModalCloseButtonProps {
	onClose: () => void;
}

//
//
//

const CreationQuestionPreviewModalCloseButton = ({
	onClose,
}: CreationQuestionPreviewModalCloseButtonProps) => {
	return (
		<button
			type="button"
			className="absolute top-padding-12 right-padding-12"
			onClick={onClose}
		>
			<X />
		</button>
	);
};

export default CreationQuestionPreviewModalCloseButton;
