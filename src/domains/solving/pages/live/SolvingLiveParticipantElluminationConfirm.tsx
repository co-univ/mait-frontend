import clsx from "clsx";
import Button from "@/components/Button";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";

//
//
//

interface SolvingLiveParticipantElluminationConfirmProps {
	isOpen: boolean;
	onClose: () => void;
}

const SolvingLiveParticipantElluminationConfirm = ({
	isOpen,
	onClose,
}: SolvingLiveParticipantElluminationConfirmProps) => {
	if (!isOpen) {
		return null;
	}

	/**
	 *
	 */
	const handleConfirm = () => {
		onClose();
	};

	return (
		<ConfirmDialog>
			<div className="fixed left-0 top-[0px] w-screen h-screen flex flex-col py-[168px] justify-end items-center gap-[42px] bg-[linear-gradient(180deg,var(--color-alpha-white25,rgba(255,255,255,0.25))_-27.02%,var(--color-primary-5,#ECF2FE)_100%)]">
				<div className="flex flex-col gap-[10px]">
					<h3 className="text-alpha-black100 typo-heading-medium">
						진출자 선정이 완료되었습니다!
					</h3>
					<p className="text-alpha-black100 typo-body-medium">
						문제 풀이는 다음 기회에 진행해주세요.
					</p>
				</div>

				<Button
					className={clsx(
						"rounded-radius-medium1 border-none bg-primary-10 flex justify-center items-center p-padding-6 w-[260px] h-size-height-9",
					)}
					item={<p className="text-primary-50 typo-body-medium-bold">확인</p>}
					onClick={handleConfirm}
				/>
			</div>
		</ConfirmDialog>
	);
};

export default SolvingLiveParticipantElluminationConfirm;
