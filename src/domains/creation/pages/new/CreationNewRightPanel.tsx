import clsx from "clsx";
import { FileText, X } from "lucide-react";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading.json";
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
	isFileUploading: boolean;
	difficulty: string;
	materials: CreationNewQuestionSetState["materials"];
	instruction: string;
	onDifficultyChange: (difficulty: string) => void;
	onMaterialUpload: (file: File | null) => void;
	onMaterialsDelete: (index: number) => void;
	onInstructionChange: (instruction: string) => void;
};

const CreationNewRightPanel = ({
	readonly,
	isFileUploading,
	difficulty,
	materials,
	instruction,
	onDifficultyChange,
	onMaterialUpload,
	onMaterialsDelete,
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
					placeholder="ex. 대학생 3학년/컴퓨터공학 전공자"
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
					{materials?.length ? (
						<div className="flex flex-col gap-gap-5 py-padding-8 px-padding-10 bg-color-gray-5 rounded-radius-medium1">
							{materials.map((material, index) => (
								<div
									key={material.file.lastModified}
									className="flex items-start gap-gap-3 w-full"
								>
									<FileText />

									<div className="flex flex-col">
										<span className="typo-body-xsmall">
											{material.file.name}
										</span>
										<span className="typo-body-xsmall text-color-gray-40">
											{(material.file.size / 1024).toFixed(2)} KB
										</span>
									</div>

									<div className="flex-1" />

									{isFileUploading ? (
										<Lottie
											options={{
												animationData: loadingAnimation,
											}}
											width={60}
										/>
									) : (
										<button
											type="button"
											onClick={() => {
												onMaterialsDelete(index);
											}}
										>
											<X size={20} />
										</button>
									)}
								</div>
							))}

							<FileInput
								accept=".pdf,.md"
								text=".md또는 .pdf 업로드"
								file={null}
								onChange={(file) => onMaterialUpload(file)}
								className="mt-size-height-2 py-padding-8"
							/>
						</div>
					) : (
						<FileInput
							disabled={readonly}
							file={null}
							accept=".pdf,.md"
							text=".md또는 .pdf 업로드"
							onChange={(file) => onMaterialUpload(file)}
						/>
					)}
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
					placeholder="AI에게 문제 생성 시 원하는 요구사항이 있다면 적어주세요."
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
