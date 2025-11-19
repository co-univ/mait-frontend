import { Field } from "@/components/field";
import type { QuestionSetCreationType } from "@/libs/types";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";

//
//
//

type CreationPublishRightPanelProps = {
	creationType?: QuestionSetCreationType;
	difficulty?: string;
	subject?: string;
	onChangeDifficulty: (difficulty: string) => void;
	onChangeSubject: (subject: string) => void;
};

//
//
//

const CreationPublishRightPanel = ({
	creationType,
	difficulty,
	subject,
	onChangeDifficulty,
	onChangeSubject,
}: CreationPublishRightPanelProps) => {
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
					disabled
					minRows={1}
					value={difficulty}
					onChange={(e) => onChangeDifficulty(e.target.value)}
				/>
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
				<CreationPanelTextarea
					disabled
					minRows={1}
					value={subject}
					onChange={(e) => onChangeSubject(e.target.value)}
				/>
			</Field.Root>
		);
	};

	return (
		<CreationPanel>
			{renderDifficultyField()}
			{renderSubjectField()}
		</CreationPanel>
	);
};

export default CreationPublishRightPanel;
