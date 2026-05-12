import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type {
	ApiResponseListQuestionSetCategoryApiResponse,
	QuestionSetCategoryApiResponse,
} from "@/libs/types";
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
	changeModifiedCategoryValue: (id: number, value: string) => void;
	submitModifiedCategory: (id: number) => void;
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

	const queryClient = useQueryClient();

	const categoriesQueryOptions = apiHooks.queryOptions(
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

	const { data, isLoading } = apiHooks.useQuery(
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

	const { mutate: patchCategoryMutate } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/categories/{categoryId}",
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
	const submitNewCategory = async (temporaryId: number) => {
		const category = newCategories.find((item) => item.id === temporaryId);

		if (!category) {
			return;
		}

		const isDuplicate = categories?.some((item) => item.name === category.name);

		if (isDuplicate) {
			notify.error("이미 존재하는 카테고리 이름입니다.");
			return;
		}

		const categoryIndex = newCategories.findIndex(
			(item) => item.id === temporaryId,
		);

		await queryClient.cancelQueries({
			queryKey: categoriesQueryOptions.queryKey,
		});

		const previousData =
			queryClient.getQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
				categoriesQueryOptions.queryKey,
			);

		queryClient.setQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
			categoriesQueryOptions.queryKey,
			(prev) => ({
				...prev,
				data: [...(prev?.data ?? []), category],
			}),
		);

		setNewCategories((prev) => prev.filter((item) => item.id !== temporaryId));

		const rollbackNewCategories = () => {
			setNewCategories((prev) => {
				const next = [...prev];
				next.splice(categoryIndex, 0, category);
				return next;
			});
		};

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

					queryClient.invalidateQueries({
						queryKey: categoriesQueryOptions.queryKey,
					});
				},

				onError: async (err) => {
					const error = err as { code: string };

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

										queryClient.invalidateQueries({
											queryKey: categoriesQueryOptions.queryKey,
										});
									},

									onError: () => {
										notify.error("카테고리 복구에 실패했습니다.");

										rollbackNewCategories();
										queryClient.setQueryData(
											categoriesQueryOptions.queryKey,
											previousData,
										);
									},
								},
							);
						} else {
							rollbackNewCategories();
							queryClient.setQueryData(
								categoriesQueryOptions.queryKey,
								previousData,
							);
						}

						return;
					}

					notify.error("카테고리 추가에 실패했습니다.");

					rollbackNewCategories();
					queryClient.setQueryData(
						categoriesQueryOptions.queryKey,
						previousData,
					);
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
	const changeModifiedCategoryValue = (id: number, value: string) => {
		setModifyingCategory((prev) =>
			prev.map((item) => (item.id === id ? { ...item, name: value } : item)),
		);
	};

	/**
	 *
	 */
	const submitModifiedCategory = async (id: number) => {
		const category = modifyingCategory.find((item) => item.id === id);

		if (!category) {
			return;
		}

		const isDuplicate = categories?.some(
			(item) => item.name === category.name && item.id !== category.id,
		);

		if (isDuplicate) {
			notify.error("이미 존재하는 카테고리 이름입니다.");
			return;
		}

		await queryClient.cancelQueries({
			queryKey: categoriesQueryOptions.queryKey,
		});

		const previousData =
			queryClient.getQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
				categoriesQueryOptions.queryKey,
			);

		queryClient.setQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
			categoriesQueryOptions.queryKey,
			(prev) => ({
				...prev,
				data: prev?.data?.map((item) =>
					item.id === id ? { ...item, name: category.name } : item,
				) ?? [],
			}),
		);

		setModifyingCategory((prev) => prev.filter((item) => item.id !== id));

		patchCategoryMutate(
			{
				params: {
					path: {
						categoryId: category.id,
					},
				},
				body: {
					name: category.name,
				},
			},
			{
				onSuccess: () => {
					notify.success("카테고리가 수정되었습니다.");

					queryClient.invalidateQueries({
						queryKey: categoriesQueryOptions.queryKey,
					});
				},

				onError: () => {
					notify.error("카테고리 수정에 실패했습니다.");

					queryClient.setQueryData(
						categoriesQueryOptions.queryKey,
						previousData,
					);

					setModifyingCategory((prev) => [...prev, category]);
				},
			},
		);
	};

	/**
	 *
	 */
	const deleteCategory = async (id: number) => {
		await queryClient.cancelQueries({
			queryKey: categoriesQueryOptions.queryKey,
		});

		const previousData =
			queryClient.getQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
				categoriesQueryOptions.queryKey,
			);

		queryClient.setQueryData<ApiResponseListQuestionSetCategoryApiResponse>(
			categoriesQueryOptions.queryKey,
			(prev) => ({
				...prev,
				data: prev?.data?.filter((item) => item.id !== id) ?? [],
			}),
		);

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

					queryClient.invalidateQueries({
						queryKey: categoriesQueryOptions.queryKey,
					});
				},

				onError: () => {
					notify.error("카테고리 삭제에 실패했습니다.");

					queryClient.setQueryData(
						categoriesQueryOptions.queryKey,
						previousData,
					);
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
		changeModifiedCategoryValue,
		submitModifiedCategory,
		deleteCategory,
		isLoading,
	};
};

export default useTeamManagementCategories;
