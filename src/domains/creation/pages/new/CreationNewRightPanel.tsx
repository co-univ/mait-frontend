import clsx from "clsx";
import FileInput from "@/components/FileInput";
import { Field } from "@/components/field";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";
import type { CreationNewQuestionSetState } from "../../reducers/new/CreationNewQuestionSetReducer";

//
//
//

type CreationNewRightPanelProps = {
	readonly: boolean;
	difficulty: string;
	materials?: undefined;
	instruction: string;
	onDifficultyChange: (difficulty: string) => void;
	onMaterialsChange: (
		materials: CreationNewQuestionSetState["materials"],
	) => void;
	onInstructionChange: (instruction: string) => void;
};

const CreationNewRightPanel = ({
	readonly,
	difficulty,
	materials,
	instruction,
	onDifficultyChange,
	onMaterialsChange,
	onInstructionChange,
}: CreationNewRightPanelProps) => {
	/**
	 *
	 */
	const renderDifficultyField = () => {
		return (
			<Field.Root disabled={readonly}>
				<Field.Label className="typo-body-large">문제 풀이 대상</Field.Label>
				<CreationPanelTextarea
					disabled={readonly}
					minRows={1}
					placeholder="대학생 3학년/컴퓨터공학 전공자"
					value={difficulty}
					onChange={(e) => onDifficultyChange(e.target.value)}
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderMaterialField = () => {
		return (
			<Field.Root disabled={readonly}>
				<Field.Label className="typo-body-large">자료 업로드</Field.Label>
				<div className="flex flex-col gap-gap-10">
					<span
						className={clsx("typo-body-xsmall text-color-warning-60", {
							"!text-color-gray-20": readonly,
						})}
					>
						*관련 자료가 없는 경우 AI로 생성된 문제 정보가 부정확할 수 있습니다.
					</span>
					<FileInput
						disabled={readonly}
						file={null}
						text=".pdf또는 .pptx 업로드"
						onChange={() => {}}
						className="flex-col"
					/>
				</div>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderInstructionField = () => {
		return (
			<Field.Root disabled={readonly}>
				<Field.Label className="typo-body-large">보충 설명</Field.Label>
				<CreationPanelTextarea
					disabled={readonly}
					placeholder="이 문제에 대해서 태그 형식으로 어쩌구 저쩌구로 뭐 이렇게 해서 저렇게 해줘."
					value={instruction}
					onChange={(e) => onInstructionChange(e.target.value)}
				/>
			</Field.Root>
		);
	};

	return (
		<CreationPanel>
			{renderDifficultyField()}
			{renderMaterialField()}
			{renderInstructionField()}
		</CreationPanel>
	);
};

export default CreationNewRightPanel;
