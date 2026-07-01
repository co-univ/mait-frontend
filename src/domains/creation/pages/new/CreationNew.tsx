import clsx from "clsx";
import { ChevronRight, FileText, PencilLine, X } from "lucide-react";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading.json";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import FileInput from "@/components/FileInput";
import { Field } from "@/components/field";
import { Radio } from "@/components/radio";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import type {
	QuestionCount,
	QuestionSetSolveMode,
	QuestionSetVisibility,
} from "@/libs/types";
import CreationCategoryField from "../../components/category/CreationCategoryField";
import CreationPanel from "../../components/common/CreationPanel";
import CreationPanelTextarea from "../../components/common/CreationPanelTextarea";
import CreationNewNumberInput from "../../components/new/CreationNewNumberInput";
import useCreationNewQuestionSet from "../../hooks/new/useCreationNewQuestionSet";
import type { CreationNewQuestionSetState } from "../../reducers/new/CreationNewQuestionSetReducer";

//
//
//

const QUESTION_COUNT_CONFIG: { type: QuestionCount["type"]; label: string }[] =
	[
		{ type: "MULTIPLE", label: "객관식" },
		{ type: "SHORT", label: "주관식" },
		{ type: "FILL_BLANK", label: "빈칸" },
		{ type: "ORDERING", label: "순서" },
	];

//
//
//

