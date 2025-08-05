import { Plus, Save } from "lucide-react";
import { useState } from "react";
import type {
  CreateFillBlankQuestionApiRequest,
  CreateMultipleQuestionApiRequest,
  CreateOrderingQuestionApiRequest,
  CreateShortQuestionApiRequest,
} from "@/types";
import FillBlankQuestionForm from "../components/FillBlankQuestionForm";
import FormInput from "../components/FormInput";
import MultipleQuestionForm from "../components/MultipleQuestionForm";
import OrderingQuestionForm from "../components/OrderingQuestionForm";
import ShortQuestionForm from "../components/ShortQuestionForm";
import { useCreateQuestion } from "../hooks/useQuestion";
import { useCreateQuestionSet, useQuestionSets } from "../hooks/useQuestionSet";
import type {
  AnyQuestionFormData,
  CreationState,
  FillBlankQuestionFormData,
  MultipleQuestionFormData,
  OrderingQuestionFormData,
  QuestionType,
  ShortQuestionFormData,
} from "../types";

//
//
//

/**
 * QuestionCreation 컴포넌트 - 문제 세트와 문제들을 생성/편집하는 메인 페이지
 * TanStack Query를 사용하여 API 요청을 처리하고, 다양한 문제 유형의 생성을 지원
 */
interface QuestionCreationProps {
  initialState?: CreationState;
}

//
//
//

/**
 * 문제 생성/편집 메인 컴포넌트
 * @param initialState - 초기 상태 (새로 생성 또는 기존 문제 세트 편집)
 */
