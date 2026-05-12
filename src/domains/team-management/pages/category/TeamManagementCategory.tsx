import { Users } from "lucide-react";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";

//
//
//

const TeamManagementCategory = () => {
	return (
		<LabeledPageLayout icon={<Users />} label="카테고리 관리">
			카테고리 관리 페이지
		</LabeledPageLayout>
	);
};

export default TeamManagementCategory;
