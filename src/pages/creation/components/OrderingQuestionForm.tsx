import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { OrderingQuestionOptionDto } from "@/types";
import type { OrderingQuestionFormData } from "@/pages/creation/types";
import FormInput from "@/pages/creation/components/FormInput";
import QuestionFormBase from "@/pages/creation/components/QuestionFormBase";

//
//
//

/**
 * OrderingQuestionForm 컴포넌트 - 순서배치 문제 작성을 위한 폼 컴포넌트
 * 옵션 추가/삭제, 순서 조정, 정답 순서 설정 기능 제공
 */
interface OrderingQuestionFormProps {
  data: OrderingQuestionFormData;
  onChange: (data: OrderingQuestionFormData) => void;
  disabled?: boolean;
}

//
//
//

/**
 * 순서배치 문제 폼 컴포넌트
 * @param data - 현재 순서배치 문제 데이터
 * @param onChange - 문제 데이터 변경 시 호출되는 콜백 함수
 */
const OrderingQuestionForm = ({
  data,
  onChange,
  disabled = false,
}: OrderingQuestionFormProps) => {
  // 문제 데이터 필드 업데이트 함수
  const updateField = (
    field: keyof OrderingQuestionFormData,
    value: string | OrderingQuestionOptionDto[],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addOption = () => {
    const newOption: OrderingQuestionOptionDto = {
      originOrder: data.options.length + 1,
      content: "",
      answerOrder: data.options.length + 1,
    };
    updateField("options", [...data.options, newOption]);
  };

  const updateOption = (
    index: number,
    updates: Partial<OrderingQuestionOptionDto>,
  ) => {
    const updatedOptions = data.options.map((option, i) =>
      i === index ? { ...option, ...updates } : option,
    );
    updateField("options", updatedOptions);
  };

  const removeOption = (index: number) => {
    const updatedOptions = data.options
      .filter((_, i) => i !== index)
      .map((option, i) => ({
        ...option,
        originOrder: i + 1,
      }));
    updateField("options", updatedOptions);
  };

  const moveOption = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.options.length) return;

    const updatedOptions = [...data.options];
    [updatedOptions[index], updatedOptions[newIndex]] = [
      updatedOptions[newIndex],
      updatedOptions[index],
    ];

    // originOrder 재정렬
    updatedOptions.forEach((option, i) => {
      option.originOrder = i + 1;
    });

    updateField("options", updatedOptions);
  };

  const updateAnswerOrder = (index: number, answerOrder: number) => {
    updateOption(index, { answerOrder });
  };

  return (
    <QuestionFormBase
      title="순서배치 문제"
      questionNumber={data.number}
      questionType={data.type}
      disabled={disabled}
    >
      <div className="space-y-6">
        <FormInput
          label="문제 내용"
          value={data.content}
          onChange={(value) => updateField("content", value)}
          placeholder="올바른 순서로 배치하세요"
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
              배치 옵션 <span className="text-danger-50">*</span>
              <span className="ml-2 text-gray-40 typo-body-small">
                (왼쪽 숫자는 정답 순서입니다)
              </span>
            </h4>
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-gap-2 rounded-medium1 bg-primary-5 px-padding-4 py-padding-2 text-primary-50 typo-body-small hover:bg-primary-10"
            >
              <Plus size={16} />
              옵션 추가
            </button>
          </div>

          <div className="space-y-3">
            {data.options.map((option, index) => (
              <div
                key={option.id || index}
                className="flex items-center gap-gap-3 rounded-medium1 border border-gray-20 p-padding-4"
              >
                <div className="flex flex-col gap-gap-1">
                  <button
                    type="button"
                    onClick={() => moveOption(index, "up")}
                    disabled={index === 0}
                    className="p-padding-1 text-gray-40 hover:text-gray-60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveOption(index, "down")}
                    disabled={index === data.options.length - 1}
                    className="p-padding-1 text-gray-40 hover:text-gray-60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                <input
                  type="number"
                  min="1"
                  max={data.options.length}
                  value={option.answerOrder}
                  onChange={(e) =>
                    updateAnswerOrder(index, Number.parseInt(e.target.value))
                  }
                  className="w-56 rounded-small1 border border-gray-30 px-padding-2 py-padding-2 text-center text-black typo-body-medium focus:border-primary-50 focus:outline-none"
                  title="정답 순서"
                />

                <input
                  type="text"
                  value={option.content}
                  onChange={(e) =>
                    updateOption(index, { content: e.target.value })
                  }
                  placeholder={`옵션 ${index + 1}`}
                  className="flex-1 rounded-small1 border border-gray-30 px-padding-3 py-padding-2 text-black typo-body-medium focus:border-primary-50 focus:outline-none"
                  required
                />

                {data.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="rounded-small1 p-padding-2 text-danger-50 hover:bg-danger-5"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {data.options.length === 0 && (
            <div className="py-8 text-center text-gray-40 typo-body-medium">
              배치 옵션을 추가해주세요
            </div>
          )}

          {data.options.length > 0 && (
            <div className="mt-4 rounded-medium1 bg-info-5 p-padding-3">
              <p className="text-info-60 typo-body-small">
                💡 학습자는 이 옵션들을 드래그하여 올바른 순서로 배치해야
                합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </QuestionFormBase>
  );
};

export default OrderingQuestionForm;
