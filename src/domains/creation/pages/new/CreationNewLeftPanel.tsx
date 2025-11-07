import { Field } from "@/components/field";
import { Radio } from "@/components/radio";
import type { QuestionCount } from "@/libs/types";
import CreationNewPanel from "../../components/new/CreationNewPanel";
import CreationNewTextarea from "../../components/new/CreationNewTextarea";
import CreationNewLeftPanelCountsField from "./CreationNewLeftPanelCountsField";

//
//
//

interface CreationNewLeftPanelProps {
	subject: string;
	counts?: QuestionCount[];
	onSubjectChange: (subject: string) => void;
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
	subject,
	counts,
	onSubjectChange,
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
				<div className="flex justify-between py-padding-10 px-padding-12 bg-color-gray-5 rounded-radius-medium1">
					<Radio.Group
						value="MANUAL"
						onChange={() => {}}
						className="flex flex-1 flex-wrap gap-gap-8 justify-between"
					>
						<Radio.Item value="AI_GENERATED" className="flex-1 min-w-[140px]">
							<Radio.Input />
							<Radio.Label>AI 생성</Radio.Label>
						</Radio.Item>
						<Radio.Item value="MANUAL" className="flex-1 min-w-[140px]">
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
	const renderSubjectField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">주제</Field.Label>
				<CreationNewTextarea
					placeholder="ex. 네트워크"
					value={subject}
					onChange={(e) => onSubjectChange(e.target.value)}
				/>
			</Field.Root>
		);
	};


	return (
		<CreationNewPanel>
			{renderCreationTypeField()}
			{renderSubjectField()}
			<CreationNewLeftPanelCountsField
				counts={counts}
				onQuestionCountCheck={onQuestionCountCheck}
				onQuestionCountCountChange={onQuestionCountCountChange}
			/>
		</CreationNewPanel>
	);
};

export default CreationNewLeftPanel;
