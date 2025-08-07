import type {
	ApiResponseListParticipantInfoResponse,
	ApiResponseListQuestionAnswerSubmitRecordApiResponse,
	ApiResponseListQuestionApiResponse,
	ApiResponseListQuestionSetApiResponse,
	ApiResponseParticipantsCorrectAnswerRankResponse,
	ApiResponseQuestionApiResponse,
	ApiResponseQuestionScorerApiResponse,
	ApiResponseQuestionSetLiveStatusResponse,
	ApiResponseVoid,
	SendWinnerRequest,
	UpdateActiveParticipantsRequest,
} from "@/types";

const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

class ControlApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

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

		// Handle empty response bodies (common for 204 No Content responses)
		const text = await response.text();
		if (!text) {
			return {} as T;
		}

		try {
			return JSON.parse(text);
		} catch (error) {
			throw new Error(`Invalid JSON response: ${text}`);
		}
	}

	// Live Status APIs
	async getLiveStatus(
		questionSetId: number,
	): Promise<ApiResponseQuestionSetLiveStatusResponse> {
		return this.request<ApiResponseQuestionSetLiveStatusResponse>(
			`/api/v1/question-sets/${questionSetId}/live-status`,
			{
				method: "GET",
			},
		);
	}

	async startLiveQuestionSet(questionSetId: number): Promise<ApiResponseVoid> {
		const response = await this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/live-status/start`,
			{
				method: "PATCH",
			},
		);

		return response;
	}

	async endLiveQuestionSet(questionSetId: number): Promise<ApiResponseVoid> {
		const response = await this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/live-status/end`,
			{
				method: "PATCH",
			},
		);

		return response;
	}

	// Participants APIs
	async getActiveParticipants(
		questionSetId: number,
	): Promise<ApiResponseListParticipantInfoResponse> {
		return this.request<ApiResponseListParticipantInfoResponse>(
			`/api/v1/question-sets/${questionSetId}/live-status/participants`,
			{
				method: "GET",
			},
		);
	}

	async getCorrectAnswerRank(
		questionSetId: number,
	): Promise<ApiResponseParticipantsCorrectAnswerRankResponse> {
		return this.request<ApiResponseParticipantsCorrectAnswerRankResponse>(
			`/api/v1/question-sets/${questionSetId}/live-status/rank/correct`,
			{
				method: "GET",
			},
		);
	}

	async updateActiveParticipants(
		questionSetId: number,
		data: UpdateActiveParticipantsRequest,
	): Promise<ApiResponseVoid> {
		return this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/live-status/participants`,
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
		);
	}

	async sendWinner(
		questionSetId: number,
		data: SendWinnerRequest,
	): Promise<ApiResponseVoid> {
		return this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/live-status/winner`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	// Question Control APIs
	async allowQuestionAccess(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseVoid> {
		return this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}/control/access`,
			{
				method: "POST",
			},
		);
	}

	async allowQuestionSolve(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseVoid> {
		return this.request<ApiResponseVoid>(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}/control/solve`,
			{
				method: "POST",
			},
		);
	}

	// Question Data APIs
	async getQuestions(
		questionSetId: number,
	): Promise<ApiResponseListQuestionApiResponse> {
		return this.request<ApiResponseListQuestionApiResponse>(
			`/api/v1/question-sets/${questionSetId}/questions`,
			{
				method: "GET",
			},
		);
	}

	async getQuestion(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseQuestionApiResponse> {
		return this.request<ApiResponseQuestionApiResponse>(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}`,
			{
				method: "GET",
			},
		);
	}

	// Question Set APIs
	async getQuestionSets(
		teamId: number,
	): Promise<ApiResponseListQuestionSetApiResponse> {
		return this.request<ApiResponseListQuestionSetApiResponse>(
			`/api/v1/question-sets?teamId=${teamId}`,
			{
				method: "GET",
			},
		);
	}

	// Question Score and Submit Records APIs
	async getQuestionScorer(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseQuestionScorerApiResponse> {
		return this.request<ApiResponseQuestionScorerApiResponse>(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}/scorer`,
			{
				method: "GET",
			},
		);
	}

	async getSubmitRecords(
		questionSetId: number,
		questionId: number,
	): Promise<ApiResponseListQuestionAnswerSubmitRecordApiResponse> {
		return this.request<ApiResponseListQuestionAnswerSubmitRecordApiResponse>(
			`/api/v1/question-sets/${questionSetId}/questions/${questionId}/submit-records`,
			{
				method: "GET",
			},
		);
	}
}

export const controlApiClient = new ControlApiClient();
