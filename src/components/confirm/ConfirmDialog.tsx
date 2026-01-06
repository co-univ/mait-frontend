import { useEffect, useId, useRef } from "react";

//
//
//

interface ConfirmDialogProps {
	title: string;
	description?: string;
	cancelText?: string;
	confirmText?: string;
	onCancel: () => void;
	onConfirm: () => void;
}

//
//
//

/**
 * Confirmation dialog component with focus trap and modal behavior
 */
const ConfirmDialog = ({
	title,
	description,
	cancelText = "취소",
	confirmText = "확인",
	onCancel,
	onConfirm,
}: ConfirmDialogProps) => {
	const titleId = useId();
	const descriptionId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const cancelButtonRef = useRef<HTMLButtonElement>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	// Focus trap and keyboard handling
	useEffect(() => {
		// Handle keyboard events
		const handleKeyDown = (e: KeyboardEvent) => {
			// Prevent ESC from closing
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				onCancel();
				return;
			}

			// Handle Tab for focus trap
			if (e.key === "Tab") {
				e.preventDefault();

				const cancelButton = cancelButtonRef.current;
				const confirmButton = confirmButtonRef.current;

				if (!cancelButton || !confirmButton) return;

				const activeElement = document.activeElement;

				if (e.shiftKey) {
					// Shift + Tab (reverse)
					if (activeElement === cancelButton) {
						confirmButton.focus();
					} else if (activeElement === confirmButton) {
						cancelButton.focus();
					} else {
						// No button focused, focus confirm (last element)
						confirmButton.focus();
					}
				} else {
					// Tab (forward)
					if (activeElement === cancelButton) {
						confirmButton.focus();
					} else if (activeElement === confirmButton) {
						cancelButton.focus();
					} else {
						// No button focused, focus cancel (first element)
						cancelButton.focus();
					}
				}
			}
		};

		// Prevent background interactions
		const preventInteraction = (e: Event) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Prevent browser navigation
		const preventNavigation = (e: PopStateEvent) => {
			e.preventDefault();
			window.history.pushState(null, "", window.location.href);
		};

		// Push a dummy state to prevent navigation
		window.history.pushState(null, "", window.location.href);

		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("mousedown", preventInteraction, true);
		document.addEventListener("touchstart", preventInteraction, true);
		document.addEventListener("click", preventInteraction, true);
		window.addEventListener("popstate", preventNavigation);

		// Prevent scrolling on body
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
			document.removeEventListener("mousedown", preventInteraction, true);
			document.removeEventListener("touchstart", preventInteraction, true);
			document.removeEventListener("click", preventInteraction, true);
			window.removeEventListener("popstate", preventNavigation);
			document.body.style.overflow = originalOverflow;

			// Go back to remove the dummy state
			window.history.back();
		};
	}, [onCancel]);

	return (
		<div className="fixed inset-0 z-50 bg-color-alpha-black25">
			<div
				ref={dialogRef}
				className="absolute left-1/2 -translate-x-1/2 top-5 bg-color-alpha-white100 flex flex-col gap-gap-11 items-start p-padding-11 rounded-radius-medium1 shadow-m min-w-[512px]"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={description ? descriptionId : undefined}
			>
				<div className="flex flex-col gap-gap-5 items-start w-full">
					<div className="flex gap-gap-5 items-center w-full">
						<p id={titleId} className="typo-heading-small">
							{title}
						</p>
					</div>

					{description && (
						<p id={descriptionId} className="typo-body-small">
							{description}
						</p>
					)}
				</div>

				<div className="flex gap-gap-5 items-center justify-end w-full">
					<button
						ref={cancelButtonRef}
						type="button"
						onClick={onCancel}
						className="bg-color-alpha-white100 flex items-center justify-center px-padding-8 py-padding-4 rounded-md border border-color-gray-10 typo-body-xsmall"
					>
						{cancelText}
					</button>
					<button
						ref={confirmButtonRef}
						type="button"
						onClick={onConfirm}
						className="bg-color-primary-50 flex items-center justify-center px-padding-8 py-padding-4 rounded-md typo-body-xsmall text-color-alpha-white100"
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
