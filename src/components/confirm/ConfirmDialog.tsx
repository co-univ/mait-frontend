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
 * Confirmation dialog component
 */
const ConfirmDialog = ({
	title,
	description,
	cancelText = "취소",
	confirmText = "확인",
	onCancel,
	onConfirm,
}: ConfirmDialogProps) => {
	return (
		<div className="fixed inset-0 z-50 bg-color-alpha-black25">
			<div className="absolute left-1/2 -translate-x-1/2 top-5 bg-color-alpha-white100 flex flex-col gap-gap-11 items-start p-padding-11 rounded-radius-medium1 shadow-m max-w-[512px]">
				<div className="flex flex-col gap-gap-5 items-start w-full">
					<div className="flex gap-gap-5 items-center w-full">
						<p className="typo-heading-small">{title}</p>
					</div>

					{description && <p className="typo-body-small">{description}</p>}
				</div>

				<div className="flex gap-gap-5 items-center justify-end w-full">
					<button
						type="button"
						onClick={onCancel}
						className="bg-color-alpha-white100 flex items-center justify-center px-padding-8 py-padding-4 rounded-md border border-color-gray-10 typo-body-xsmall"
					>
						{cancelText}
					</button>
					<button
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
