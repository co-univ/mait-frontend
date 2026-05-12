import { useEffect, useRef, useState } from "react";
import { Field } from "@/components/field";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import useCreationNewCategories from "../../hooks/new/useCreationNewCategories";
import CreationNewLeftPanelCategoryDropdown from "./CreationNewLeftPanelCategoryDropdown";
import CreationNewLeftPanelCategoryTrigger from "./CreationNewLeftPanelCategoryTrigger";

//
//
//

interface CreationNewLeftPanelCategoryFieldProps {
	selectedCategories?: QuestionSetCategoryApiResponse[];
	onCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	onCategoryRemove: (categoryId: number) => void;
}

//
//
//

const CreationNewLeftPanelCategoryField = ({
	selectedCategories = [],
	onCategoryAdd,
	onCategoryRemove,
}: CreationNewLeftPanelCategoryFieldProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const {
		searchedCategories,
		isSearching,
		searchValue,
		onSearchChange,
		createCategory,
	} = useCreationNewCategories(onCategoryAdd);

	const filteredCategories = searchedCategories.filter(
		(c) => !selectedCategories.some((s) => s.id === c.id),
	);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);

		if (!isOpen) {
			onSearchChange("");
		}
	};

	const handleCategoryAdd = (category: QuestionSetCategoryApiResponse) => {
		onCategoryAdd?.(category);
		onSearchChange("");
	};

	//
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleMouseDown = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		const timeoutId = setTimeout(() => {
			document.addEventListener("mousedown", handleMouseDown);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, [isOpen]);

	return (
		<Field.Root>
			<Field.Label className="typo-body-large">카테고리</Field.Label>
			<div ref={containerRef} className="relative">
				<CreationNewLeftPanelCategoryTrigger
					isOpen={isOpen}
					selectedCategories={selectedCategories}
					onToggle={handleToggle}
					onCategoryRemove={onCategoryRemove}
				/>
				{isOpen && (
					<CreationNewLeftPanelCategoryDropdown
						selectedCategories={selectedCategories}
						searchedCategories={filteredCategories}
						isSearching={isSearching}
						searchValue={searchValue}
						onSearchChange={onSearchChange}
						onCategoryAdd={handleCategoryAdd}
						onCategoryRemove={onCategoryRemove}
						onCreateCategory={createCategory}
					/>
				)}
			</div>
		</Field.Root>
	);
};

export default CreationNewLeftPanelCategoryField;
