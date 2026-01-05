import type { LucideIcon } from "lucide-react";
import { LockKeyhole, LockKeyholeOpen, UsersRound } from "lucide-react";
import type { QuestionSetVisibility } from "@/libs/types";

export interface VisibilityConfig {
	Icon: LucideIcon;
	label: string;
}

export const QUESTION_SET_VISIBILITY_CONFIG: Record<
	QuestionSetVisibility,
	VisibilityConfig
> = {
	PUBLIC: {
		Icon: LockKeyholeOpen,
		label: "전체 공개",
	},
	GROUP: {
		Icon: UsersRound,
		label: "그룹 공개",
	},
	PRIVATE: {
		Icon: LockKeyhole,
		label: "비공개",
	},
};

export const DEFAULT_VISIBILITY_ICON_SIZE = 20;
