import { Plus, Star, Trash2 } from "lucide-react";
import { useEffect } from "react";
import type { FillBlankAnswerDto } from "@/types";
import type { FillBlankQuestionFormData } from "../types";
import FormInput from "./FormInput";
import QuestionFormBase from "./QuestionFormBase";

//
//
//

/**
 * FillBlankQuestionForm 컴포넌트 - 빈칸 문제 작성을 위한 폼 컴포넌트
 * 다중 정답 입력, 주 정답 설정, 문제 내용 및 해설 입력 기능 제공
 */
interface FillBlankQuestionFormProps {
	data: FillBlankQuestionFormData;
	onChange: (data: FillBlankQuestionFormData) => void;
	disabled?: boolean;
}

//
//
//

/**
 * 빈칸 문제 폼 컴포넌트
 * @param data - 현재 빈칸 문제 데이터
 * @param onChange - 문제 데이터 변경 시 호출되는 콜백 함수
 */
const FillBlankQuestionForm = ({
	data,
	onChange,
	disabled = false,
}: FillBlankQuestionFormProps) => {
	// 문제 데이터 필드 업데이트 함수
	const updateField = (
		field: keyof FillBlankQuestionFormData,
		value: string | FillBlankAnswerDto[],
	) => {
		onChange({ ...data, [field]: value });
	};

	// 새로운 정답 개념 추가 (새로운 number)
	const addNewAnswerConcept = () => {
		const maxNumber =
			data.fillBlankAnswers.length > 0
				? Math.max(...data.fillBlankAnswers.map((a) => a.number))
				: 0;
		const newAnswer: FillBlankAnswerDto = {
			answer: "",
			number: maxNumber + 1,
			main: true, // 새 개념의 첫 번째 답안은 주 정답
		};
		updateField("fillBlankAnswers", [...data.fillBlankAnswers, newAnswer]);
	};

	// 기존 정답 개념에 대안 표현 추가 (같은 number)
	const addAlternativeAnswer = (conceptNumber: number) => {
		const newAnswer: FillBlankAnswerDto = {
			answer: "",
			number: conceptNumber,
			main: false, // 대안 표현은 주 정답이 아님
		};
		updateField("fillBlankAnswers", [...data.fillBlankAnswers, newAnswer]);
	};

	const updateAnswer = (
		index: number,
		updates: Partial<FillBlankAnswerDto>,
	) => {
		const updatedAnswers = data.fillBlankAnswers.map((answer, i) =>
			i === index ? { ...answer, ...updates } : answer,
		);
		updateField("fillBlankAnswers", updatedAnswers);

		// 주 정답이 변경되면 문제 미리보기도 자동으로 업데이트됨 (리렌더링)
	};

	const removeAnswer = (index: number) => {
		const updatedAnswers = data.fillBlankAnswers.filter((_, i) => i !== index);
		// 주 정답이 삭제된 경우 첫 번째 답안을 주 정답으로 설정
		if (updatedAnswers.length > 0 && !updatedAnswers.some((a) => a.main)) {
			updatedAnswers[0].main = true;
		}
		updateField("fillBlankAnswers", updatedAnswers);
	};

	const setMainAnswer = (index: number) => {
		const selectedAnswer = data.fillBlankAnswers[index];
		const updatedAnswers = data.fillBlankAnswers.map((answer, i) => ({
			...answer,
			// 같은 number를 가진 답안들 중에서만 main을 변경
			main: answer.number === selectedAnswer.number ? i === index : answer.main,
		}));
		updateField("fillBlankAnswers", updatedAnswers);

		// 주 정답 변경 시 문제 미리보기 업데이트됨 (리렌더링)
	};

	// 문제 내용에서 빈칸(___) 찾기
	const findBlanks = (content: string): string[] => {
		return content.match(/___+/g) || [];
	};

	// 빈칸 개수에 맞춰 정답 자동 생성
	useEffect(() => {
		const blanks = findBlanks(data.content);
		const blankCount = blanks.length;

		if (blankCount > 0) {
			// 현재 정답보다 빈칸이 많으면 새 정답 추가
			const maxNumber =
				data.fillBlankAnswers.length > 0
					? Math.max(...data.fillBlankAnswers.map((a) => a.number))
					: 0;

			const newAnswers = [...data.fillBlankAnswers];

			for (let i = maxNumber + 1; i <= blankCount; i++) {
				// 해당 번호의 정답이 없으면 추가
				if (!newAnswers.some((answer) => answer.number === i)) {
					newAnswers.push({
						answer: "",
						number: i,
						main: true,
					});
				}
			}

			if (newAnswers.length !== data.fillBlankAnswers.length) {
				updateField("fillBlankAnswers", newAnswers);
			}
		}
	}, [data.content]);

	// 문제 내용을 빈칸과 함께 렌더링하는 함수
	const renderContentWithBlanks = () => {
		const content = data.content;
		if (!content) return null;

		const parts = content.split(/___+/);
		const blanks = findBlanks(content);

		if (blanks.length === 0) {
			return <div className="text-gray-700">{content}</div>;
		}

		return (
			<div className="leading-relaxed text-gray-700">
				{parts.map((part, index) => (
					<span key={index}>
						{part}
						{index < blanks.length && (
							<span className="inline-flex items-center">
								<input
									type="text"
									value={getMainAnswerForBlank(index + 1)}
									readOnly
									className="mx-1 min-w-[60px] max-w-[120px] border-b-2 border-yellow-300 bg-yellow-50 px-2 py-1 text-center text-sm font-medium text-gray-800"
									placeholder="빈칸"
								/>
							</span>
						)}
					</span>
				))}
			</div>
		);
	};

	// 특정 빈칸 번호의 주 정답 가져오기
	const getMainAnswerForBlank = (blankNumber: number): string => {
		const mainAnswer = data.fillBlankAnswers.find(
			(answer) => answer.number === blankNumber && answer.main,
		);
		return mainAnswer?.answer || "";
	};

	// number별로 답안들을 그룹화하는 헬퍼 함수
	const getAnswersByNumber = () => {
		const groups: {
			[key: number]: (FillBlankAnswerDto & { originalIndex: number })[];
		} = {};
		data.fillBlankAnswers.forEach((answer, index) => {
			if (!groups[answer.number]) {
				groups[answer.number] = [];
			}
			groups[answer.number].push({ ...answer, originalIndex: index });
		});
		return groups;
	};

	return (
		<QuestionFormBase
			title="빈칸 문제"
			questionNumber={data.number}
			questionType={data.type}
			disabled={disabled}
		>
			<div className="space-y-6">
				<div>
					<FormInput
						label="문제 내용"
						value={data.content}
						onChange={(value) => updateField("content", value)}
						placeholder="빈칸을 _____ 로 표시하여 문제를 입력하세요"
						multiline
						required
					/>

					{/* 문제 미리보기 */}
					{data.content && (
						<div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
							<h4 className="mb-2 text-sm font-medium text-blue-800">
								문제 미리보기
							</h4>
							{renderContentWithBlanks()}
						</div>
					)}
				</div>

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
							정답 <span className="text-danger-50">*</span>
							<span className="ml-2 text-gray-40 typo-body-small">
								(빈칸별로 여러 표현 방식을 등록할 수 있습니다)
							</span>
						</h4>
						<button
							type="button"
							onClick={addNewAnswerConcept}
							className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-100"
						>
							<Plus size={16} />새 빈칸 정답 추가
						</button>
					</div>

					<div className="space-y-6">
						{Object.entries(getAnswersByNumber())
							.sort(([a], [b]) => parseInt(a) - parseInt(b))
							.map(([number, answers]) => (
								<div
									key={number}
									className="rounded-lg border border-gray-200 bg-gray-5 p-4"
								>
									<div className="mb-3 flex items-center justify-between">
										<h5 className="font-medium text-gray-800">
											빈칸 #{number} 정답
										</h5>
										<button
											type="button"
											onClick={() => addAlternativeAnswer(parseInt(number))}
											className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
										>
											<Plus size={12} />
											대안 표현 추가
										</button>
									</div>

									<div className="space-y-2">
										{answers.map((answer) => (
											<div
												key={answer.originalIndex}
												className="flex items-center gap-3 rounded-md border border-gray-300 bg-white p-3"
											>
												<button
													type="button"
													onClick={() => setMainAnswer(answer.originalIndex)}
													className={`rounded-md p-1 transition-colors ${
														answer.main
															? "bg-yellow-50 text-yellow-600"
															: "text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"
													}`}
													title={
														answer.main
															? "주 정답 (의도된 답)"
															: "주 정답으로 설정"
													}
												>
													<Star
														size={16}
														fill={answer.main ? "currentColor" : "none"}
													/>
												</button>

												<div className="flex-1">
													<input
														type="text"
														value={answer.answer || ""}
														onChange={(e) =>
															updateAnswer(answer.originalIndex, {
																answer: e.target.value,
															})
														}
														placeholder={
															answer.main
																? "주 정답 (의도된 표현)"
																: "대안 표현"
														}
														className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
														required
													/>
													{answer.main && (
														<p className="mt-1 text-xs text-blue-600">
															출제자가 의도한 주 정답
														</p>
													)}
												</div>

												{answers.length > 1 && (
													<button
														type="button"
														onClick={() => removeAnswer(answer.originalIndex)}
														className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
													>
														<Trash2 size={16} />
													</button>
												)}
											</div>
										))}
									</div>
								</div>
							))}
					</div>

					{data.fillBlankAnswers.length === 0 && (
						<div className="py-8 text-center text-sm text-gray-500">
							<p className="mb-2">아직 빈칸 정답이 없습니다</p>
							<p className="text-xs">
								"새 빈칸 정답 추가" 버튼을 클릭하여 정답을 등록해보세요
							</p>
						</div>
					)}

					{data.fillBlankAnswers.length > 0 && (
						<div className="mt-4 rounded-md bg-info-5 p-3">
							<p className="text-sm text-info-60">
								💡 빈칸 문제는 문제 내용에서 _____로 표시된 부분에 학습자가 답을
								입력하는 형태입니다. 각 빈칸별로 여러 정답을 등록할 수 있습니다.
							</p>
						</div>
					)}
				</div>
			</div>
		</QuestionFormBase>
	);
};

export default FillBlankQuestionForm;
