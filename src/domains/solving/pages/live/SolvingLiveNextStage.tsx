import clsx from "clsx";
import { Award } from "lucide-react";
import AwardLower from "src/assets/images/award-lower.svg";
import AwardUpper from "src/assets/images/award-upper.svg";
import gold_bell from "src/assets/images/gold-bell.png";
import useBreakpoint from "@/hooks/useBreakpoint";
import SolvingFullModalLayout from "../../layouts/live/SolvingFullModalLayout";

//
//
//

// type SolvingNextStageProps = Omit<SolvingFullModalLayoutProps, "children">;
interface SolvingLiveNextStageProps {
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

const SolvingLiveNextStage = ({
	activeParticipants,
	open,
	onClose,
}: SolvingLiveNextStageProps) => {
	const { isMobile } = useBreakpoint();
	const awardSize = isMobile ? 24 : 40;

	return (
		<SolvingFullModalLayout open={open} onClose={onClose}>
			<div
				className={clsx(
					"flex justify-center w-full h-full pb-[84px]",
					isMobile ? "px-4" : "px-[172px]",
				)}
			>
				<div className="flex flex-1 top-[5%] max-w-[1096px]">
					<img
						src={gold_bell}
						alt="Gold Bell"
						className={clsx(
							"absolute left-1/2 -translate-x-1/2 z-30",
							isMobile ? "w-[90px] top-[20px]" : "w-[150px] top-[40px]",
						)}
					/>
					<div
						className={clsx(
							"relative flex flex-1 flex-col items-center rounded-radius-large1 bg-color-alpha-white10m text-color-warning-60",
							isMobile
								? "mt-[190px] pt-[50px] typo-heading-medium"
								: "mt-[200px] pt-[60px] typo-heading-xlarge",
						)}
						style={{
							boxShadow:
								"4px 4px 101.6px 86px var(--color-alpha-white100, #FFF) inset, 0 4px 40px -10px rgba(255, 226, 167, 0.50)",
						}}
					>
						<div
							className={clsx(
								"absolute *:w-full *:h-auto",
								isMobile ? "top-[-52px] w-[190px]" : "top-[-107px]",
							)}
						>
							<AwardUpper />
						</div>
						<div
							className={clsx(
								"absolute *:w-full *:h-auto",
								isMobile ? "top-[-6px] w-[220px]" : "top-[-13px]",
							)}
						>
							<AwardLower />
						</div>

						<div className={clsx(isMobile ? "mb-4 mt-2" : "mb-[32px]")}>
							다음 진출자!
						</div>
						<div
							className={clsx(
								"flex flex-1 justify-center items-start w-full overflow-y-auto py-4",
								isMobile ? "gap-4" : "gap-8",
							)}
						>
							<div
								className={clsx("flex flex-col", isMobile ? "gap-2" : "gap-4")}
							>
								{activeParticipants
									.filter((_, idx) => idx % 2 === 0)
									.map((user) => (
										<div key={user.userId} className="flex items-center gap-2">
											<Award size={awardSize} />
											<div>{user.userNickname ?? user.participantName}</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</SolvingFullModalLayout>
	);
};

export default SolvingLiveNextStage;
