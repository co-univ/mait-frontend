import React from "react";
import { Field } from "@/components/field";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";

//
//
//

type CreationPublishRightPanelProps = {};

//
//
//

const CreationPublishRightPanel = () => {
	const renderLevelDescriptionField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">
					문제 풀이 대상/난이도
				</Field.Label>
				<CreationPanelTextarea
					minRows={1}
					placeholder="ex. 대학생 3학년/컴퓨터공학 전공자"
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
				<CreationPanelTextarea minRows={1} placeholder="ex. 네트워크" />
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
