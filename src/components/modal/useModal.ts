import { useEffect } from "react";

//
//
//

interface UseModalProps {
	open: boolean;
	onClose: () => void;
}
//
//
//

const useModal = ({ open, onClose }: UseModalProps) => {
	//
	//
	//
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				onClose();
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "unset";
		};
	}, [open, onClose]);
};

export default useModal;
