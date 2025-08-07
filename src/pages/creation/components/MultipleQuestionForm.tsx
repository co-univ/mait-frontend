import { Plus, Trash2 } from "lucide-react";
import type { MultipleChoiceDto } from "@/types";
import type { MultipleQuestionFormData } from "../types";
import FormInput from "./FormInput";
import QuestionFormBase from "./QuestionFormBase";

//
//
//

/**
 * MultipleQuestionForm 컴포넌트 - 객관식 문제 작성을 위한 폼 컴포넌트
 * 선택지 추가/삭제, 정답 선택, 문제 내용 및 해설 입력 기능 제공
 */
interface MultipleQuestionFormProps {
	data: MultipleQuestionFormData;
	onChange: (data: MultipleQuestionFormData) => void;
	disabled?: boolean;
}

//
//
//

/**
 * 객관식 문제 폼 컴포넌트
 * @param data - 현재 객관식 문제 데이터
 * @param onChange - 문제 데이터 변경 시 호출되는 콜백 함수
 */
const MultipleQuestionForm = ({
	data,
	onChange,
	disabled = false,
}: MultipleQuestionFormProps) => {
	// 문제 데이터 필드 업데이트 함수
	const updateField = (
		field: keyof MultipleQuestionFormData,
		value: string | MultipleChoiceDto[],
	) => {
		onChange({ ...data, [field]: value });
	};

	const addChoice = () => {
		const newChoice: MultipleChoiceDto = {
			number: data.choices.length + 1,
			content: "",
			correct: false,
		};
		updateField("choices", [...data.choices, newChoice]);
	};

	const updateChoice = (index: number, updates: Partial<MultipleChoiceDto>) => {
		const updatedChoices = data.choices.map((choice, i) =>
			i === index ? { ...choice, ...updates } : choice,
		);
		updateField("choices", updatedChoices);
	};

	const removeChoice = (index: number) => {
		const updatedChoices = data.choices
			.filter((_, i) => i !== index)
			.map((choice, i) => ({ ...choice, number: i + 1 }));
		updateField("choices", updatedChoices);
	};

	const toggleCorrectAnswer = (index: number) => {
		const updatedChoices = data.choices.map((choice, i) =>
			i === index ? { ...choice, correct: !choice.correct } : choice,
		);
		updateField("choices", updatedChoices);
	};

	return (
		<QuestionFormBase
			title="객관식 문제"
			questionNumber={data.number}
			questionType={data.type}
			disabled={disabled}
		>
			<div className="space-y-6">
				<FormInput
					label="문제 내용"
					value={data.content}
					onChange={(value) => updateField("content", value)}
					placeholder="문제를 입력하세요"
					multiline
					required
				/>

				<FormInput
					label="해설"
					value={data.explanation}
					onChange={(value) => updateField("explanation", value)}
					placeholder="해설을 입력하세요 (선택사항)"
					multiline
				/>

				<div>
					<div className="mb-4 flex items-center justify-between">
						<h4 className="text-gray-80 typo-body-medium">
							선택지 <span className="text-danger-50">*</span>
							<span className="ml-2 text-gray-40 typo-body-small">
								(복수 정답 선택 가능)
							</span>
						</h4>
						<button
							type="button"
							onClick={addChoice}
							className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
						>
							<Plus size={16} />
							선택지 추가
						</button>
					</div>

					<div className="space-y-3">
						{data.choices.map((choice, index) => (
							<div
								key={choice.id || index}
								className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3 shadow-sm"
							>
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={choice.correct || false}
										onChange={() => toggleCorrectAnswer(index)}
										className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="min-w-[20px] text-xs text-gray-500">
										{index + 1}
									</span>
								</div>

								<input
									type="text"
									value={choice.content}
									onChange={(e) =>
										updateChoice(index, { content: e.target.value })
									}
									placeholder={`${index + 1}번 선택지`}
									className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									required
								/>

								{data.choices.length > 1 && (
									<button
										type="button"
										onClick={() => removeChoice(index)}
										className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
									>
										<Trash2 size={16} />
									</button>
								)}
							</div>
						))}
					</div>

					{data.choices.length === 0 && (
						<div className="py-8 text-center text-sm text-gray-500">
							선택지를 추가해주세요
						</div>
					)}
				</div>
			</div>
		</QuestionFormBase>
	);
};

export default MultipleQuestionForm;
