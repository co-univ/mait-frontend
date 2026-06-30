import { ChevronRight, PencilLine } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import useCreationPublishQuestionSet from "../../hooks/publish/useCreationPublishQuestionSet";
import CreationPublishLeftPanel from "./CreationPublishLeftPanel";
import CreationPublishRightPanel from "./CreationPublishRightPanel";

//
//
//

const CreationPublish = () => {
	const questionSetId = Number(useParams().questionSetId);

	const {
		questionSet,
		data,
		disabledPublishQuestionSet,
		handleTitleChange,
		handleVisibilityChange,
		handleModeChange,
		handleDifficultyChange,
		handleCategoryAdd,
		handleCategoryRemove,
		handlePublishButtonClick,
	} = useCreationPublishQuestionSet({ questionSetId });

	return (
		<LabeledPageLayout
			icon={<PencilLine />}
			label="문제 셋 생성"
			rightContent={
				<Button
					disabled={disabledPublishQuestionSet}
					icon={<ChevronRight />}
					item="문제 만들기"
					onClick={handlePublishButtonClick}
					className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
			}
		>
			<div className="flex flex-col gap-gap-11">
				<div className="flex gap-gap-5 w-full">
					<CreationPublishLeftPanel
						title={questionSet.title}
						visibility={questionSet.visibility ?? "PUBLIC"}
						solveMode={questionSet.solveMode ?? "LIVE_TIME"}
						onChangeTitle={handleTitleChange}
						onChangeVisibility={handleVisibilityChange}
						onChangeSolveMode={handleModeChange}
					/>
					<CreationPublishRightPanel
						creationType={data?.data?.creationType}
						difficulty={questionSet.difficulty}
						categories={questionSet.categories}
						onChangeDifficulty={handleDifficultyChange}
						onCategoryAdd={handleCategoryAdd}
						onCategoryRemove={handleCategoryRemove}
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationPublish;
