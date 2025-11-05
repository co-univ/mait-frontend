import clsx from "clsx";
import { Lock, LockKeyholeOpen, Users } from "lucide-react";

//
//
//

type BadgeType = "public" | "group" | "private";

interface QuestionSetsCardHeaderBadgeProps {
	type: BadgeType;
	className?: string;
}

const BADGE_CONFIG = {
	public: {
		icon: LockKeyholeOpen,
		label: "전체 공개",
	},
	group: {
		icon: Users,
		label: "그룹 공개",
	},
	private: {
		icon: Lock,
		label: "비공개",
	},
};

//
//
//

const QuestionSetsCardHeaderBadge = ({
	type,
	className,
}: QuestionSetsCardHeaderBadgeProps) => {
	const config = BADGE_CONFIG[type];
	const Icon = config.icon;

	return (
		<div className={clsx("flex gap-gap-5 items-center", className)}>
			<Icon size={20} />
			<span className="typo-body-xsmall">{config.label}</span>
		</div>
	);
};

export default QuestionSetsCardHeaderBadge;
