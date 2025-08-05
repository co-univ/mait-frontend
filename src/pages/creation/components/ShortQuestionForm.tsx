import { Plus, Star, Trash2 } from "lucide-react";
import type { ShortAnswerDto } from "@/types";
import type { ShortQuestionFormData } from "@/pages/creation/types";
import FormInput from "@/pages/creation/components/FormInput";
import QuestionFormBase from "@/pages/creation/components/QuestionFormBase";

//
//
//

/**
 * ShortQuestionForm 컴포넌트 - 주관식 문제 작성을 위한 폼 컴포넌트
 * 다중 정답 입력, 주 정답 설정, 문제 내용 및 해설 입력 기능 제공
 */
interface ShortQuestionFormProps {
  data: ShortQuestionFormData;
  onChange: (data: ShortQuestionFormData) => void;
  disabled?: boolean;
}

//
//
//

/**
 * 주관식 문제 폼 컴포넌트
 * @param data - 현재 주관식 문제 데이터
 * @param onChange - 문제 데이터 변경 시 호출되는 콜백 함수
 */
const ShortQuestionForm = ({
  data,
  onChange,
  disabled = false,
}: ShortQuestionFormProps) => {
  // 문제 데이터 필드 업데이트 함수
  const updateField = (
    field: keyof ShortQuestionFormData,
    value: string | ShortAnswerDto[],
  ) => {
    onChange({ ...data, [field]: value });
  };

  // 새로운 정답 개념 추가 (새로운 number)
  const addNewAnswerConcept = () => {
    const maxNumber =
      data.shortAnswers.length > 0
        ? Math.max(...data.shortAnswers.map((a) => a.number))
        : 0;
    const newAnswer: ShortAnswerDto = {
      answer: "",
      number: maxNumber + 1,
      main: true, // 새 개념의 첫 번째 답안은 주 정답
    };
    updateField("shortAnswers", [...data.shortAnswers, newAnswer]);
  };

  // 기존 정답 개념에 대안 표현 추가 (같은 number)
  const addAlternativeAnswer = (conceptNumber: number) => {
    const newAnswer: ShortAnswerDto = {
      answer: "",
      number: conceptNumber,
      main: false, // 대안 표현은 주 정답이 아님
    };
    updateField("shortAnswers", [...data.shortAnswers, newAnswer]);
  };

  const updateAnswer = (index: number, updates: Partial<ShortAnswerDto>) => {
    const updatedAnswers = data.shortAnswers.map((answer, i) =>
      i === index ? { ...answer, ...updates } : answer,
    );
    updateField("shortAnswers", updatedAnswers);
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = data.shortAnswers.filter((_, i) => i !== index);
    // 주 정답이 삭제된 경우 첫 번째 답안을 주 정답으로 설정
    if (updatedAnswers.length > 0 && !updatedAnswers.some((a) => a.main)) {
      updatedAnswers[0].main = true;
    }
    updateField("shortAnswers", updatedAnswers);
  };

  const setMainAnswer = (index: number) => {
    const selectedAnswer = data.shortAnswers[index];
    const updatedAnswers = data.shortAnswers.map((answer, i) => ({
      ...answer,
      // 같은 number를 가진 답안들 중에서만 main을 변경
      main: answer.number === selectedAnswer.number ? i === index : answer.main,
    }));
    updateField("shortAnswers", updatedAnswers);
  };

  // number별로 답안들을 그룹화하는 헬퍼 함수
  const getAnswersByNumber = () => {
    const groups: {
      [key: number]: (ShortAnswerDto & { originalIndex: number })[];
    } = {};
    data.shortAnswers.forEach((answer, index) => {
      if (!groups[answer.number]) {
        groups[answer.number] = [];
      }
      groups[answer.number].push({ ...answer, originalIndex: index });
    });
    return groups;
  };

  return (
    <QuestionFormBase
      title="주관식 문제"
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
              정답 <span className="text-danger-50">*</span>
              <span className="ml-2 text-gray-40 typo-body-small">
                (개념별로 여러 표현 방식을 등록할 수 있습니다)
              </span>
            </h4>
            <button
              type="button"
              onClick={addNewAnswerConcept}
              className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-100"
            >
              <Plus size={16} />새 정답 개념 추가
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
                      정답 개념 #{number}
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

          {data.shortAnswers.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              <p className="mb-2">아직 정답이 없습니다</p>
              <p className="text-xs">
                "새 정답 개념 추가" 버튼을 클릭하여 정답을 등록해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </QuestionFormBase>
  );
};

export default ShortQuestionForm;
