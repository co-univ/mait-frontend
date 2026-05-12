import clsx from "clsx";
import { Search } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/shadcn-ui/spinner";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import CreationCategoryBadge from "./CreationCategoryBadge";

//
//
//

interface CreationCategoryDropdownProps {
	selectedCategories: QuestionSetCategoryApiResponse[];
	searchedCategories: QuestionSetCategoryApiResponse[];
	isSearching: boolean;
	searchValue: string;
	onSearchChange: (value: string) => void;
	onCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	onCategoryRemove: (categoryId: number) => void;
	onCreateCategory: () => void;
}

//
//
//

const CreationCategoryDropdown = ({
	selectedCategories,
	searchedCategories,
	isSearching,
	searchValue,
	onSearchChange,
	onCategoryAdd,
	onCategoryRemove,
	onCreateCategory,
}: CreationCategoryDropdownProps) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="absolute top-full left-0 right-0 z-50 mt-[2px] bg-color-gray-5 rounded-radius-medium1 shadow-xl px-padding-11 py-padding-10">
			<div className="flex flex-wrap gap-gap-3 mb-[16px]">
				{selectedCategories.map((category) => (
					<CreationCategoryBadge
						key={category.id}
						category={category}
						variant="primary"
						onRemove={onCategoryRemove}
					/>
				))}
			</div>

			<div className="border-t border-color-gray-30 mb-[16px]" />

			<div
				className={clsx(
					"flex items-center gap-gap-5 bg-color-alpha-white100 border rounded-radius-medium1 px-[12px] py-[6px]",
					{
						"border-color-primary-50": isFocused,
						"border-color-gray-20": !isFocused,
					},
				)}
			>
				<Search className="size-[16px] text-color-gray-60 flex-shrink-0" />
				<input
					type="text"
					value={searchValue}
					onChange={(e) => onSearchChange(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="카테고리 검색"
					className="flex-1 bg-transparent outline-none typo-body-xsmall text-color-gray-95 placeholder:text-color-gray-40"
				/>
			</div>

			<div className="min-h-[120px] flex justify-center items-center">
				{isSearching && <Spinner className="text-color-primary-50" />}

				{!isSearching && searchedCategories.length > 0 && (
					<div className="self-start w-full flex flex-wrap gap-gap-3 pt-[16px]">
						{searchedCategories
							.filter(
								(searchedCategory) =>
									!selectedCategories.some(
										(selectedCategory) =>
											selectedCategory.id === searchedCategory.id,
									),
							)
							.map((category) => (
								<button
									key={category.id}
									type="button"
									onClick={() => onCategoryAdd(category)}
								>
									<CreationCategoryBadge category={category} variant="gray" />
								</button>
							))}
					</div>
				)}

				{!isSearching &&
					searchedCategories.length === 0 &&
					searchValue &&
					!selectedCategories.some((selectedCategory) =>
						searchedCategories.some(
							(searchedCategory) => searchedCategory.id === selectedCategory.id,
						),
					) && (
						<p className="pt-[16px] text-center typo-body-xsmall text-color-gray-95">
							검색결과가 없습니다.
							<br />
							<button
								type="button"
								onClick={onCreateCategory}
								className="underline"
							>
								<span className="text-color-primary-50">{searchValue}</span>
								<span>(으)로 추가하기</span>
							</button>
						</p>
					)}
			</div>
		</div>
	);
};

export default CreationCategoryDropdown;
