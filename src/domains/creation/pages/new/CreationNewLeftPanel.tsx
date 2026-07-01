import { Field } from "@/components/field";
import { Radio } from "@/components/radio";
import type {
	QuestionCount,
	QuestionSetCategoryApiResponse,
} from "@/libs/types";
import CreationCategoryField from "../../components/category/CreationCategoryField";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";
import type { CreationNewQuestionSetState } from "../../reducers/new/CreationNewQuestionSetReducer";
import CreationNewLeftPanelCountsField from "./CreationNewLeftPanelCountsField";

//
//
//

interface CreationNewLeftPanelProps {
	creationType: CreationNewQuestionSetState["creationType"];
	categories: QuestionSetCategoryApiResponse[];
	title?: string;
	counts?: QuestionCount[];
	onCreationTypeChange: (
		type: CreationNewQuestionSetState["creationType"],
	) => void;
	onCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	onCategoryRemove: (categoryId: number) => void;
	onTitleChange: (title: string) => void;
	onQuestionCountCheck: (
		checked: boolean,
		questionType: QuestionCount["type"],
	) => void;
	onQuestionCountCountChange: (
		type: QuestionCount["type"],
		count: number,
	) => void;
}

//
//
//

const CreationNewLeftPanel = ({
	creationType,
	categories,
	title,
	counts,
	onCreationTypeChange,
	onCategoryAdd,
	onCategoryRemove,
	onTitleChange,
	onQuestionCountCheck,
	onQuestionCountCountChange,
}: CreationNewLeftPanelProps) => {
	/**
	 *
	 */
	const renderCreationTypeField = () => {
		return (
			<Field.Root className="gap-gap-9">
				<Field.Label className="typo-body-large">문제 생성 방식</Field.Label>
				<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
					<Radio.Group
						value={creationType}
						onChange={(value) =>
							onCreationTypeChange(
								value as CreationNewQuestionSetState["creationType"],
							)
						}
						className="flex flex-1 flex-wrap gap-gap-8 justify-between"
					>
						<Radio.Item value="AI_GENERATED" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>AI 생성</Radio.Label>
						</Radio.Item>
						<Radio.Item value="MANUAL" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>직접 제작</Radio.Label>
						</Radio.Item>
					</Radio.Group>
				</div>
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

	/**
	 *
	 */
	const renderSubjectField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">주제</Field.Label>
				<CreationPanelTextarea
					placeholder="ex. 네트워크"
					minRows={1}
					value={title}
					onChange={(e) => onTitleChange(e.target.value)}
				/>
			</Field.Root>
		);
	};

	return (
		<CreationPanel>
			{renderCreationTypeField()}
			{renderCategoryField()}
			{renderSubjectField()}
			<CreationNewLeftPanelCountsField
				counts={counts}
				onQuestionCountCheck={onQuestionCountCheck}
				onQuestionCountCountChange={onQuestionCountCountChange}
			/>
		</CreationPanel>
	);
};

export default CreationNewLeftPanel;
