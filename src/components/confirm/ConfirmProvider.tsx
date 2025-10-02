import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import type { ConfirmOptions } from "@/components/confirm/ConfirmContext";
import { ConfirmContext } from "@/components/confirm/ConfirmContext";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";

//
//
//

/**
 * Provider component for Confirm dialog
 *
 * @example
 * <ConfirmProvider>
 *   <App />
 * </ConfirmProvider>
 */
const ConfirmProvider = ({ children }: { children: ReactNode }) => {
	const [confirmState, setConfirmState] = useState<{
		isOpen: boolean;
		options: ConfirmOptions;
		onConfirm: () => void;
		onCancel: () => void;
	} | null>(null);

	/**
	 *
	 */
	const confirm = useCallback(
		(options: ConfirmOptions, onConfirm: () => void, onCancel?: () => void) => {
			setConfirmState({
				isOpen: true,
				options,
				onConfirm,
				onCancel: onCancel || (() => {}),
			});
		},
		[],
	);

	/**
	 *
	 */
	const handleConfirm = () => {
		if (confirmState) {
			confirmState.onConfirm();
			setConfirmState(null);
		}
	};

	/**
	 *
	 */
	const handleCancel = () => {
		if (confirmState) {
			confirmState.onCancel();
			setConfirmState(null);
		}
	};

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			{confirmState?.isOpen && (
				<ConfirmDialog
					title={confirmState.options.title}
					description={confirmState.options.description}
					cancelText={confirmState.options.cancelText}
					confirmText={confirmState.options.confirmText}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}
		</ConfirmContext.Provider>
	);
};

export default ConfirmProvider;
