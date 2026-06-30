import { ChevronRight, PencilLine } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
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
import useCreationPublishQuestionSet from "../../hooks/publish/useCreationPublishQuestionSet";

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

const CreationPublish = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { activeTeam } = useTeams();

	const {
		questionSet,
		questionSetData,
		isManualType,
		disabledPublishQuestionSet,
		handleTitleChange,
		handleVisibilityChange,
		handleModeChange,
		handleCategoryAdd,
		handleCategoryRemove,
		handlePublishButtonClick,
	} = useCreationPublishQuestionSet({ questionSetId });

	/**
	 *
	 */
	const renderTitleField = () => (
		<Field.Root>
			<Field.Label className="typo-body-large">제목</Field.Label>
			<CreationPanelTextarea
				minRows={1}
				placeholder="ex. 언어기초"
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
		<Field.Root disabled className="gap-gap-9">
			<Field.Label className="typo-body-large">문제 생성 방식</Field.Label>
			<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
				<Radio.Group
					value={questionSetData?.creationType ?? ""}
					onChange={() => {}}
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
	const renderCountsField = () => {
		if (isManualType) {
			return null;
		}

		return (
			<Field.Root disabled>
				<Field.Label className="typo-body-large">문제 유형</Field.Label>
				<div className="flex flex-col gap-gap-8 bg-color-gray-5 py-padding-10 px-padding-11 rounded-radius-medium1 typo-body-medium">
					<div className="flex flex-wrap gap-gap-8">
						{QUESTION_COUNT_CONFIG.slice(0, 2).map(({ type, label }) => (
							<div
								key={type}
								className="flex flex-1 items-center gap-gap-5 min-w-[140px]"
							>
								<CheckBox checked={false} onChange={() => {}} disabled />
								<span className="flex items-center gap-gap-3">
									{label}{" "}
									<CreationNewNumberInput
										checked={false}
										value={undefined}
										onChange={() => {}}
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
								<CheckBox checked={false} onChange={() => {}} disabled />
								<span className="flex items-center gap-gap-3">
									{label}{" "}
									<CreationNewNumberInput
										checked={false}
										value={undefined}
										onChange={() => {}}
									/>
									개
								</span>
							</div>
						))}
					</div>
				</div>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderInstructionField = () => {
		if (isManualType) {
			return null;
		}

		return (
			<Field.Root disabled>
				<Field.Label className="typo-body-large">보충 설명</Field.Label>
				<CreationPanelTextarea
					disabled
					placeholder="AI에게 문제 생성 시 원하는 요구사항이 있다면 적어주세요."
					value=""
					onChange={() => {}}
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderVisibilityField = () => (
		<Field.Root className="gap-gap-9">
			<Field.Label className="typo-body-large">공개 대상</Field.Label>
			<div className="flex justify-between py-padding-10 px-padding-11 bg-color-gray-5 rounded-radius-medium1">
				<Radio.Group
					value={questionSet.visibility ?? "PUBLIC"}
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
					value={questionSet.solveMode ?? "LIVE_TIME"}
					onChange={(value) => handleModeChange(value as QuestionSetSolveMode)}
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
			label="문제 셋 생성"
			className="max-w-[640px]"
		>
			<div className="flex flex-col gap-gap-11">
				<CreationPanel>
					{renderTitleField()}
					{renderCategoryField()}
					{renderCreationTypeField()}
					{renderCountsField()}
					{renderInstructionField()}
					{renderVisibilityField()}
					{renderSolveModeField()}
				</CreationPanel>
				<div className="flex justify-end">
					<Button
						disabled={disabledPublishQuestionSet}
						icon={<ChevronRight />}
						item="문제 생성하기"
						onClick={handlePublishButtonClick}
						className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationPublish;
