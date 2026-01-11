import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useSideDialog } from "./useSideDialog";

//
//
//

interface SideDialogProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

//
//
//

const SideDialog = ({ open, onClose, children }: SideDialogProps) => {
	const {
		isVisible,
		isAnimating,
		portalContainer,
		handleBackdropClick,
		setDialogElement,
	} = useSideDialog({ open, onClose });

	if (!isVisible || !portalContainer) {
		return null;
	}

	const dialogContent = (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is a common UX pattern for closing modals. ESC key is already handled in the hook for keyboard accessibility.
		// biome-ignore lint/a11y/noStaticElementInteractions: This div serves as an interactive backdrop overlay that closes the dialog when clicked outside. The interaction is intentional and standard for modal dialogs.
		<div
			className="fixed inset-0 z-40 bg-gray-40 bg-opacity-50 transition-opacity duration-300"
			style={{
				opacity: isAnimating ? 1 : 0,
			}}
			onClick={handleBackdropClick}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: This div only prevents event propagation (stopPropagation). It doesn't perform any action and doesn't need keyboard handlers. */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: The onClick here only stops propagation to prevent closing when clicking inside the dialog. No actual interaction is performed. */}
			<div
				ref={setDialogElement}
				className="fixed bottom-5 right-5 top-5 flex rounded-large2 border border-gray-10 bg-alpha-white100 p-padding-12 shadow-xl transition-transform duration-300 ease-in-out"
				style={{
					transform: isAnimating ? "translateX(0)" : "translateX(100%)",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4"
					aria-label="Close dialog"
				>
					<X size={24} />
				</button>

				<div className="flex-1 overflow-auto">{children}</div>
			</div>
		</div>
	);

	return createPortal(dialogContent, portalContainer);
};

export default SideDialog;
