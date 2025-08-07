import gold_bell from "../../../assets/images/gold-bell.png";
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
			</div>
		</SolvingFullModalLayout>
	);
};

export default SolvingWinner;
