import type {
	FillBlankAnswerDto,
	MultipleChoiceDto,
	OrderingQuestionOptionDto,
	ShortAnswerDto,
} from "@/types";

/**
 * creation 폴더에서 사용되는 TypeScript 타입 정의
 * 문제 생성 시스템에서 사용되는 모든 타입과 인터페이스를 정의
 */

// 지원되는 문제 유형들
export type QuestionType = "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK";

// 생성 모드 - 새로 만들기 또는 기존 문제 편집
export type CreationMode = "create" | "edit";

/**
 * 문제 생성 상태 인터페이스 - 현재 생성/편집 모드와 관련 정보
 */
export interface CreationState {
	mode: CreationMode;
	questionSetId?: number;
	questionSet?: {
		subject: string;
		creationType: "MANUAL";
	};
}

/**
 * 모든 문제 유형에서 공통으로 사용되는 기본 문제 데이터
 */
export interface QuestionFormData {
	id?: string;
	type: QuestionType;
	content: string;
	explanation: string;
	number: number;
	isSaved?: boolean; // 서버에 저장되었는지 여부
	questionId?: string; // 서버에서 받은 문제 ID (저장 후 업데이트용)
	hasChanges?: boolean; // 마지막 저장 이후 변경사항이 있는지 여부
}

/**
 * 객관식 문제 폼 데이터 - 선택지와 정답 선택 정보 포함
 */
export interface MultipleQuestionFormData extends QuestionFormData {
	type: "MULTIPLE";
	choices: MultipleChoiceDto[];
}

/**
 * 주관식 문제 폼 데이터 - 다중 정답과 주 정답 정보 포함
 */
export interface ShortQuestionFormData extends QuestionFormData {
	type: "SHORT";
	shortAnswers: ShortAnswerDto[];
}

/**
 * 순서배치 문제 폼 데이터 - 순서 옵션과 정답 순서 정보 포함
 */
export interface OrderingQuestionFormData extends QuestionFormData {
	type: "ORDERING";
	options: OrderingQuestionOptionDto[];
}

/**
 * 빈칸 문제 폼 데이터 - 빈칸 정답과 주 정답 정보 포함
 */
export interface FillBlankQuestionFormData extends QuestionFormData {
	type: "FILL_BLANK";
	fillBlankAnswers: FillBlankAnswerDto[];
}

/**
 * 모든 문제 유형을 포함하는 유니온 타입
 * 문제 유형에 관계없이 사용할 수 있는 공통 타입
 */
export type AnyQuestionFormData =
	| MultipleQuestionFormData
	| ShortQuestionFormData
	| OrderingQuestionFormData
	| FillBlankQuestionFormData;

/**
 * 타입 가드 함수들 - 런타임에 문제 유형을 안전하게 판별하기 위해 사용
 */

/**
 * 객관식 문제 여부를 확인하는 타입 가드
 */
export const isMultipleQuestion = (
	question: AnyQuestionFormData,
): question is MultipleQuestionFormData => {
	return question.type === "MULTIPLE";
};

/**
 * 주관식 문제 여부를 확인하는 타입 가드
 */
export const isShortQuestion = (
	question: AnyQuestionFormData,
): question is ShortQuestionFormData => {
	return question.type === "SHORT";
};

/**
 * 순서배치 문제 여부를 확인하는 타입 가드
 */
export const isOrderingQuestion = (
	question: AnyQuestionFormData,
): question is OrderingQuestionFormData => {
	return question.type === "ORDERING";
};

/**
 * 빈칸 문제 여부를 확인하는 타입 가드
 */
export const isFillBlankQuestion = (
	question: AnyQuestionFormData,
): question is FillBlankQuestionFormData => {
	return question.type === "FILL_BLANK";
};
