import { ClipboardList } from "lucide-react";

//
//
//

const DashboardCategoryHeader = () => {
	return (
		<div className="flex items-center gap-gap-5 typo-heading-medium">
			<ClipboardList />
			<h2>카테고리별 정답률</h2>
		</div>
	);
};

export default DashboardCategoryHeader;
