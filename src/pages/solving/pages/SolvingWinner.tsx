import { Award, PartyPopper } from "lucide-react";
import gold_bell from "../../../assets/images/gold-bell.png";
import winner_print from "../../../assets/images/winner-print.png";
import winner_stamp from "../../../assets/images/winner-stamp.png";
import SolvingFullModalLayout, {
	type SolvingFullModalLayoutProps,
} from "../layouts/SolvingFullModalLayout";

//
//
//

type SolvingWinnerProps = Omit<SolvingFullModalLayoutProps, "children">;

//
//
//

const SolvingWinner = ({ open, onClose }: SolvingWinnerProps) => {
	return (
		<SolvingFullModalLayout open={open} onClose={onClose}>
			<div className="flex items-center justify-center flex-col w-full h-full">
				<img src={gold_bell} alt="Gold Bell" className="w-[94px]" />

				<div className="h-[24px]" />

				<div className="text-color-warning-60 typo-heading-xlarge">우승자!</div>

				<div className="h-[24px]" />

				<div className="relative">
					<img
						src={winner_print}
						alt="Winner Print"
						className="w-[400px] object-cover"
					/>
					<div className="flex flex-col items-center absolute left-0 right-0 top-[80px]">
						<div className="flex items-center justify-center gap-[20px]">
							<PartyPopper className="stroke-color-warning-40" />
							<div className="typo-heading-medium text-color-warning-60">
								축하드립니다!
							</div>
							<PartyPopper className="stroke-color-warning-40" />
						</div>

						<div className="h-[32px]" />

						<div className="flex justify-center items-center py-[10px] w-[200px] border-t border-b border-dashed border-color-gray-40 typo-body-small text-color-warning-60">
							n명 중에 1등하셨습니다
						</div>

						<div className="h-[34px]" />

						<div className="flex gap-[10px] items-center">
							<Award size={40} className="stroke-color-warning-60" />
							<div className="typo-heading-xlarge text-color-warning-60">
								누구
							</div>
						</div>

						<div className="h-[34px]" />

						<img src={winner_stamp} alt="Winner Stamp" />
					</div>
				</div>
			</div>
		</SolvingFullModalLayout>
	);
};

export default SolvingWinner;
