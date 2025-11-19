import { createContext, useContext } from "react";

//
//
//

export interface ConfirmOptions {
	title: string;
	description?: string;
	cancelText?: string;
	confirmText?: string;
}

interface ConfirmContextValue {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

//
//
//

export const ConfirmContext = createContext<ConfirmContextValue | undefined>(
	undefined,
);

//
//
//

/**
 * Hook to use confirm dialog
 *
 * @example
 * const { confirm } = useConfirm();
 *
 * const handleDelete = async () => {
 *   const result = await confirm({
 *     title: "정말 삭제하시겠습니까?",
 *     description: "문제를 삭제하실 경우, 원하시는 상태로 복구가 어렵습니다.",
 *   });
 *
 *   if (result) {
 *     // User confirmed
 *     deleteItem();
 *   }
 * };
 */
export const useConfirm = () => {
	const context = useContext(ConfirmContext);

	if (!context) {
		throw new Error("useConfirm must be used within ConfirmProvider");
	}

	return context;
};
