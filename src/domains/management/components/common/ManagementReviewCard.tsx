import { LockKeyhole, LockKeyholeOpen, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { QuestionSetsCard } from "@/components/question-sets/card";
import type { QuestionSetDto, QuestionSetVisibility } from "@/libs/types";

//
//
//

interface ManagementReviewCardProps {
	questionSet: QuestionSetDto;
}

const ICON_SIZE = 20;

const VISIBILITY_CONTENT: Record<
	QuestionSetVisibility,
	{
		icon: ReactNode;
		label: string;
	}
> = {
	PUBLIC: {
		icon: <LockKeyholeOpen size={ICON_SIZE} />,
		label: "전체 공개",
	},
	GROUP: {
		icon: <UserRound size={ICON_SIZE} />,
		label: "그룹 공개",
	},
	PRIVATE: {
		icon: <LockKeyhole size={ICON_SIZE} />,
		label: "비공개",
	},
};

//
//
//

const ManagementReviewCard = ({ questionSet }: ManagementReviewCardProps) => {
	const { icon, label } =
		VISIBILITY_CONTENT[questionSet.visibility ?? "PUBLIC"];

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
				<div className="flex gap-gap-5 items-center">
					{icon}
					<span className="typo-body-xsmall">{label}</span>
				</div>
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementReviewCard;
