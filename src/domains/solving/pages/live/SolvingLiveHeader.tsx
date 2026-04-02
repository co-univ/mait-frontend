import { ChevronRight, Puzzle } from "lucide-react";
import SolvingBadge from "../../components/common/SolvingBadge";
import SolvingButton from "../../components/common/SolvingButton";
import SolvingLiveTopBar from "./SolvingLiveTopBar";

//
//
//

interface SolvingLiveHeaderProps {
	quizTitle: string;
	questionNum: number;
	totalQuestionNum: number;
	isSubmitted: boolean;
	isCorrect: boolean | null;
	isFailed: boolean;
	isSubmitDisabled: boolean;
	number?: number;
	handleAnswersSubmit: () => void;
}

//
//
//

const SolvingLiveHeader = ({
	quizTitle,
	questionNum,
	totalQuestionNum,
	isSubmitted,
	isCorrect,
	isFailed,
	isSubmitDisabled,
	number,
	handleAnswersSubmit,
}: SolvingLiveHeaderProps) => {
	console.log(isFailed);
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
		<div className="sticky top-0 bg-alpha-white100 flex flex-col gap-gap-11">
			<SolvingLiveTopBar
				title={quizTitle}
				questionNum={questionNum}
				totalQuestionNum={totalQuestionNum}
			/>
			<div className="flex justify-between items-center  mb-1">
				<SolvingBadge
					color={getBadgeColor()}
					icon={<Puzzle />}
					lable={`Q${number ?? ""}`}
				/>
				<div className="flex gap-gap-5">
					{!isFailed ? (
						<SolvingButton
							color={getBadgeColor()}
							icon={<ChevronRight />}
							lable="제출하기"
							onClick={handleAnswersSubmit}
							disabled={isSubmitDisabled}
						/>
					) : (
						<SolvingBadge color="point" lable="풀이 불가" />
					)}
				</div>
			</div>
		</div>
	);
};

export default SolvingLiveHeader;
