import chartClipImage from "@/assets/images/chart-clip.png";

//
//
//

const DashboardTeamRankingEmpty = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-gap-5 h-full w-full">
			<img src={chartClipImage} alt="empty state" className="size-[64px]" />
			<span className="text-color-gray-30 typo-body-xsmall">
				아직 우리팀 랭킹이 없습니다
			</span>
		</div>
	);
};

export default DashboardTeamRankingEmpty;
