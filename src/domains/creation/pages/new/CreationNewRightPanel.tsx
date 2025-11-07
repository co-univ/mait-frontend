import clsx from "clsx";
import FileInput from "@/components/FileInput";
import { Field } from "@/components/field";
import CreationNewPanelLayout from "../../components/new/CreationNewPanel";
import CreationNewTextarea from "../../components/new/CreationNewTextarea";

//
//
//

const CreationNewRightPanel = () => {
	/**
	 *
	 */
	const renderDifficultyField = () => {
		return (
			<Field.Root disabled>
				<Field.Label className="typo-body-large">문제 풀이 대상</Field.Label>
				<CreationNewTextarea
					disabled
					minRows={1}
					placeholder="대학생 3학년/컴퓨터공학 전공자"
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderMaterialField = () => {
		const isMatarialDisabled = true;

		return (
			<Field.Root disabled>
				<Field.Label className="typo-body-large">자료 업로드</Field.Label>
				<div className="flex flex-col gap-gap-10">
					<span
						className={clsx("typo-body-xsmall text-color-warning-60", {
							"!text-color-gray-20": isMatarialDisabled,
						})}
					>
						*관련 자료가 없는 경우 AI로 생성된 문제 정보가 부정확할 수 있습니다.
					</span>
					<FileInput
						disabled
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
			<Field.Root disabled>
				<Field.Label className="typo-body-large">보충 설명</Field.Label>
				<CreationNewTextarea
					disabled
					placeholder="이 문제에 대해서 태그 형식으로 어쩌구 저쩌구로 뭐 이렇게 해서 저렇게 해줘."
				/>
			</Field.Root>
		);
	};

	return (
		<CreationNewPanelLayout>
			{renderDifficultyField()}
			{renderMaterialField()}
			{renderInstructionField()}
		</CreationNewPanelLayout>
	);
};

export default CreationNewRightPanel;
