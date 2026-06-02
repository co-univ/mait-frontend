import { Users } from "lucide-react";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import TeamManagementCategoriesBox from "../../components/TeamManagementCategories/TeamManagementCategoriesBox";
import TeamManagementCategoriesInput from "../../components/TeamManagementCategories/TeamManagementCategoriesInput";
import TeamManagementCategoriesItem from "../../components/TeamManagementCategories/TeamManagementCategoriesItem";
import TeamManagementCateogiresAddButton from "../../components/TeamManagementCategories/TeamManagementCateogiresAddButton";
import useTeamManagementCategories from "../../hooks/categories/useTeamManagementCategories";

//
//
//

const TeamManagementCategories = () => {
	const {
		categories,
		newCategories,
		modifyingCategory,
		addNewCategory,
		changeNewCategoryValue,
		submitNewCategory,
		cancelNewCategory,
		modifyCategory,
		changeModifiedCategoryValue,
		submitModifiedCategory,
		cancelModifyingCategory,
		deleteCategory,
	} = useTeamManagementCategories();

	/**
	 *
	 */
	const renderCategoryItem = (category: QuestionSetCategoryApiResponse) => {
		const modifyingCategoryIndex = modifyingCategory.findIndex(
			(item) => item.id === category.id,
		);

		if (modifyingCategoryIndex !== -1) {
			return (
				<TeamManagementCategoriesInput
					key={category.id}
					value={modifyingCategory[modifyingCategoryIndex].name}
					onChange={(value) => {
						changeModifiedCategoryValue(category.id, value);
					}}
					onSubmit={() => {
						submitModifiedCategory(category.id);
					}}
					onCancel={() => {
						cancelModifyingCategory(category.id);
					}}
				/>
			);
		}

		return (
			<TeamManagementCategoriesItem
				key={category.id}
				category={category}
				onModify={modifyCategory}
				onDelete={deleteCategory}
			/>
		);
	};

	/**
	 *
	 */
	const renderCategories = () => {
		const nodes = categories
			.map((category) => renderCategoryItem(category))
			.concat(
				newCategories.map((category) => (
					<TeamManagementCategoriesInput
						key={category.id}
						value={category.name}
						onChange={(value) => {
							changeNewCategoryValue(category.id, value);
						}}
						onSubmit={() => {
							submitNewCategory(category.id);
						}}
						onCancel={() => {
							cancelNewCategory(category.id);
						}}
					/>
				)),
			)
			.concat(
				<TeamManagementCateogiresAddButton
					key="add-button"
					onClick={() => addNewCategory()}
				/>,
			);

		return (
			<div className="border border-color-gray-20 rounded-radius-medium1">
				{nodes.map((node, index) => (
					<TeamManagementCategoriesBox
						key={node.key}
						hasBottomBorder={index !== nodes.length - 1}
					>
						{node}
					</TeamManagementCategoriesBox>
				))}
			</div>
		);
	};

	return (
		<LabeledPageLayout icon={<Users />} label="카테고리 관리">
			{renderCategories()}
		</LabeledPageLayout>
	);
};

export default TeamManagementCategories;
