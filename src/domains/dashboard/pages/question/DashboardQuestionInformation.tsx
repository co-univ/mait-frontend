import { useQuery } from "@tanstack/react-query";
import { BookX, ChessQueen } from "lucide-react";
import { useParams } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardQuestionIncorrect from "../../components/question/DashboardQuestionIncorrect";
import DashboardTeamRankingTable from "../../components/team-ranking/DashboardTeamRankingTable";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import { teamRankingQueryOptions } from "../../queries/common/dashboardQueries";
import { questionWrongRatesQueryOptions } from "../../queries/question/dashboardQuestionQueries";

//
//
//

const DashboardQuestionInformation = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { solveMode } = useDashboardQuestionResults({
		questionSetId,
		questionId,
	});

	const { activeTeam } = useTeams();

	const { data: rankingData } = useQuery({
		...teamRankingQueryOptions(activeTeam?.teamId ?? 0),
		enabled: !!activeTeam,
	});

	const { data: wrongRatesData } = useQuery(
		questionWrongRatesQueryOptions(questionSetId),
	);

	const ranking = rankingData?.data;
	const wrongRates = wrongRatesData?.data?.slice(0, 3) ?? [];

	return (
		<div className="flex gap-gap-9">
			{solveMode === "LIVE_TIME" && (
				<div className="flex-[2]">
					<div className="h-full flex flex-col gap-gap-9 p-padding-11 rounded-radius-large1 bg-color-primary-5 border border-color-gray-10 shadow-base">
						<DashboardHeader icon={<ChessQueen />} title="우리팀 랭킹" />
						<DashboardTeamRankingTable
							hideCount
							teamRankings={ranking?.teamRankings}
							userRank={
								ranking?.containsUserRank ? undefined : ranking?.userRank
							}
						/>
					</div>
				</div>
			)}
			<div className="flex-[3] h-full">
				<div className="h-full flex flex-col gap-gap-9">
					<DashboardHeader
						icon={<BookX className="stroke-color-danger-50" />}
						title="오답률 top3"
					/>
					{wrongRates.map((wrongRate, index) => (
						<DashboardQuestionIncorrect
							// biome-ignore lint/suspicious/noArrayIndexKey: Incorrect component is static component that only shows top 3 ranked questions
							key={index}
							rank={index + 1}
							rate={wrongRate.wrongRate ?? 0}
							questionId={wrongRate.questionId}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardQuestionInformation;
