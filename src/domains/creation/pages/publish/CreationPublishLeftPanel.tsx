import { Field } from "@/components/field";
import { Radio } from "@/components/radio";
import type { DeliveryMode, QuestionSetVisibility } from "@/libs/types";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";

//
//
//

type CreationPublishLeftPanelProps = {
	title: string;
	visibility: QuestionSetVisibility;
	mode: DeliveryMode;
	onChangeTitle: (title: string) => void;
	onChangeVisibility: (visibility: QuestionSetVisibility) => void;
	onChangeMode: (mode: DeliveryMode) => void;
};

//
//
//

const CreationPublishLeftPanel = ({
	title,
	visibility,
	mode,
	onChangeTitle,
	onChangeVisibility,
	onChangeMode,
}: CreationPublishLeftPanelProps) => {
	/**
	 *
	 */
	const renderTitleField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">제목</Field.Label>
				<CreationPanelTextarea
					minRows={1}
					placeholder="ex. 언어기초"
					value={title}
					onChange={(e) => onChangeTitle(e.target.value)}
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderVisibilityField = () => {
		return (
			<Field.Root className="gap-gap-9">
				<Field.Label className="typo-body-large">공개 대상</Field.Label>
				<div className="flex justify-between py-padding-10 px-padding-12 bg-color-gray-5 rounded-radius-medium1">
					<Radio.Group
						value={visibility}
						onChange={(value) =>
							onChangeVisibility(value as QuestionSetVisibility)
						}
						className="flex flex-1 flex-wrap gap-gap-8 justify-between"
					>
						<Radio.Item value="PUBLIC" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>전채공개</Radio.Label>
						</Radio.Item>
						<Radio.Item value="GROUP" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>그룹공개</Radio.Label>
						</Radio.Item>
						<Radio.Item value="PRIVATE" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>비공개</Radio.Label>
						</Radio.Item>
					</Radio.Group>
				</div>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderModeField = () => {
		return (
			<Field.Root className="gap-gap-9">
				<Field.Label className="typo-body-large">문제 풀이 방식</Field.Label>
				<div className="flex justify-between py-padding-10 px-padding-12 bg-color-gray-5 rounded-radius-medium1">
					<Radio.Group
						value={mode}
						onChange={(value) => onChangeMode(value as DeliveryMode)}
						className="flex flex-1 flex-wrap gap-gap-8 justify-between"
					>
						<Radio.Item value="LIVE_TIME" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>실시간 풀이</Radio.Label>
						</Radio.Item>
						<Radio.Item value="STUDY" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>학습 풀이</Radio.Label>
						</Radio.Item>
					</Radio.Group>
				</div>
			</Field.Root>
		);
	};

	return (
		<CreationPanel>
			{renderTitleField()}
			{renderVisibilityField()}
			{renderModeField()}
		</CreationPanel>
	);
};

export default CreationPublishLeftPanel;
