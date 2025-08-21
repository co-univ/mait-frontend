import { Award } from "lucide-react";
import award_lower from "src/assets/images/award-lower.svg";
import award_upper from "src/assets/images/award-upper.svg";
import gold_bell from "src/assets/images/gold-bell.png";
import SolvingFullModalLayout from "../../layouts/live/SolvingFullModalLayout";

//
//
//

// type SolvingNextStageProps = Omit<SolvingFullModalLayoutProps, "children">;
interface QualifierViewProps {
	activeParticipants: Array<{
		participantId: number;
		userId: number;
		participantName: string;
	}>;
	open?: boolean;
}

//
//
//

const SolvingNextStage = ({ activeParticipants, open }: QualifierViewProps) => {
	return (
		<SolvingFullModalLayout open={open}>
			<div className="flex justify-center w-full h-full px-[172px] pb-[84px]">
				<div className="flex flex-1 top-[5%] max-w-[1096px]">
					<img
						src={gold_bell}
						alt="Gold Bell"
						className="absolute left-1/2 -translate-x-1/2 w-[150px] top-[40px] z-30"
					/>
					<div
						className="relative flex flex-1 flex-col items-center rounded-radius-large1 mt-[200px] pt-[60px] bg-color-alpha-white10m typo-heading-xlarge text-color-warning-60"
						style={{
							boxShadow:
								"4px 4px 101.6px 86px var(--color-alpha-white100, #FFF) inset, 0 4px 40px -10px rgba(255, 226, 167, 0.50)",
						}}
					>
						<img
							src={award_upper}
							alt="Award Upper"
							className="absolute top-[-107px]"
						/>
						<img
							src={award_lower}
							alt="Award Lower"
							className="absolute top-[-13px]"
						/>
						<div className="mb-[32px]">다음 진출자</div>
						<div className="flex flex-1 justify-center items-start gap-8 w-full overflow-y-auto py-4">
							<div className="flex flex-col gap-4">
								{activeParticipants
									.filter((_, idx) => idx % 2 === 0)
									.map((user) => (
										<div key={user.userId} className="flex items-center gap-2">
											<Award size={40} />
											<div>{user.participantName}</div>
										</div>
									))}
							</div>
							<div className="flex flex-col gap-4">
								{activeParticipants
									.filter((_, idx) => idx % 2 === 1)
									.map((user) => (
										<div key={user.userId} className="flex items-center gap-2">
											<Award size={40} />
											<div>{user.participantName}</div>
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

export default SolvingNextStage;
