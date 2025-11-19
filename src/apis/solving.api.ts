import type {
	ApiResponseCreateQuestionSetApiResponse,
	ApiResponseCurrentQuestionApiResponse,
	ApiResponseListQuestionApiResponse,
	ApiResponseListQuestionSetApiResponse,
	ApiResponseQuestionAnswerSubmitApiResponse,
	ApiResponseQuestionApiResponse,
	ApiResponseQuestionSetApiResponse,
	CreateFillBlankQuestionApiRequest,
	CreateMultipleQuestionApiRequest,
	CreateOrderingQuestionApiRequest,
	CreateQuestionSetApiRequest,
	CreateShortQuestionApiRequest,
	QuestionAnswerSubmitApiRequest,
} from "@/types";

//
//
//

const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

//
//
//

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

	/**
	 * 문제 셋 단건 조회
	 * @param questionSetId - 조회할 문제 셋의 ID
	 * @returns 문제 셋 정보
	 */
	async getQuestionSet(
		questionSetId: number,
	): Promise<ApiResponseQuestionSetApiResponse> {
		return this.request(`/api/v1/question-sets/${questionSetId}`);
	}

	/**
	 * 실시간 진행 중인 문제 상태 조회
	 * @param questionSetId - 문제가 속한 문제 셋의 ID
	 * @returns 현재 문제 상태
	 */
	async getQuestionSetStatus(
		questionSetId: number,
	): Promise<ApiResponseCurrentQuestionApiResponse> {
		return this.request(`/api/v1/question-sets/${questionSetId}/live-status/current-question`);
	}

	/**
	 * 문제 조회
	 * @param questionSetId - 문제가 속한 문제 셋의 ID
	 * @param questionId - 조회할 문제의 ID
	 * @returns 문제 정보
	 */
	async getQuestionSetsQuestions(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseQuestionApiResponse> {
		return this.request(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}`,
		);
	}

	/**
	 * 문제 풀이 정답 제출
	 * @param questionSetId - 문제가 속한 문제 셋의 ID
	 * @param questionId - 제출할 문제의 ID
	 * @param data - 제출할 답안 데이터
	 * @returns 제출 결과
	 */
	async postQuestionSetsQuestionsSubmit(
		questionSetId: number,
		questionId: number,
		data: QuestionAnswerSubmitApiRequest,
	): Promise<ApiResponseQuestionAnswerSubmitApiResponse> {
		return this.request(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}/submit`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}
	/**
	 * 다음 문제 진출자 목록 조회
	 * @param questionSetId - 문제가 속한 문제 셋의 ID
	 * @returns 진출자 목록
	 */
	async getQualifiers(questionSetId: number): Promise<any> {
		// Replace with actual response type
		return this.request(`/api/v1/question-sets/${questionSetId}/qualifiers`);
	}

	/**
	 * 우승자 목록 조회
	 * @param questionSetId - 문제가 속한 문제 셋의 ID
	 * @returns 우승자 목록
	 */
	async getWinners(questionSetId: number): Promise<any> {
		// Replace with actual response type
		return this.request(`/api/v1/question-sets/${questionSetId}/winners`);
	}
}

export const apiClient = new ApiClient();
