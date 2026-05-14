import { useSearchParams } from "react-router-dom";
import type { DeliveryMode } from "@/libs/types";
import useRecentQuestionSetTabStore from "@/stores/useRecentQuestionSetTabStore";

//
//
//

const QUESTION_SET_MODES = {
	making: "MAKING",
	"live-time": "LIVE_TIME",
	study: "STUDY",
	review: "REVIEW",
} as const satisfies Record<string, DeliveryMode>;

type QuestionSetTabMode = keyof typeof QUESTION_SET_MODES;

//
//
//

const useQuestionSetTabMode = (
	validModes: QuestionSetTabMode[],
	defaultMode: QuestionSetTabMode,
) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { recentTab, setRecentTab } = useRecentQuestionSetTabStore();

	const rawMode = searchParams.get("mode") ?? recentTab ?? null;

	const mode: QuestionSetTabMode =
		rawMode && (validModes as string[]).includes(rawMode)
			? (rawMode as QuestionSetTabMode)
			: defaultMode;

	const handleModeChange = (value: string) => {
		if (!(validModes as string[]).includes(value)) {
			return;
		}
		const newParams = new URLSearchParams(searchParams);
		newParams.set("mode", value);
		setSearchParams(newParams);
		setRecentTab(value as QuestionSetTabMode);
	};

	return {
		mode,
		deliveryMode: QUESTION_SET_MODES[mode],
		handleModeChange,
	};
};

export default useQuestionSetTabMode;
