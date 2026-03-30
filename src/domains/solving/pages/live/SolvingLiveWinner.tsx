import clsx from "clsx";
import { Award, PartyPopper } from "lucide-react";
import gold_bell from "src/assets/images/gold-bell.png";
import winner_print from "src/assets/images/winner-print.png";
import winner_stamp from "src/assets/images/winner-stamp.png";
import useBreakpoint from "@/hooks/useBreakpoint";
import SolvingFullModalLayout from "../../layouts/live/SolvingFullModalLayout";

//
//
//

// type SolvingWinnerProps = Omit<SolvingFullModalLayoutProps, "children">;
interface SolvingLiveWinnerProps {
	activeParticipants: Array<{
		participantId: number;
		userId: number;
		participantName: string;
	}>;
	currentUserId: number;
	open?: boolean;
	onClose?: () => void;
}
//
//
//

const SolvingLiveWinner = ({
	activeParticipants,
	currentUserId,
	open,
	onClose,
}: SolvingLiveWinnerProps) => {
	const { isMobile } = useBreakpoint();

	return (
		<SolvingFullModalLayout open={open} onClose={onClose}>
			<div className="flex items-center justify-center flex-col w-full h-full">
				<img src={gold_bell} alt="Gold Bell" className="w-[94px]" />

				<div className="h-[24px]" />

				<div
					className={clsx(
						"text-color-warning-60",
						isMobile ? "typo-heading-large" : "typo-heading-xlarge",
					)}
				>
					우승자!
				</div>

				<div className="h-[24px]" />

				<div className="relative">
					<img
						src={winner_print}
						alt="Winner Print"
						className={clsx(
							"object-cover",
							isMobile ? "w-[312px]" : "w-[400px]",
						)}
					/>
					<div className="flex flex-col items-center absolute left-0 right-0 top-[80px]">
						<div className="flex items-center justify-center gap-[20px]">
							<PartyPopper className="stroke-color-warning-40" />
							<div
								className={clsx(
									"text-color-warning-60",
									isMobile ? "typo-heading-xsmall" : "typo-heading-medium",
								)}
							>
								축하드립니다!
							</div>
							<PartyPopper className="stroke-color-warning-40 -scale-x-100" />
						</div>

						<div className="h-[32px]" />

						<div className="flex justify-center items-center py-[10px] w-[200px] border-t border-b border-dashed border-color-gray-40 typo-body-small text-color-warning-60">
							{activeParticipants.length}명 중에 1등하셨습니다
						</div>

						<div className="h-[34px]" />

						<div className="flex flex-col gap-[10px] items-center">
							<Award size={40} className="stroke-color-warning-60" />
							{activeParticipants.map((user) => (
								<div
									className="typo-heading-xlarge text-color-warning-60"
									key={user.userId}
								>
									{user.participantName}
								</div>
							))}
						</div>

						<div className="h-[34px]" />

						<div className={clsx(isMobile ? "w-[160px]" : "w-[240px]")}>
							<img src={winner_stamp} alt="Winner Stamp" />
						</div>
					</div>
				</div>
			</div>
		</SolvingFullModalLayout>
	);
};

export default SolvingLiveWinner;
