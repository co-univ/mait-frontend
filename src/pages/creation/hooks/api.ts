import type {
  ApiResponseCreateQuestionSetApiResponse,
  ApiResponseListQuestionSetApiResponse,
  CreateFillBlankQuestionApiRequest,
  CreateMultipleQuestionApiRequest,
  CreateOrderingQuestionApiRequest,
  CreateQuestionSetApiRequest,
  CreateShortQuestionApiRequest,
} from "@/types";

//
//
//

// Base API configuration
const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

//
//
//

/**
 * API 클라이언트 클래스 - 문제 세트와 문제 생성/수정을 위한 HTTP 요청 처리
 * 오류 처리와 인증 헤더 관리를 포함한 안전한 API 통신을 제공
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 공통 HTTP 요청 처리 메소드
   * @param endpoint - 요청할 API 엔드포인트 URL
   * @param options - fetch API 옵션 (method, headers, body 등)
   * @returns API 응답 데이터
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Question Set APIs
  /**
   * 문제 세트 목록을 조회하는 API 호출
   * @param teamId - 조회할 팀의 ID
   * @returns 문제 세트 목록
   */
  async getQuestionSets(
    teamId: number,
  ): Promise<ApiResponseListQuestionSetApiResponse> {
    return this.request(`/api/v1/question-sets?teamId=${teamId}`, {
      method: "GET",
    });
  }

  /**
   * 새로운 문제 세트를 생성하는 API 호출
   * @param data - 문제 세트 생성 요청 데이터 (주제, 생성 방식 등)
   * @returns 생성된 문제 세트 정보 (문제 세트 ID 포함)
   */
  async createQuestionSet(
    data: CreateQuestionSetApiRequest,
  ): Promise<ApiResponseCreateQuestionSetApiResponse> {
    return this.request("/api/v1/question-sets", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * 기존 문제 세트를 업데이트하는 API 호출
   * @param questionSetId - 업데이트할 문제 세트의 ID
   * @param data - 업데이트할 문제 세트 데이터
   * @returns 업데이트된 문제 세트 정보
   */
  async updateQuestionSet(
    questionSetId: number,
    data: CreateQuestionSetApiRequest,
  ): Promise<ApiResponseCreateQuestionSetApiResponse> {
    return this.request(`/api/v1/question-sets/${questionSetId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Question APIs
  /**
   * 새로운 문제를 생성하는 API 호출
   * @param questionSetId - 문제가 속할 문제 세트의 ID
   * @param type - 문제 유형 (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
   * @param data - 문제 데이터 (내용, 선택지, 정답 등)
   * @returns 생성된 문제 정보
   */
  async createQuestion(
    questionSetId: number,
    type: "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK",
    data:
      | CreateMultipleQuestionApiRequest
      | CreateShortQuestionApiRequest
      | CreateOrderingQuestionApiRequest
      | CreateFillBlankQuestionApiRequest,
  ): Promise<void> {
    return this.request(
      `/api/v1/question-sets/${questionSetId}/questions?type=${type}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  /**
   * 기존 문제를 업데이트하는 API 호출
   * @param questionSetId - 문제가 속한 문제 세트의 ID
   * @param questionId - 업데이트할 문제의 ID
   * @param type - 문제 유형 (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
   * @param data - 업데이트할 문제 데이터
   * @returns 업데이트된 문제 정보
   */
  async updateQuestion(
    questionSetId: number,
    questionId: number,
    type: "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK",
    data:
      | CreateMultipleQuestionApiRequest
      | CreateShortQuestionApiRequest
      | CreateOrderingQuestionApiRequest
      | CreateFillBlankQuestionApiRequest,
  ): Promise<void> {
    return this.request(
      `/api/v1/question-sets/${questionSetId}/questions/${questionId}?type=${type}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
  }
}

// 전역에서 사용할 API 클라이언트 인스턴스
export const apiClient = new ApiClient();
