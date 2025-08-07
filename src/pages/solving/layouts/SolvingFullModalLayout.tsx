import { createPortal } from "react-dom";

//
//
//

export interface SolvingFullModalLayoutProps {
	open?: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}

//
//
//

const SolvingFullModalLayout = ({
	open = false,
	children,
}: SolvingFullModalLayoutProps) => {
	if (!open) {
		return null;
	}

	return createPortal(
		<div className="fixed inset-0 h-screen w-screen z-50 flex items-center justify-center bg-white">
			<div
				className="w-screen h-screen bg-gradient-to-b
    from-color-alpha-white25
    to-color-warning-5"
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default SolvingFullModalLayout;
