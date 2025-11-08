import { Field } from "@/components/field";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";

//
//
//

type CreationPublishRightPanelProps = {
	levelDescription?: string;
	subject?: string;
	onChangeLevelDescription: (levelDescription: string) => void;
	onChangeSubject: (subject: string) => void;
};

//
//
//

const CreationPublishRightPanel = ({
	levelDescription,
	subject,
	onChangeLevelDescription,
	onChangeSubject,
}: CreationPublishRightPanelProps) => {
	const renderLevelDescriptionField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">
					문제 풀이 대상/난이도
				</Field.Label>
				<CreationPanelTextarea
					minRows={1}
					placeholder="ex. 대학생 3학년/컴퓨터공학 전공자"
					value={levelDescription}
					onChange={(e) => onChangeLevelDescription(e.target.value)}
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
					minRows={1}
					placeholder="ex. 네트워크"
					value={subject}
					onChange={(e) => onChangeSubject(e.target.value)}
				/>
			</Field.Root>
		);
	};
	return (
		<CreationPanel>
			{renderLevelDescriptionField()}
			{renderSubjectField()}
		</CreationPanel>
	);
};

export default CreationPublishRightPanel;
