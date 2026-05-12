import clsx from "clsx";
import { X } from "lucide-react";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";

//
//
//

interface CreationNewLeftPanelCategoryBadgeProps {
	category: QuestionSetCategoryApiResponse;
	variant?: "primary" | "gray";
	onRemove?: (id: number) => void;
}

//
//
//

const CreationNewLeftPanelCategoryBadge = ({
	category,
	variant = "primary",
	onRemove,
}: CreationNewLeftPanelCategoryBadgeProps) => {
	return (
		<span
			className={clsx(
				"flex items-center gap-gap-2 px-padding-5 py-padding-2 rounded-radius-medium1 typo-body-xsmall",
				{
					"bg-color-primary-10": variant === "primary",
					"bg-color-gray-10": variant === "gray",
				},
			)}
		>
			<span className="truncate">{category.name}</span>
			{onRemove && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onRemove(category.id);
					}}
					className="flex-shrink-0"
				>
					<X className="size-[16px] text-color-point-50" />
				</button>
			)}
		</span>
	);
};

export default CreationNewLeftPanelCategoryBadge;
