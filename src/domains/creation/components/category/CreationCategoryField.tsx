import { useEffect, useRef, useState } from "react";
import { Field } from "@/components/field";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import useCreationCategories from "../../hooks/category/useCreationCategories";
import CreationCategoryDropdown from "./CreationCategoryDropdown";
import CreationCategoryTrigger from "./CreationCategoryTrigger";

//
//
//

interface CreationCategoryFieldProps {
	selectedCategories?: QuestionSetCategoryApiResponse[];
	onCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	onCategoryRemove: (categoryId: number) => void;
}

//
//
//

const CreationCategoryField = ({
	selectedCategories = [],
	onCategoryAdd,
	onCategoryRemove,
}: CreationCategoryFieldProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const {
		searchedCategories,
		isSearching,
		searchValue,
		onSearchChange,
		createCategory,
	} = useCreationCategories({ onCategoryAdd, onCategoryRemove });

	const handleToggle = () => {
		setIsOpen((prev) => !prev);

		if (!isOpen) {
			onSearchChange("");
		}
	};

	const handleCategoryAdd = (category: QuestionSetCategoryApiResponse) => {
		onCategoryAdd(category);
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
				<CreationCategoryTrigger
					isOpen={isOpen}
					selectedCategories={selectedCategories}
					onToggle={handleToggle}
					onCategoryRemove={onCategoryRemove}
				/>
				{isOpen && (
					<CreationCategoryDropdown
						selectedCategories={selectedCategories}
						searchedCategories={searchedCategories}
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

export default CreationCategoryField;
