import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiClient, apiHooks } from "@/libs/api";
import type {
	ApiResponseListQuestionSetCategoryApiResponse,
	QuestionSetCategoryApiResponse,
} from "@/libs/types";

//
//
//

interface UseCreationNewCategoriesReturn {
	searchedCategories: QuestionSetCategoryApiResponse[];
	isSearching: boolean;
	searchValue: string;
	onSearchChange: (value: string) => void;
	createCategory: () => void;
}

//
//
//

const useCreationNewCategories = (
	onCategoryAdd?: (category: QuestionSetCategoryApiResponse) => void,
): UseCreationNewCategoriesReturn => {
	const [searchValue, setSearchValue] = useState("");
	const [searchedCategories, setSearchedCategories] = useState<
		QuestionSetCategoryApiResponse[]
	>([]);
	const [isSearching, setIsSearching] = useState(false);

	const { activeTeam } = useTeams();
	const queryClient = useQueryClient();
	const { confirm } = useConfirm();

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

	const { mutate: createCategoryMutate } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/categories",
	);

	const { mutate: restoreCategoryMutate } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/categories/restore",
	);

	/**
	 *
	 */
	const createCategory = async () => {
		const teamId = activeTeam?.teamId;

		if (!teamId || !searchValue.trim()) {
			return;
		}

		const name = searchValue.trim();

		if (name.length > 40) {
			notify.error("카테고리 이름은 40자를 초과할 수 없습니다.");
			return;
		}

		const optimisticCategory: QuestionSetCategoryApiResponse = {
			id: Date.now(),
			teamId,
			name,
		};

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
				data: [...(prev?.data ?? []), optimisticCategory],
			}),
		);

		setSearchedCategories((prev) => [...prev, optimisticCategory]);

		const rollback = () => {
			queryClient.setQueryData(categoriesQueryOptions.queryKey, previousData);
			setSearchedCategories((prev) =>
				prev.filter((c) => c.id !== optimisticCategory.id),
			);
		};

		createCategoryMutate(
			{
				body: { teamId, name },
			},
			{
				onSuccess: (res) => {
					notify.success("카테고리가 추가되었습니다.");

					queryClient.invalidateQueries({
						queryKey: categoriesQueryOptions.queryKey,
					});

					const created = res.data;

					if (created) {
						onCategoryAdd?.(created);
					}
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
									body: { teamId, name },
								},
								{
									onSuccess: (res) => {
										notify.success("카테고리가 복구되었습니다.");

										queryClient.invalidateQueries({
											queryKey: categoriesQueryOptions.queryKey,
										});

										const restored = res.data;

										if (restored) {
											onCategoryAdd?.(restored);
										}
									},

									onError: () => {
										notify.error("카테고리 복구에 실패했습니다.");
										rollback();
									},
								},
							);
						} else {
							rollback();
						}

						return;
					}

					notify.error("카테고리 추가에 실패했습니다.");
					rollback();
				},
			},
		);
	};

	//
	useEffect(() => {
		const teamId = activeTeam?.teamId;

		if (!teamId) {
			return;
		}

		setIsSearching(true);

		const timerId = setTimeout(async () => {
			const res = await apiClient.GET(
				"/api/v1/question-sets/categories/search",
				{
					params: {
						query: {
							teamId,
							keyword: searchValue,
						},
					},
				},
			);

			setSearchedCategories(res.data?.data ?? []);
			setIsSearching(false);
		}, 500);

		return () => {
			clearTimeout(timerId);
			setIsSearching(false);
		};
	}, [searchValue, activeTeam?.teamId]);

	return {
		searchedCategories,
		isSearching,
		searchValue,
		onSearchChange: setSearchValue,
		createCategory,
	};
};

export default useCreationNewCategories;
