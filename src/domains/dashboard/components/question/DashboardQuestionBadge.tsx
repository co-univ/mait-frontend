import { Puzzle } from "lucide-react";
import SolvingBadge from "@/domains/solving/components/common/SolvingBadge";
import type { QuestionSolveResultApiResponse } from "@/libs/types";

//
//
//

interface DashboardQuestionBadgeProps {
	solveResult?: QuestionSolveResultApiResponse;
	number?: number;
}

//
//
//

const DashboardQuestionBadge = ({
	solveResult,
	number,
}: DashboardQuestionBadgeProps) => {
	const badgeColor = solveResult?.isCorrect ? "success" : "point";

	return (
		<div className="w-fit">
			<SolvingBadge
				color={badgeColor}
				icon={<Puzzle />}
				lable={`Q${number ?? ""}`}
			/>
		</div>
	);
};

export default DashboardQuestionBadge;
