import clsx from "clsx";
import { useEffect } from "react";
import Button from "@/components/Button";
import useUser from "@/hooks/useUser";

//
//
//

interface SolvingLiveParticipantEliminationConfirmProps {
	isOpen: boolean;
	onClose: () => void;
}

const SolvingLiveParticipantEliminationConfirm = ({
	isOpen,
	onClose,
}: SolvingLiveParticipantEliminationConfirmProps) => {
	const { user } = useUser();

	//
	useEffect(() => {
		if (!isOpen) return;

		const prevent = (e: Event) => e.preventDefault();

		document.addEventListener("wheel", prevent, { passive: false });
		document.addEventListener("touchmove", prevent, { passive: false });

		return () => {
			document.removeEventListener("wheel", prevent);
			document.removeEventListener("touchmove", prevent);
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed left-0 top-[0px] w-screen h-screen z-50 flex flex-col py-[80px] justify-end items-center gap-[42px] bg-[linear-gradient(180deg,var(--color-alpha-white25,rgba(255,255,255,0.25))_-27.02%,var(--color-primary-5,#ECF2FE)_100%)]"
			role="presentation"
			onPointerDown={(e) => e.stopPropagation()}
		>
			<div className="flex flex-col gap-[10px]">
				<h3 className="text-alpha-black100 typo-heading-medium">
					진출자 선정이 완료되었습니다!
				</h3>
				<p className="text-alpha-black100 typo-body-medium">
					{user?.nickname}님은 현재 문제를 풀 수 없습니다.
				</p>
			</div>

			<Button
				className={clsx(
					"rounded-radius-medium1 border-none bg-primary-10 flex justify-center items-center p-padding-6 w-[260px] h-size-height-9",
				)}
				item={<p className="text-primary-50 typo-body-medium-bold">확인</p>}
				onClick={onClose}
			/>
		</div>
	);
};

export default SolvingLiveParticipantEliminationConfirm;