const CreationNew = () => {
	const { activeTeam } = useTeams();

	const {
		questionSet,
		isFileUploading,
		disabledCreateQuestionSet,
		handleCreationTypeChange,
		handleCategoryAdd,
		handleCategoryRemove,
		handleTitleChange,
		handleQuestionCountCheck,
		handleQuestionCountCountChange,
		handleMaterialUpload,
		handleMaterialsDelete,
		handleInstructionChange,
		handleSolveModeChange,
		handleVisibilityChange,
		handleCreateButtonClick,
		isManualType,
		isQuestionTypeChecked,
		getQuestionCountCount,
	} = useCreationNewQuestionSet();

	/**
	 *
	 */
	const renderTitleField = () => (
		<Field.Root>
			<Field.Label className="typo-body-large">제목</Field.Label>
			<CreationPanelTextarea
				placeholder="ex. 네트워크"
				minRows={1}
				value={questionSet.title}
				onChange={(e) => handleTitleChange(e.target.value)}
			/>
		</Field.Root>
	);

	/**
	 *
	 */
	const renderCategoryField = () => (
		<CreationCategoryField
			selectedCategories={questionSet.categories}
			onCategoryAdd={handleCategoryAdd}
			onCategoryRemove={handleCategoryRemove}
		/>
	);

	/**
	 *
	 */
	const renderCreationTypeField = () => (
		<Field.Root className="gap-gap-9">
			<Field.Label className="typo-body-large">문제 생성 방식</Field.Label>
			<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
				<Radio.Group
					value={questionSet.creationType}
					onChange={(value) =>
						handleCreationTypeChange(
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

	/**
	 *
	 */
	const renderCountsField = () => (
		<Field.Root disabled={isManualType}>
			<Field.Label className="typo-body-large">문제 유형</Field.Label>
			<div className="flex flex-col gap-gap-8 bg-color-gray-5 py-padding-10 px-padding-11 rounded-radius-medium1 typo-body-medium">
				<div className="flex flex-wrap gap-gap-8">
					{QUESTION_COUNT_CONFIG.slice(0, 2).map(({ type, label }) => (
						<div
							key={type}
							className="flex flex-1 items-center gap-gap-5 min-w-[140px]"
						>
							<CheckBox
								checked={isQuestionTypeChecked(type)}
								onChange={(checked) => handleQuestionCountCheck(checked, type)}
								disabled={isManualType}
							/>
							<span className="flex items-center gap-gap-3">
								{label}{" "}
								<CreationNewNumberInput
									checked={isQuestionTypeChecked(type)}
									value={getQuestionCountCount(type)}
									onChange={(count) =>
										handleQuestionCountCountChange(type, count)
									}
								/>
								개
							</span>
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-gap-8">
					{QUESTION_COUNT_CONFIG.slice(2, 4).map(({ type, label }) => (
						<div
							key={type}
							className="flex flex-1 items-center gap-gap-5 min-w-[140px]"
						>
							<CheckBox
								checked={isQuestionTypeChecked(type)}
								onChange={(checked) => handleQuestionCountCheck(checked, type)}
								disabled={isManualType}
							/>
							<span className="flex items-center gap-gap-3">
								{label}{" "}
								<CreationNewNumberInput
									checked={isQuestionTypeChecked(type)}
									value={getQuestionCountCount(type)}
									onChange={(count) =>
										handleQuestionCountCountChange(type, count)
									}
								/>
								개
							</span>
						</div>
					))}
				</div>
			</div>
		</Field.Root>
	);

	/**
	 *
	 */
	const renderMaterialField = () => (
		<Field.Root disabled={isManualType}>
			<Field.Label className="typo-body-large">자료 업로드</Field.Label>
			<div className="flex flex-col gap-gap-10">
				<span
					className={clsx("typo-body-xsmall text-color-warning-60", {
						"!text-color-gray-20": isManualType,
					})}
				>
					*관련 자료가 없는 경우 AI로 생성된 문제 정보가 부정확할 수 있습니다.
				</span>
				{questionSet.materials?.length ? (
					<div className="flex flex-col gap-gap-5 py-padding-8 px-padding-10 bg-color-gray-5 rounded-radius-medium1">
						{questionSet.materials.map((material, index) => (
							<div
								key={material.file.lastModified}
								className="flex items-start gap-gap-3 w-full"
							>
								<FileText />
								<div className="flex flex-col">
									<span className="typo-body-xsmall">{material.file.name}</span>
									<span className="typo-body-xsmall text-color-gray-40">
										{(material.file.size / 1024).toFixed(2)} KB
									</span>
								</div>
								<div className="flex-1" />
								{isFileUploading ? (
									<Lottie
										options={{ animationData: loadingAnimation }}
										width={60}
									/>
								) : (
									<button
										type="button"
										onClick={() => handleMaterialsDelete(index)}
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
							onChange={(file) => handleMaterialUpload(file)}
							className="mt-size-height-2 py-padding-8"
						/>
					</div>
				) : (
					<FileInput
						disabled={isManualType}
						file={null}
						accept=".pdf,.md"
						text=".md또는 .pdf 업로드"
						onChange={(file) => handleMaterialUpload(file)}
					/>
				)}
			</div>
		</Field.Root>
	);

	/**
	 *
	 */
	const renderInstructionField = () => (
		<Field.Root disabled={isManualType}>
			<Field.Label className="typo-body-large">보충 설명</Field.Label>
			<CreationPanelTextarea
				disabled={isManualType}
				placeholder="AI에게 문제 생성 시 원하는 요구사항이 있다면 적어주세요."
				value={questionSet.instruction}
				onChange={(e) => handleInstructionChange(e.target.value)}
			/>
		</Field.Root>
	);

	/**
	 *
	 */
	const renderVisibilityField = () => (
		<Field.Root className="gap-gap-9">
			<Field.Label className="typo-body-large">공개 대상</Field.Label>
			<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
				<Radio.Group
					value={questionSet.visibility}
					onChange={(value) =>
						handleVisibilityChange(value as QuestionSetVisibility)
					}
					className="flex flex-1 flex-wrap gap-gap-8 justify-between"
				>
					<Radio.Item value="PUBLIC" className="flex-1 min-w-[100px]">
						<Radio.Input />
						<Radio.Label>전체공개</Radio.Label>
					</Radio.Item>
					{activeTeam?.teamType === "GROUP" && (
						<Radio.Item value="GROUP" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>그룹공개</Radio.Label>
						</Radio.Item>
					)}
					<Radio.Item value="PRIVATE" className="flex-1 min-w-[100px]">
						<Radio.Input />
						<Radio.Label>비공개</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</div>
		</Field.Root>
	);

	/**
	 *
	 */
	const renderSolveModeField = () => (
		<Field.Root className="gap-gap-9">
			<Field.Label className="typo-body-large">문제 풀이 방식</Field.Label>
			<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
				<Radio.Group
					value={questionSet.solveMode}
					onChange={(value) =>
						handleSolveModeChange(value as QuestionSetSolveMode)
					}
					className="flex flex-1 flex-wrap gap-gap-8 justify-between"
				>
					{activeTeam?.teamType === "GROUP" && (
						<Radio.Item value="LIVE_TIME" className="flex-1 min-w-[100px]">
							<Radio.Input />
							<Radio.Label>실시간 풀이</Radio.Label>
						</Radio.Item>
					)}
					<Radio.Item value="STUDY" className="flex-1 min-w-[100px]">
						<Radio.Input />
						<Radio.Label>학습 풀이</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</div>
		</Field.Root>
	);

	return (
		<LabeledPageLayout
			icon={<PencilLine />}
			label="문제 정보 입력"
			className="max-w-[640px]"
		>
			<div className="flex flex-col gap-gap-11">
				<CreationPanel>
					{renderTitleField()}
					{renderCategoryField()}
					{renderCreationTypeField()}
					{renderCountsField()}
					{renderMaterialField()}
					{renderInstructionField()}
					{renderVisibilityField()}
					{renderSolveModeField()}
				</CreationPanel>
				<div className="flex justify-end">
					<Button
						disabled={disabledCreateQuestionSet}
						icon={<ChevronRight />}
						item="문제 만들기"
						onClick={handleCreateButtonClick}
						className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationNew;
