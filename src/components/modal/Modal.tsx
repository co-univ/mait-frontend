import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { getPortalContainer } from "./portal";
import useModal from "./useModal";

//
//
//

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

//
//
//

const Modal = ({ open, onClose, children }: ModalProps) => {
	useModal({ open, onClose });

	if (!open) {
		return null;
	}

	const portalContainer = getPortalContainer();

	//
	//
	//
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const modalContent = (
		// biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop needs to handle click events
		// biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop needs to handle key events
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gray-40 bg-opacity-50"
			onClick={handleBackdropClick}
		>
			<div className="relative bg-alpha-white100 p-padding-11 rounded-radius-medium1 shadow-m">
				<button
					type="button"
					onClick={onClose}
					className="absolute right-padding-11 top-padding-11"
					aria-label="Close modal"
				>
					<X size={24} />
				</button>
				{children}
			</div>
		</div>
	);

	return createPortal(modalContent, portalContainer);
};

export default Modal;
