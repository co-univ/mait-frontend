import StatusBar from "@/components/StatusBar";

//
//
//

interface DashboardCategoryItemProps {
	category: string;
	percentage: number;
}

//
//
//

const DashboardCategoryItem = ({
	category,
	percentage,
}: DashboardCategoryItemProps) => {
	const clamped = Math.min(100, Math.max(0, percentage));

	return (
		<div className="flex items-center gap-2 py-2 pl-[18px] pr-2 h-[48px] rounded-medium1 border border-color-gray-10 bg-color-gray-5 typo-body-small text-color-alpha-black100">
			<span className="w-[84px] lg:w-[112px] xl:w-[140px] shrink-0 truncate">
				{category}
			</span>
			<div className="min-w-0 flex-1">
				<StatusBar rate={clamped} />
			</div>
			<span className="w-[60px] shrink-0 text-center">{clamped}%</span>
		</div>
	);
};

export default DashboardCategoryItem;
