import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";

//
//
//

interface OnboardingFinishModalProps {
	onConfirm: (isDismissed: boolean) => void;
}

//
//
//

const OnboardingFinishModal = ({ onConfirm }: OnboardingFinishModalProps) => {
	const [isDismissed, setIsDismissed] = useState(false);
	const titleId = useId();
	const descriptionId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	//
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				onConfirm(false);
				return;
			}

			if (e.key === "Tab") {
				e.preventDefault();
				const checkboxEl = dialogRef.current?.querySelector<HTMLElement>('[role="checkbox"]');
				const confirmButton = confirmButtonRef.current;
				if (!checkboxEl || !confirmButton) return;
				const active = document.activeElement;
				if (e.shiftKey) {
					if (active === checkboxEl) confirmButton.focus();
					else checkboxEl.focus();
				} else {
					if (active === confirmButton) checkboxEl.focus();
					else confirmButton.focus();
				}
			}
		};

		const preventInteraction = (e: Event) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("mousedown", preventInteraction, true);
		document.addEventListener("touchstart", preventInteraction, true);
		document.addEventListener("click", preventInteraction, true);

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
			document.removeEventListener("mousedown", preventInteraction, true);
			document.removeEventListener("touchstart", preventInteraction, true);
			document.removeEventListener("click", preventInteraction, true);
			document.body.style.overflow = originalOverflow;
		};
	}, [onConfirm]);

	return (
		<div className="fixed inset-0 z-50 bg-color-alpha-black25">
			<div
				ref={dialogRef}
				className="absolute left-1/2 -translate-x-1/2 top-5 bg-color-alpha-white100 flex flex-col gap-gap-11 items-start p-padding-11 rounded-radius-medium1 shadow-m min-w-[512px]"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
			>
				<div className="flex flex-col gap-gap-5 items-start w-full">
					<p id={titleId} className="typo-heading-small">
						온보딩이 완료되었습니다! 이제 MAIT 서비스를 시작해 보세요.
					</p>
					<p id={descriptionId} className="typo-body-small whitespace-pre-wrap">
						필요하신 경우 설정에서 온보딩을 다시 확인할 수 있습니다.
					</p>
				</div>

				<div className="flex items-center justify-between w-full">
					<button
						type="button"
						className="flex items-center gap-gap-5 cursor-pointer select-none typo-body-xsmall text-color-gray-60"
						onClick={() => setIsDismissed((v) => !v)}
					>
						<CheckBox
							checked={isDismissed}
							size={20}
							onChange={setIsDismissed}
						/>
						다시 보지 않기
					</button>

					<Button
						ref={confirmButtonRef}
						variant="primary"
						item="시작하기"
						onClick={() => onConfirm(isDismissed)}
						className="bg-color-primary-50 border-color-primary-50 text-color-alpha-white100 px-padding-8 py-padding-4 typo-body-xsmall"
					/>
				</div>
			</div>
		</div>
	);
};

export default OnboardingFinishModal;
