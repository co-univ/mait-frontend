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
		resolve: (value: boolean) => void;
	} | null>(null);

	/**
	 * Show confirm dialog and return a Promise that resolves when user responds
	 */
	const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
		return new Promise((resolve) => {
			setConfirmState({
				isOpen: true,
				options,
				resolve,
			});
		});
	}, []);

	/**
	 * Handle confirm button click
	 */
	const handleConfirm = () => {
		if (confirmState) {
			confirmState.resolve(true);
			setConfirmState(null);
		}
	};

	/**
	 * Handle cancel button click
	 */
	const handleCancel = () => {
		if (confirmState) {
			confirmState.resolve(false);
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