const QuestionCreation = ({ initialState }: QuestionCreationProps) => {
  // 문제 생성 상태 관리 - 퀴즈 셋 생성 전/후 구분
  const [creationState, setCreationState] = useState<CreationState>(
    initialState || { mode: "create" },
  );

  // 퀴즈 셋이 생성되었는지 여부
  const [isQuestionSetCreated, setIsQuestionSetCreated] = useState(false);

  // 선택 모드: 'create' = 새로 생성, 'select' = 기존 선택
  const [selectionMode, setSelectionMode] = useState<"create" | "select">(
    "select",
  );

  // 문제 세트 기본 정보 관리 (주제만 관리, 생성 방식은 항상 수동)
  const [questionSet, setQuestionSet] = useState({
    subject: "",
    creationType: "MANUAL" as const,
  });

  // 임시로 teamId 1 사용 (나중에 실제 팀 정보로 대체)
  const teamId = 1;

  // 기존 문제 세트 목록 조회
  const { data: questionSetsData, isLoading: isLoadingQuestionSets } =
    useQuestionSets(teamId);

  // 만들어지는 문제들의 목록 관리
  const [questions, setQuestions] = useState<AnyQuestionFormData[]>([]);

  // TanStack Query 뮤테이션 훅들 - API 호출과 케시 관리
  const createQuestionSet = useCreateQuestionSet();
  const createQuestion = useCreateQuestion();
  // const updateQuestion = useUpdateQuestion(); // PUT API가 구현되지 않으므로 주석 처리

  // 다양한 로딩 상태들을 개별적으로 처리

  /**
   * 문제 유형별 기본 문제 데이터를 생성하는 함수
   * @param type - 문제 유형 (MULTIPLE, SHORT, ORDERING)
   * @param number - 문제 번호
   * @returns 기본값이 설정된 문제 데이터
   */
  const createDefaultQuestion = (
    type: QuestionType,
    number: number,
  ): AnyQuestionFormData => {
    const base = {
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: "",
      explanation: "",
      number,
      isSaved: false,
      hasChanges: false,
    };

    switch (type) {
      case "MULTIPLE":
        return {
          ...base,
          type: "MULTIPLE",
          choices: [],
        } as MultipleQuestionFormData;
      case "SHORT":
        return {
          ...base,
          type: "SHORT",
          shortAnswers: [],
        } as ShortQuestionFormData;
      case "ORDERING":
        return {
          ...base,
          type: "ORDERING",
          options: [],
        } as OrderingQuestionFormData;
      case "FILL_BLANK":
        return {
          ...base,
          type: "FILL_BLANK",
          fillBlankAnswers: [],
        } as FillBlankQuestionFormData;
    }
  };

  /**
   * 새로운 문제를 추가하고 즉시 저장하는 함수
   * @param type - 추가할 문제 유형
   */
  const addQuestion = (type: QuestionType) => {
    if (!isQuestionSetCreated || !creationState.questionSetId) {
      alert("먼저 퀴즈 셋을 생성해주세요.");
      return;
    }

    const newQuestion = createDefaultQuestion(type, questions.length + 1);
    // 로컬 상태에 추가 (사용자가 내용을 입력하는 순간 자동 저장)
    setQuestions([...questions, newQuestion]);
  };

  /**
   * 문제 내용을 수정했을 때 로컬 상태만 업데이트하는 함수
   * 저장된 문제는 수정 불가능
   */
  const handleUpdateQuestion = (
    index: number,
    questionData: AnyQuestionFormData,
  ) => {
    // 저장된 문제는 수정 불가능
    if (questionData.isSaved) {
      return;
    }

    // 저장되지 않은 문제만 수정 가능
    const updatedQuestion = {
      ...questionData,
      hasChanges: false, // 변경사항 플래그는 더 이상 사용하지 않음
    };
    // 로컬 상태만 업데이트
    updateQuestionData(index, updatedQuestion);
  };

  // 특정 인덱스의 문제 데이터를 업데이트하는 함수
  const updateQuestionData = (
    index: number,
    questionData: AnyQuestionFormData,
  ) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? questionData : q,
    );
    setQuestions(updatedQuestions);
  };

  /**
   * 지정된 인덱스의 문제를 삭제하고 번호 재정렬
   * @param index - 삭제할 문제의 인덱스
   */
  const removeQuestion = (index: number) => {
    const updatedQuestions = questions
      .filter((_, i) => i !== index)
      .map((q, i) => ({ ...q, number: i + 1 }));
    setQuestions(updatedQuestions);
  };

  /**
   * 폼 데이터를 API 요청 형식으로 변환하는 함수
   * @param question - 변환할 문제 폼 데이터
   * @returns API 요청에 맞는 형식의 데이터
   */
  const convertToApiRequest = (
    question: AnyQuestionFormData,
  ):
    | CreateMultipleQuestionApiRequest
    | CreateShortQuestionApiRequest
    | CreateOrderingQuestionApiRequest
    | CreateFillBlankQuestionApiRequest => {
    switch (question.type) {
      case "MULTIPLE":
        return {
          type: "MULTIPLE" as any, // 서버 API 명세에 맞춰 간단한 타입 이름 사용
          content: question.content,
          explanation: question.explanation,
          number: question.number,
          choices: question.choices,
        };
      case "SHORT":
        return {
          type: "SHORT" as any, // 서버 API 명세에 맞춰 간단한 타입 이름 사용
          content: question.content,
          explanation: question.explanation,
          number: question.number,
          shortAnswers: question.shortAnswers,
        };
      case "ORDERING":
        return {
          type: "ORDERING" as any, // 서버 API 명세에 맞춰 간단한 타입 이름 사용
          content: question.content,
          explanation: question.explanation,
          number: question.number,
          options: question.options,
        };
      case "FILL_BLANK":
        return {
          type: "FILL_BLANK" as any, // 서버 API 명세에 맞춰 간단한 타입 이름 사용
          content: question.content,
          explanation: question.explanation,
          number: question.number,
          fillBlankAnswers: question.fillBlankAnswers,
        };
    }
  };

  /**
   * 기존 퀴즈 셋을 선택하는 함수
   */
  const handleSelectQuestionSet = (questionSetId: number, subject: string) => {
    setCreationState({
      mode: "edit",
      questionSetId: questionSetId,
      questionSet: { subject, creationType: "MANUAL" },
    });
    setQuestionSet({ subject, creationType: "MANUAL" });
    setIsQuestionSetCreated(true);
  };

  /**
   * 퀴즈 셋을 먼저 생성하는 함수
   * 주제 입력 후 퀴즈 셋 생성 버튼을 클릭했을 때 호출
   */
  const handleCreateQuestionSet = async () => {
    if (!questionSet.subject.trim()) {
      alert("주제를 입력해주세요.");
      return;
    }

    try {
      const result = await createQuestionSet.mutateAsync(questionSet);
      if (result.data?.questionSetId) {
        setCreationState({
          ...creationState,
          mode: "edit",
          questionSetId: result.data.questionSetId,
        });
        setIsQuestionSetCreated(true);
        alert("퀴즈 셋이 생성되었습니다! 이제 문제를 추가해보세요.");
      }
    } catch (error) {
      console.error("퀴즈 셋 생성 실패:", error);
      alert("퀴즈 셋 생성에 실패했습니다.");
    }
  };

  /**
   * 새로운 문제를 서버에 생성하는 함수 (POST)
   */
  const handleCreateQuestion = async (
    question: AnyQuestionFormData,
    index: number,
  ) => {
    if (!creationState.questionSetId) {
      alert("먼저 퀴즈 셋을 생성해주세요.");
      return;
    }

    try {
      const apiRequestData = convertToApiRequest(question);
      await createQuestion.mutateAsync({
        questionSetId: creationState.questionSetId,
        type: question.type,
        data: apiRequestData,
      });

      // 저장 성공 시 로컬 상태 업데이트
      const updatedQuestions = [...questions];
      updatedQuestions[index] = {
        ...question,
        isSaved: true,
        questionId: `temp-${Date.now()}`,
        hasChanges: false, // 저장 후 변경사항 플래그 리셋
      };
      setQuestions(updatedQuestions);

      alert("문제가 생성되었습니다!");
    } catch (error) {
      console.error("문제 생성 실패:", error);
      alert("문제 생성에 실패했습니다.");
    }
  };

  /**
   * 문제 삭제 함수 (클라이언트에서만 처리, 서버 API는 추후 구현 예정)
   */
  const handleDeleteQuestion = async (index: number) => {
    const question = questions[index];

    if (!question.isSaved) {
      // 저장되지 않은 문제는 바로 삭제
      removeQuestion(index);
      return;
    }

    if (
      confirm("저장된 문제를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      try {
        // TODO: 실제 DELETE API가 구현되면 아래 주석을 해제하고 사용
        /*
				if (question.questionId && creationState.questionSetId) {
					await deleteQuestion.mutateAsync({
						questionSetId: creationState.questionSetId,
						questionId: parseInt(question.questionId)
					});
				}
				*/

        // 현재는 클라이언트에서만 삭제 처리
        console.log("DELETE API 호출 예정:", {
          questionSetId: creationState.questionSetId,
          questionId: question.questionId,
        });

        removeQuestion(index);
        alert("문제가 삭제되었습니다.");
      } catch (error) {
        console.error("문제 삭제 실패:", error);
        alert("문제 삭제에 실패했습니다.");
      }
    }
  };

  /**
   * 문제에 내용이 있는지 확인하는 헬퍼 함수
   */
  const hasQuestionContent = (question: AnyQuestionFormData): boolean => {
    if (!question.content.trim()) return false;

    switch (question.type) {
      case "MULTIPLE":
        return question.choices.some((choice) => choice.content.trim());
      case "SHORT":
        return question.shortAnswers.some((answer) => answer.answer?.trim());
      case "ORDERING":
        return question.options.some((option) => option.content.trim());
      case "FILL_BLANK":
        return question.fillBlankAnswers.some((answer) =>
          answer.answer?.trim(),
        );
      default:
        return false;
    }
  };

  /**
   * 저장 버튼 클릭 시 호출되는 함수
   * POST로만 저장하며, 저장 후에는 수정 불가능
   */
  const handleSaveQuestionButton = async (
    question: AnyQuestionFormData,
    index: number,
  ) => {
    if (question.isSaved) {
      // 이미 저장된 문제는 수정 불가능
      alert("저장된 문제는 수정할 수 없습니다. 삭제 후 다시 생성해주세요.");
      return;
    }

    // 새 문제만 POST로 생성 가능
    await handleCreateQuestion(question, index);
  };

  /**
   * 문제 유형에 따라 적절한 폼 컴포넌트를 렌더링하는 함수
   * @param question - 렌더링할 문제 데이터
   * @param index - 문제의 인덱스
   * @returns 문제 유형에 맞는 폼 컴포넌트
   */
  const renderQuestionForm = (question: AnyQuestionFormData, index: number) => {
    switch (question.type) {
      case "MULTIPLE":
        return (
          <MultipleQuestionForm
            key={index}
            data={question}
            onChange={(data) => handleUpdateQuestion(index, data)}
            disabled={question.isSaved}
          />
        );
      case "SHORT":
        return (
          <ShortQuestionForm
            key={index}
            data={question}
            onChange={(data) => handleUpdateQuestion(index, data)}
            disabled={question.isSaved}
          />
        );
      case "ORDERING":
        return (
          <OrderingQuestionForm
            key={index}
            data={question}
            onChange={(data) => handleUpdateQuestion(index, data)}
            disabled={question.isSaved}
          />
        );
      case "FILL_BLANK":
        return (
          <FillBlankQuestionForm
            key={index}
            data={question}
            onChange={(data) => handleUpdateQuestion(index, data)}
            disabled={question.isSaved}
          />
        );
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl space-y-8 bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {!isQuestionSetCreated ? "퀴즈 셋 생성" : "문제 추가"}
        </h1>
        {isQuestionSetCreated && (
          <div className="text-sm text-gray-600">
            퀴즈 셋: <span className="font-medium">{questionSet.subject}</span>
          </div>
        )}
      </div>

      {/* 퀴즈 셋 선택/생성 영역 */}
      {!isQuestionSetCreated ? (
        <div className="space-y-6">
          {/* 선택 모드 토글 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              퀴즈 셋 선택
            </h2>
            <div className="mb-6 flex gap-4">
              <button
                type="button"
                onClick={() => setSelectionMode("select")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectionMode === "select"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                기존 퀴즈 셋 선택
              </button>
              <button
                type="button"
                onClick={() => setSelectionMode("create")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectionMode === "create"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                새 퀴즈 셋 생성
              </button>
            </div>

            {selectionMode === "select" ? (
              /* 기존 퀴즈 셋 선택 */
              <div>
                {isLoadingQuestionSets ? (
                  <div className="py-8 text-center text-gray-500">
                    퀴즈 셋 목록을 불러오는 중...
                  </div>
                ) : questionSetsData?.data &&
                  questionSetsData.data.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="mb-3 text-lg font-medium text-gray-800">
                      기존 퀴즈 셋 목록
                    </h3>
                    <div className="grid gap-3">
                      {questionSetsData.data.map((questionSetItem) => (
                        <button
                          key={questionSetItem.id}
                          type="button"
                          onClick={() =>
                            handleSelectQuestionSet(
                              questionSetItem.id,
                              questionSetItem.subject || "제목 없음",
                            )
                          }
                          className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {questionSetItem.subject || "제목 없음"}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                생성일:{" "}
                                {new Date(
                                  questionSetItem.createdAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {questionSetItem.id}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p className="mb-2">생성된 퀴즈 셋이 없습니다</p>
                    <p className="text-sm">새 퀴즈 셋을 생성해보세요</p>
                  </div>
                )}
              </div>
            ) : (
              /* 새 퀴즈 셋 생성 */
              <div className="max-w-md space-y-4">
                <FormInput
                  label="주제"
                  value={questionSet.subject}
                  onChange={(value) =>
                    setQuestionSet({ ...questionSet, subject: value })
                  }
                  placeholder="퀴즈 셋의 주제를 입력하세요 (예: JavaScript 기초, 수학 공식 등)"
                  required
                />
                <button
                  type="button"
                  onClick={handleCreateQuestionSet}
                  disabled={
                    createQuestionSet.isPending || !questionSet.subject.trim()
                  }
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={16} />
                  {createQuestionSet.isPending ? "생성 중..." : "퀴즈 셋 생성"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 문제 추가 단계 */}
          {/* 문제 추가 버튼들 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              문제 추가
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => addQuestion("MULTIPLE")}
                disabled={createQuestion.isPending}
                className="flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                객관식 추가
              </button>
              <button
                type="button"
                onClick={() => addQuestion("SHORT")}
                disabled={createQuestion.isPending}
                className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                주관식 추가
              </button>
              <button
                type="button"
                onClick={() => addQuestion("ORDERING")}
                disabled={createQuestion.isPending}
                className="flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                순서배치 추가
              </button>
              <button
                type="button"
                onClick={() => addQuestion("FILL_BLANK")}
                disabled={createQuestion.isPending}
                className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-600 transition-colors hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                빈칸 문제 추가
              </button>
            </div>
          </div>

          {/* 문제 목록 */}
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id || `question-${index}`}
                className="relative"
              >
                {renderQuestionForm(question, index)}

                {/* 저장 버튼과 삭제 버튼 */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  {!question.isSaved ? (
                    // 저장되지 않은 문제: 저장 버튼 표시
                    <button
                      type="button"
                      onClick={() => handleSaveQuestionButton(question, index)}
                      disabled={
                        createQuestion.isPending ||
                        !hasQuestionContent(question)
                      }
                      className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Save size={14} />
                      저장
                    </button>
                  ) : (
                    // 저장된 문제: 저장 완료 표시
                    <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      <Save size={14} />
                      저장됨
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(index)}
                    className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                    title="문제 삭제"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            {questions.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <p className="mb-2 text-lg">아직 문제가 없습니다</p>
                <p className="text-sm">
                  위의 버튼을 클릭하여 문제를 추가해보세요
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionCreation;
