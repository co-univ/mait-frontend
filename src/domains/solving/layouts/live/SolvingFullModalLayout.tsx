import { X } from "lucide-react";
import { useEffect, useState } from "react";
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
	onClose,
	children,
}: SolvingFullModalLayoutProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (open) {
			setShouldRender(true);
			// 다음 프레임에서 애니메이션 시작
			requestAnimationFrame(() => {
				setIsVisible(true);
			});
		} else {
			setIsVisible(false);
			// 애니메이션 완료 후 DOM에서 제거
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300); // transition 시간과 맞춤

			return () => clearTimeout(timer);
		}
	}, [open]);

	useEffect(() => {
		if (!open || !onClose) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);

	if (!shouldRender) {
		return null;
	}

	return createPortal(
		<div
			className={`fixed inset-0 h-screen w-screen z-40 flex items-center justify-center bg-white transition-opacity duration-300 ease-in-out ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`relative w-screen h-screen bg-gradient-to-b from-color-alpha-white25 to-color-warning-5 transition-transform duration-300 ease-in-out ${
					isVisible ? "scale-100" : "scale-95"
				}`}
			>
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="absolute top-6 right-6 z-50 p-2 rounded-full hover:bg-color-alpha-black5 transition-colors"
					>
						<X size={24} className="text-color-gray-60" />
					</button>
				)}
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default SolvingFullModalLayout;
