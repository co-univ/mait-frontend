import { ChevronRight, Puzzle } from "lucide-react";
import SolvingBadge from "../../components/common/SolvingBadge";
import SolvingButton from "../../components/common/SolvingButton";

//
//
//

interface SolvingLiveHeaderProps {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	isSubmitDisabled: boolean;
	number?: number;
	handleAnswersSubmit: () => void;
}

//
//
//

const SolvingLiveHeader = ({
	isSubmitted,
	isCorrect,
	isSubmitDisabled,
	number,
	handleAnswersSubmit,
}: SolvingLiveHeaderProps) => {
	/**
	 *
	 */
	const getBadgeColor = () => {
		if (!isSubmitted) {
			return "primary";
		}

		return isCorrect ? "success" : "point";
	};

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex justify-between items-center">
				<SolvingBadge
					color={getBadgeColor()}
					icon={<Puzzle />}
					lable={`Q${number ?? ""}`}
				/>
				<div className="flex gap-gap-5">
					<SolvingButton
						color={getBadgeColor()}
						icon={<ChevronRight />}
						lable="제출하기"
						onClick={handleAnswersSubmit}
						disabled={isSubmitDisabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default SolvingLiveHeader;
