import { useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { notify } from "@/components/Toast";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type {
	ApiResponseQuestionSetApiResponse,
	ApiResponseQuestionSetsApiResponse,
	DeliveryMode,
	QuestionSetDto,
	QuestionSetList,
} from "@/libs/types";
import { createPath } from "@/utils/create-path";

//
//
//

interface ManagementMakingCardProps {
	questionSet: QuestionSetDto;
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
}

//
//
//

const ManagementMakingCard = ({
	questionSet,
	invalidateQuestionSetsQuery,
}: ManagementMakingCardProps) => {
	const [isTitleEditing, setIsTitleEditing] = useState(false);

	const queryClient = useQueryClient();

	const { activeTeam } = useTeams();

	const queryKey = apiHooks.queryOptions("get", "/api/v1/question-sets", {
		params: {
			query: {
				teamId: activeTeam?.teamId ?? 0,
				mode: "MAKING",
			},
		},
	}).queryKey;

	const { mutate: patchQuestionSetTitle } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}",
		{
			onMutate: async (variables) => {
				const newTitle = variables.body.title;

				await queryClient.cancelQueries({
					queryKey: queryKey,
				});

				const previousData =
					queryClient.getQueryData<ApiResponseQuestionSetsApiResponse>(
						queryKey,
					);

				queryClient.setQueryData<ApiResponseQuestionSetsApiResponse>(
					queryKey,
					(updater) => {
						if (!updater?.data?.content) {
							return updater;
						}

						const oldQuestionSets = (updater.data.content as QuestionSetList)
							.questionSets;

						if (!oldQuestionSets) {
							return updater;
						}

						return {
							...updater,
							data: {
								...updater.data,
								content: {
									questionSets: oldQuestionSets.map((oldQuestionSet) =>
										oldQuestionSet.id === questionSet.id
											? {
													...oldQuestionSet,
													title: newTitle,
												}
											: oldQuestionSet,
									),
								},
							},
						};
					},
				);

				return { previousData };
			},

			onSuccess: () => {
				notify.success("문제 셋 제목이 수정되었습니다.");
			},

			onError: (_error, _variables, context) => {
				notify.error("문제 셋 제목 수정에 실패했습니다.");

				const typedContext = context as
					| { previousData?: QuestionSetDto[] }
					| undefined;

				if (typedContext?.previousData) {
					queryClient.setQueryData<QuestionSetDto[]>(
						queryKey,
						typedContext.previousData,
					);
				}
			},

			onSettled: () => {
				invalidateQuestionSetsQuery();
			},
		},
	);

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleTitleClick = () => {
		setIsTitleEditing(true);
	};

	/**
	 *
	 */
	const handleQuestionEditButtonClick = () => {
		navigate(
			createPath(CREATION_ROUTE_PATH.ROOT, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	/**
	 *
	 */
	const handleTitleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const newTitle = formData.get("title") as string;

		if (newTitle.trim() === "") {
			notify.warn("문제 셋 제목을 입력해주세요.");
			return;
		}

		patchQuestionSetTitle({
			params: {
				path: {
					questionSetId: questionSet.id ?? 0,
				},
			},
			body: {
				title: newTitle,
			},
		});

		setIsTitleEditing(false);
	};

	/**
	 *
	 */
	const renderDefaultHeader = () => {
		return (
			<QuestionSetsCard.Header.Title
				title={questionSet.title}
				icon={
					<button type="button" onClick={handleTitleClick}>
						<PencilLine />
					</button>
				}
			/>
		);
	};

	/**
	 *
	 */
	const rednerTitleEditHeader = () => {
		return (
			<div className="w-full flex items-center gap-gap-5">
				<PencilLine />
				<input
					type="text"
					name="title"
					defaultValue={questionSet.title}
					className="typo-heading-xsmall focus:outline-none"
					style={{ boxShadow: "0 1px 0 0 rgba(0, 0, 0, 1)" }}
				/>
			</div>
		);
	};

	/**
	 *
	 */
	const renderDefaultFooterButton = () => {
		return (
			<QuestionSetsCard.Footer.Button
				item="문제 수정"
				variant="primary"
				onClick={handleQuestionEditButtonClick}
			/>
		);
	};

	/**
	 *
	 */
	const renderTitleEditFooterButton = () => {
		return (
			<div className="flex gap-gap-5">
				<QuestionSetsCard.Footer.Button
					item="취소"
					variant="primary"
					onClick={() => setIsTitleEditing(false)}
				/>
				<QuestionSetsCard.Footer.Button
					type="submit"
					item="저장"
					variant="primary"
				/>
			</div>
		);
	};

	return (
		<QuestionSetsCard.Root
			as={isTitleEditing ? "form" : "div"}
			onSubmit={handleTitleSubmit}
		>
			<QuestionSetsCard.Header>
				{!isTitleEditing && renderDefaultHeader()}
				{isTitleEditing && rednerTitleEditHeader()}
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				{!isTitleEditing && renderDefaultFooterButton()}
				{isTitleEditing && renderTitleEditFooterButton()}
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementMakingCard;
