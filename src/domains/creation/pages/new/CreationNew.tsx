import { PencilLine, Puzzle } from "lucide-react";
import Badge from "@/components/Badge";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import CreationNewLeftPanel from "./CreationNewLeftPanel";
import CreationNewRightPanel from "./CreationNewRightPanel";

//
//
//

const CreationNew = () => {
	return (
		<LabeledPageLayout icon={<PencilLine />} label="문제 정보 입력">
			<div className="flex flex-col gap-gap-11">
				<Badge
					icon={<Puzzle />}
					item="자료가 없으면 문제 생성이 부정확할 수 있습니다."
					className="typo-body-medium text-color-warning-60 bg-warning-5 border border-color-warning-30 w-fit"
				/>

				<div className="flex gap-gap-5 w-full">
					<CreationNewLeftPanel />

					<CreationNewRightPanel />
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationNew;
