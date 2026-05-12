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
		modifyCategory,
		deleteCategory,
	} = useTeamManagementCategories();

	/**
	 *
	 */
	const renderCategoryItem = (category: QuestionSetCategoryApiResponse) => {
		if (modifyingCategory.find((item) => item.id === category.id)) {
			return (
				<TeamManagementCategoriesInput
					key={category.id}
					value={category.name}
					onChange={(value) => {
						changeNewCategoryValue(category.id, value);
					}}
					onSubmit={() => {}}
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
			<div className="flex border border-color-gray-20 rounded-radius-medium1">
				<div className="flex-1 overflow-hidden">
					{nodes
						.filter((_, index) => index % 2 === 0)
						.map((node, index) => (
							<TeamManagementCategoriesBox
								key={node.key}
								hasRightBorder
								hasBottomBorder={
									index * 2 + 2 !== nodes.length + (nodes.length % 2)
								}
							>
								{node}
							</TeamManagementCategoriesBox>
						))}
				</div>
				<div className="flex-1 overflow-hidden">
					{nodes
						.filter((_, index) => index % 2 === 1)
						.map((node, index) => (
							<TeamManagementCategoriesBox
								key={node.key}
								hasBottomBorder={
									index * 2 + 2 !== nodes.length + (nodes.length % 2)
								}
							>
								{node}
							</TeamManagementCategoriesBox>
						))}
				</div>
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
