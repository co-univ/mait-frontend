import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import CreationNewLeftPanelCategoryBadge from "./CreationNewLeftPanelCategoryBadge";

//
//
//

interface CreationNewLeftPanelCategoryTriggerProps {
	isOpen: boolean;
	selectedCategories: QuestionSetCategoryApiResponse[];
	onToggle: () => void;
	onCategoryRemove: (categoryId: number) => void;
}

//
//
//

const CreationNewLeftPanelCategoryTrigger = ({
	isOpen,
	selectedCategories,
	onToggle,
	onCategoryRemove,
}: CreationNewLeftPanelCategoryTriggerProps) => {
	const hasCategories = selectedCategories.length > 0;

	return (
		<button
			type="button"
			onClick={onToggle}
			className="w-full bg-color-gray-5 rounded-radius-medium1 px-padding-11 py-padding-10"
		>
			<div className="flex items-center justify-between">
				<div className="flex flex-wrap gap-gap-3 flex-1 min-w-0">
					{!hasCategories ? (
						<span className="typo-body-medium text-color-gray-95">
							카테고리 추가
						</span>
					) : (
						<>
							{selectedCategories.slice(0, 4).map((category) => (
								<CreationNewLeftPanelCategoryBadge
									key={category.id}
									category={category}
									onRemove={onCategoryRemove}
								/>
							))}
							{selectedCategories.length > 4 && (
								<span className="flex items-center bg-color-primary-10 px-padding-5 py-padding-2 rounded-radius-medium1 typo-body-xsmall text-color-gray-95">
									..
								</span>
							)}
						</>
					)}
				</div>
				<span className="flex-shrink-0 text-color-gray-95">
					{!hasCategories && <Plus />}
					{hasCategories && !isOpen && <ChevronDown />}
					{hasCategories && isOpen && <ChevronUp />}
				</span>
			</div>
		</button>
	);
};

export default CreationNewLeftPanelCategoryTrigger;
