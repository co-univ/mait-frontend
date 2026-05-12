import { useState } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import generateTemporaryId from "@/utils/generate-temporary-id";

//
//
//

interface UseTeamManagementCategoriesReturn {
	categories: QuestionSetCategoryApiResponse[];
	newCategories: QuestionSetCategoryApiResponse[];
	modifyingCategory: QuestionSetCategoryApiResponse[];
	addNewCategory: () => void;
	changeNewCategoryValue: (id: number, value: string) => void;
	submitNewCategory: (id: number) => void;
	modifyCategory: (id: number) => void;
	submitModifiedCategory: (id: number, name: string) => void;
	deleteCategory: (id: number) => void;
	isLoading: boolean;
}

//
//
//

const useTeamManagementCategories = (): UseTeamManagementCategoriesReturn => {
	const [newCategories, setNewCategories] = useState<
		QuestionSetCategoryApiResponse[]
	>([]);
	const [modifyingCategory, setModifyingCategory] = useState<
		QuestionSetCategoryApiResponse[]
	>([]);

	const { activeTeam } = useTeams();

	const { confirm } = useConfirm();

	const { data, isLoading, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/categories",
		{
			params: {
				query: {
					teamId: activeTeam?.teamId ?? 0,
				},
			},
		},
	);

	const { mutate: postCategoryMutate } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/categories",
	);

	const { mutate: deleteCategoryMutate } = apiHooks.useMutation(
		"delete",
		"/api/v1/question-sets/categories/{categoryId}",
	);

	const { mutate: restoreCategoryMutate } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/categories/restore",
	);

	const categories = data?.data;

	/**
	 *
	 */
	const addNewCategory = () => {
		setNewCategories((prev) => [
			...prev,
			{
				id: generateTemporaryId(),
				name: "",
				teamId: activeTeam?.teamId ?? 0,
			},
		]);
	};

	/**
	 *
	 */
	const changeNewCategoryValue = (id: number, value: string) => {
		setNewCategories((prev) =>
			prev.map((item) => (item.id === id ? { ...item, name: value } : item)),
		);
	};

	/**
	 *
	 */
	const submitNewCategory = (temporaryId: number) => {
		const category = newCategories.find((item) => item.id === temporaryId);

		if (!category) {
			return;
		}

		postCategoryMutate(
			{
				body: {
					name: category.name,
					teamId: category.teamId,
				},
			},
			{
				onSuccess: () => {
					notify.success("카테고리가 추가되었습니다.");

					refetch();

					setNewCategories((prev) =>
						prev.filter((item) => item.id !== temporaryId),
					);
				},

				onError: async (err) => {
					const error = err as {
						code: string;
					};

					if (error.code === "QSC-001") {
						notify.error("이미 존재하는 카테고리 이름입니다.");

						return;
					}

					if (error.code === "QSC-002") {
						const confirmRes = await confirm({
							title: "기존 카테고리를 복구할까요?",
							description: "삭제된 동일 이름 카테고리가 있습니다.",
						});

						if (confirmRes) {
							restoreCategoryMutate(
								{
									body: {
										teamId: activeTeam?.teamId ?? 0,
										name: category.name,
									},
								},
								{
									onSuccess: () => {
										notify.success("카테고리가 복구되었습니다.");

										refetch();

										setNewCategories((prev) =>
											prev.filter((item) => item.id !== temporaryId),
										);
									},

									onError: () => {
										notify.error("카테고리 복구에 실패했습니다.");
									},
								},
							);
						} else {
							notify.error("카테고리 추가에 실패했습니다.");
						}

						return;
					}

					notify.error("카테고리 추가에 실패했습니다.");
				},
			},
		);
	};

	/**
	 *
	 */
	const modifyCategory = (id: number) => {
		const category = categories?.find((item) => item.id === id);

		if (!category) {
			return;
		}

		setModifyingCategory((prev) => [...prev, category]);
	};

	/**
	 *
	 */
	const submitModifiedCategory = (id: number, name: string) => {
		// TODO: need API
	};

	/**
	 *
	 */
	const deleteCategory = (id: number) => {
		deleteCategoryMutate(
			{
				params: {
					path: {
						categoryId: id,
					},
				},
			},
			{
				onSuccess: () => {
					notify.success("카테고리가 삭제되었습니다.");

					refetch();
				},

				onError: () => {
					notify.error("카테고리 삭제에 실패했습니다.");
				},
			},
		);
	};

	return {
		categories: categories ?? [],
		newCategories,
		modifyingCategory,
		changeNewCategoryValue,
		submitNewCategory,
		addNewCategory,
		modifyCategory,
		submitModifiedCategory,
		deleteCategory,
		isLoading,
	};
};

export default useTeamManagementCategories;
