import { useEffect, useState } from "react";

//
//
//

interface UseSideDialogProps {
	open: boolean;
	onClose: () => void;
}

//
//
//

export const useSideDialog = ({ open, onClose }: UseSideDialogProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
		null,
	);
	const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);

	//
	// Portal container setup
	//
	useEffect(() => {
		let container = document.getElementById("side-dialog-portal");

		if (!container) {
			container = document.createElement("div");
			container.id = "side-dialog-portal";
			document.body.appendChild(container);
		}

		setPortalContainer(container);

		return () => {
			if (container && container.children.length === 0) {
				document.body.removeChild(container);
			}
		};
	}, []);

	//
	// Handle opening animation
	//
	useEffect(() => {
		if (open) {
			setIsVisible(true);
		} else if (isVisible) {
			// Trigger closing animation
			setIsAnimating(false);
		}
	}, [open, isVisible]);

	//
	// Trigger animation when dialog element is mounted
	//
	useEffect(() => {
		if (dialogElement && open && !isAnimating) {
			// Force reflow to ensure initial styles are applied
			dialogElement.offsetHeight;

			requestAnimationFrame(() => {
				setIsAnimating(true);
			});
		}
	}, [dialogElement, open, isAnimating]);

	//
	// Handle transitionend event for closing animation
	//
	useEffect(() => {
		if (!dialogElement || isAnimating) {
			return;
		}

		const handleTransitionEnd = (e: TransitionEvent) => {
			// Only handle transform transition to avoid multiple triggers
			if (e.propertyName === "transform" && !isAnimating) {
				setIsVisible(false);
			}
		};

		dialogElement.addEventListener("transitionend", handleTransitionEnd);

		return () => {
			dialogElement.removeEventListener("transitionend", handleTransitionEnd);
		};
	}, [dialogElement, isAnimating]);

	//
	// ESC key handler
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

	//
	// Backdrop click handler
	//
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return {
		isVisible,
		isAnimating,
		portalContainer,
		handleBackdropClick,
		setDialogElement,
	};
};
