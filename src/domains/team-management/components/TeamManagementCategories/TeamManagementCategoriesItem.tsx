import { Pen } from "lucide-react";
import Button from "@/components/Button";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";

//
//
//

interface TeamManagementCategoriesItemProps {
	category: QuestionSetCategoryApiResponse;
	onModify: (id: number) => void;
	onDelete: (id: number) => void;
}
//
//
//

const TeamManagementCategoriesItem = ({
	category,
	onModify,
	onDelete,
}: TeamManagementCategoriesItemProps) => {
	return (
		<div className="w-full flex gap-gap-5 overflow-hidden">
			<span className="flex-1 min-w-0 typo-body-small truncate">
				{category.name}
			</span>
			<Button
				icon={<Pen size={16} strokeWidth={2} />}
				className="border-none !p-0 text-color-gray-60"
				onClick={() => onModify(category.id)}
			/>
			<DeleteCheckBox onClick={() => onDelete(category.id)} />
		</div>
	);
};

export default TeamManagementCategoriesItem;
