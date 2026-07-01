import { Field } from "@/components/field";
import type {
	QuestionSetCategoryApiResponse,
	QuestionSetCreationType,
} from "@/libs/types";
import CreationCategoryField from "../../components/category/CreationCategoryField";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";

//
//
//

type CreationPublishRightPanelProps = {
	creationType?: QuestionSetCreationType;
	difficulty?: string;
	categories: QuestionSetCategoryApiResponse[];
	onChangeDifficulty: (difficulty: string) => void;
	onCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	onCategoryRemove: (categoryId: number) => void;
};

//
//
//

const CreationPublishRightPanel = ({
	creationType,
	difficulty,
	categories,
	onChangeDifficulty,
	onCategoryAdd,
	onCategoryRemove,
}: CreationPublishRightPanelProps) => {
	/**
	 *
	 */
	const renderDifficultyField = () => {
		if (creationType === "MANUAL") {
			return null;
		}

		return (
			<Field.Root>
				<Field.Label className="typo-body-large">
					문제 풀이 대상/난이도
				</Field.Label>
				<CreationPanelTextarea
					minRows={1}
					placeholder="ex. 대학생 3학년/컴퓨터공학 전공자"
					value={difficulty}
					onChange={(e) => onChangeDifficulty(e.target.value)}
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderCategoryField = () => {
		return (
			<CreationCategoryField
				selectedCategories={categories}
				onCategoryAdd={onCategoryAdd}
				onCategoryRemove={onCategoryRemove}
			/>
		);
	};

	return (
		<CreationPanel>
			{renderDifficultyField()}
			{renderCategoryField()}
		</CreationPanel>
	);
};

export default CreationPublishRightPanel;
