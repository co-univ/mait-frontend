import isEqual from "react-fast-compare";
import type { solvingBuildSubmitData } from "./solvingBuildSubmitData";

const STORAGE_KEY = "solving-live:answer-idempotency";

interface LiveAnswerRequest {
	userId: number;
	questionSetId: number;
	questionId: number;
	payload: ReturnType<typeof solvingBuildSubmitData>;
}

interface LiveAnswerIdempotencyRecord extends LiveAnswerRequest {
	key: string;
}

const readRecord = (): LiveAnswerIdempotencyRecord | null => {
	const raw = sessionStorage.getItem(STORAGE_KEY);
	if (!raw) return null;

	try {
		const record = JSON.parse(
			raw,
		) as Partial<LiveAnswerIdempotencyRecord> | null;
		if (!record) return null;

		const hasValidKey = typeof record.key === "string" && record.key.length > 0;
		const hasValidRequestIds =
			typeof record.userId === "number" &&
			typeof record.questionSetId === "number" &&
			typeof record.questionId === "number";
		const hasValidPayload =
			typeof record.payload === "object" &&
			record.payload !== null &&
			!Array.isArray(record.payload);

		if (!hasValidKey || !hasValidRequestIds || !hasValidPayload) {
			return null;
		}
		return record as LiveAnswerIdempotencyRecord;
	} catch {
		return null;
	}
};

export const getOrCreateLiveAnswerIdempotencyKey = (
	request: LiveAnswerRequest,
): string => {
	const record = readRecord();
	if (record) {
		const isSameUser = record.userId === request.userId;
		const isSameQuestion =
			record.questionSetId === request.questionSetId &&
			record.questionId === request.questionId;
		const isSameRequest =
			isSameUser && isSameQuestion && isEqual(record.payload, request.payload);

		if (isSameRequest) {
			return record.key;
		}
	}

	const key = crypto.randomUUID();
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ key, ...request }));
	return key;
};

export const clearLiveAnswerIdempotencyKeyIfMatches = (key: string): void => {
	try {
		if (readRecord()?.key === key) {
			sessionStorage.removeItem(STORAGE_KEY);
		}
	} catch {
		// A storage cleanup failure must not invalidate a confirmed server result.
	}
};
