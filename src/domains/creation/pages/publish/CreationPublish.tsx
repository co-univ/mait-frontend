import { ChevronRight, PencilLine } from "lucide-react";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import CreationPublishLeftPanel from "./CreationPublishLeftPanel";
import CreationPublishRightPanel from "./CreationPublishRightPanel";

//
//
//

const CreationPublish = () => {
	return (
		<LabeledPageLayout
			icon={<PencilLine />}
			label="문제 셋 생성"
			rightContent={
				<Button
					icon={<ChevronRight />}
					item="문제 만들기"
					// onClick={handleCreateButtonClick}
					className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
			}
		>
			<div className="flex flex-col gap-gap-11">
				<div className="flex gap-gap-5 w-full">
					<CreationPublishLeftPanel />
					<CreationPublishRightPanel />
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationPublish;
