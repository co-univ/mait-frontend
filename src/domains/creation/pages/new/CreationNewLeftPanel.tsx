import CheckBox from "@/components/CheckBox";
import { Field } from "@/components/field";
import { Radio } from "@/components/radio";
import CreationNewPanel from "../../components/new/CreationNewPanel";
import CreationNewTextarea from "../../components/new/CreationNewTextarea";

//
//
//

const CreationNewLeftPanel = () => {
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
				<CreationNewTextarea placeholder="ex. 네트워크" />
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderQuestionCountField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">문제 유형</Field.Label>
				<div className="flex flex-col gap-gap-8 bg-color-gray-5 py-padding-10 px-padding-12 rounded-radius-medium1 typo-body-medium">
					<div className="flex flex-wrap gap-gap-8">
						<div className="flex flex-1 gap-gap-5 min-w-[140px]">
							<CheckBox checked onChange={() => {}} />
							<span>객관식 __개</span>
						</div>
						<div className="flex flex-1 gap-gap-5 min-w-[140px]">
							<CheckBox checked onChange={() => {}} />
							<span>주관식 __개</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-gap-8">
						<div className="flex flex-1 gap-gap-5 min-w-[140px]">
							<CheckBox checked={false} onChange={() => {}} />
							<span>빈칸 __개</span>
						</div>
						<div className="flex flex-1 gap-gap-5 min-w-[140px]">
							<CheckBox checked onChange={() => {}} />
							<span>순서 __개</span>
						</div>
					</div>
				</div>
			</Field.Root>
		);
	};

	return (
		<CreationNewPanel>
			{renderCreationTypeField()}
			{renderSubjectField()}
			{renderQuestionCountField()}
		</CreationNewPanel>
	);
};

export default CreationNewLeftPanel;
