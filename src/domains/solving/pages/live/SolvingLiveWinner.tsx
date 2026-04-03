import clsx from "clsx";
import { Award, ChevronRight, PartyPopper } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gold_bell from "src/assets/images/gold-bell.png";
import winner_print from "src/assets/images/winner-print.png";
import winner_stamp from "src/assets/images/winner-stamp.png";
import Button from "@/components/Button";
import useBreakpoint from "@/hooks/useBreakpoint";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
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
		userNickname?: string;
	}>;
	open?: boolean;
	onClose?: () => void;
}
//
//
//

const SolvingLiveWinner = ({
	activeParticipants,
	open,
	onClose,
}: SolvingLiveWinnerProps) => {
	const navigate = useNavigate();
	const hasTrackedViewRef = useRef(false);

	const { isMobile } = useBreakpoint();

	/**
	 *
	 */
	const handleResultClick = () => {
		trackEvent(GTM_EVENT_NAMES.solvingLiveResultCtaClick);
		navigate("/dashboard", {
			state: {
				entrySource: "winner_cta",
			},
		});
	};

	//
	useEffect(() => {
		if (!open) {
			hasTrackedViewRef.current = false;
			return;
		}

		if (hasTrackedViewRef.current) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveResultCtaView);
		hasTrackedViewRef.current = true;
	}, [open]);

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
					<div
						className={clsx(
							"flex flex-col items-center absolute left-0 right-0",
							isMobile ? " top-[56px]" : "top-[80px]",
						)}
					>
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

						<div className={clsx(isMobile ? "h-4" : "h-[34px]")} />

						<div className="flex justify-center items-center py-[10px] w-[200px] border-t border-b border-dashed border-color-gray-40 typo-body-small text-color-warning-60">
							{activeParticipants.length}명 중에 1등하셨습니다
						</div>

						<div className={clsx(isMobile ? "h-4" : "h-[34px]")} />

						<div className="flex flex-col gap-[10px] items-center">
							<Award size={40} className="stroke-color-warning-60" />
							{activeParticipants.map((user) => (
								<div
									className={clsx(
										"text-color-warning-60",
										isMobile ? "typo-heading-medium" : "typo-heading-xlarge",
									)}
									key={user.userId}
								>
									{user.userNickname ?? user.participantName}
								</div>
							))}
						</div>

						<div className={clsx(isMobile ? "h-4" : "h-[34px]")} />

						<div className={clsx(isMobile ? "w-[160px]" : "w-[240px]")}>
							<img src={winner_stamp} alt="Winner Stamp" />
						</div>

						<div className={clsx(isMobile ? "h-4" : "h-[34px]")} />

						<div>
							<Button
								className={clsx(
									"flex flex-col p-padding-6 bg-warning-50 rounded-radius-max border-none text-alpha-white100 gap-gap-5",
									isMobile
										? "h-5 typo-body-xsmall w-[181px]"
										: "typo-body-medium w-[240px]",
								)}
								item={
									<div className="flex items-center">
										<p>문제풀이 결과 보러가기</p>
										<ChevronRight />
									</div>
								}
								onClick={handleResultClick}
							/>
						</div>
					</div>
				</div>
			</div>
		</SolvingFullModalLayout>
	);
};

export default SolvingLiveWinner;
