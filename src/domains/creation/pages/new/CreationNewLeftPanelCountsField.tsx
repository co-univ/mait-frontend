import CheckBox from "@/components/CheckBox";
import { Field } from "@/components/field";
import type { QuestionCount } from "@/libs/types";
import CreationNewNumberInput from "../../components/new/CreationNewNumberInput";

//
//
//

interface CreationNewLeftPanelCountsFieldProps {
	counts?: QuestionCount[];
	onQuestionCountCheck: (
		checked: boolean,
		questionType: QuestionCount["type"],
	) => void;
	onQuestionCountCountChange: (
		type: QuestionCount["type"],
		count: number,
	) => void;
}

const QUESTION_COUNT_CONFIG: {
	type: QuestionCount["type"];
	label: string;
}[] = [
	{ type: "MULTIPLE", label: "객관식" },
	{ type: "SHORT", label: "주관식" },
	{ type: "FILL_BLANK", label: "빈칸" },
	{ type: "ORDERING", label: "순서" },
];

//
//
//

const CreationNewLeftPanelCountsField = ({
	counts,
	onQuestionCountCheck,
	onQuestionCountCountChange,
}: CreationNewLeftPanelCountsFieldProps) => {
	/**
	 *
	 */
	const isQuestionTypeChecked = (type: QuestionCount["type"]) => {
		return !!counts?.some((c) => c.type === type);
	};

	/**
	 *
	 */
	const getQuestionCountCount = (type: QuestionCount["type"]) => {
		return counts?.find((c) => c.type === type)?.count;
	};

	return (
		<Field.Root>
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
								onChange={(checked) => onQuestionCountCheck(checked, type)}
							/>
							<span className="flex items-center gap-gap-3">
								{label}{" "}
								<CreationNewNumberInput
									checked={isQuestionTypeChecked(type)}
									value={getQuestionCountCount(type)}
									onChange={(count) => onQuestionCountCountChange(type, count)}
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
								onChange={(checked) => onQuestionCountCheck(checked, type)}
							/>
							<span className="flex items-center gap-gap-3">
								{label}{" "}
								<CreationNewNumberInput
									checked={isQuestionTypeChecked(type)}
									value={getQuestionCountCount(type)}
									onChange={(count) => onQuestionCountCountChange(type, count)}
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

export default CreationNewLeftPanelCountsField;
