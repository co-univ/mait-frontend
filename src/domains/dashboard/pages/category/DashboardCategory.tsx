import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ClipboardList } from "lucide-react";
import { useState } from "react";
import useTeams from "@/hooks/useTeams";
import DashboardCategoryItem from "../../components/category/DashboardCategoryItem";
import DashboardHeader from "../../components/common/DashboardHeader";
import { categoryCorrectRatesQueryOptions } from "../../queries/common/dashboardQueries";

//
//
//

const INITIAL_VISIBLE_COUNT = 8;

//
//
//

const DashboardCategory = () => {
	const { activeTeam } = useTeams();
	const [isExpanded, setIsExpanded] = useState(false);

	const { data } = useQuery(
		categoryCorrectRatesQueryOptions(activeTeam?.teamId ?? 0),
	);

	const categories = data?.data ?? [];

	const hiddenCount = Math.max(0, categories.length - INITIAL_VISIBLE_COUNT);
	const visibleCategories = isExpanded
		? categories
		: categories.slice(0, INITIAL_VISIBLE_COUNT);

	const leftColumnCategories = visibleCategories.filter(
		(_, index) => index % 2 === 0,
	);
	const rightColumnCategories = visibleCategories.filter(
		(_, index) => index % 2 !== 0,
	);

	return (
		<div className="flex flex-col w-full gap-gap-9">
			<DashboardHeader icon={<ClipboardList />} title="카테고리별 정답률" />

			<div className="flex gap-gap-9">
				<div className="flex-1 flex flex-col gap-gap-5">
					{leftColumnCategories.map((category) => (
						<DashboardCategoryItem
							key={category.categoryId}
							category={category.categoryName}
							percentage={category.myCorrectRate ?? 0}
						/>
					))}
				</div>
				<div className="flex-1 flex flex-col gap-gap-5">
					{rightColumnCategories.map((category) => (
						<DashboardCategoryItem
							key={category.categoryId}
							category={category.categoryName}
							percentage={category.myCorrectRate ?? 0}
						/>
					))}
				</div>
			</div>

			{hiddenCount > 0 && (
				<button
					type="button"
					onClick={() => setIsExpanded((prev) => !prev)}
					className="self-end flex items-center gap-1 typo-body-medium text-color-alpha-black100 border-b border-color-alpha-black100"
				>
					{isExpanded ? (
						<span>&nbsp;접기</span>
					) : (
						<span>&nbsp;외 {hiddenCount}개 더보기</span>
					)}
					<ChevronDown className={isExpanded ? "rotate-180" : ""} />
				</button>
			)}
		</div>
	);
};

export default DashboardCategory;
