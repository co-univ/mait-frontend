import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "@/components/Toast";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import { apiClient } from "@/libs/api";
import type {
	QuestionCount,
	QuestionSetCategoryApiResponse,
} from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";
import {
	type CreationNewQuestionSetState,
	creationNewQuestionSetInitialState,
	creationNewQuestionSetReducer,
} from "../../reducers/new/CreationNewQuestionSetReducer";

//
//
//

interface UseCreationQuestionSetReturn {
	isFileUploading: boolean;
	disabledCreateQuestionSet: boolean;
	questionSet: CreationNewQuestionSetState;
	handleCreationTypeChange: (
		type: CreationNewQuestionSetState["creationType"],
	) => void;
	handleCategoryAdd: (category: QuestionSetCategoryApiResponse) => void;
	handleCategoryRemove: (categoryId: number) => void;
	handleTitleChange: (title: string) => void;
	handleQuestionCountCheck: (
		checked: boolean,
		questionType: QuestionCount["type"],
	) => void;
	handleQuestionCountCountChange: (
		type: QuestionCount["type"],
		count: number,
	) => void;
	handleDifficultyChange: (difficulty: string) => void;
	handleMaterialUpload: (file: File | null) => void;
	handleMaterialsDelete: (index: number) => void;
	handleInstructionChange: (instruction: string) => void;
	handleCreateButtonClick: () => Promise<void>;
}

//
//
//

const useCreationQuesetionSet = (): UseCreationQuestionSetReturn => {
	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const [isFileUploading, setIsFileUploading] = useState(false);

	const [questionSet, dispatch] = useReducer(
		creationNewQuestionSetReducer,
		creationNewQuestionSetInitialState(
			activeTeam?.teamId ?? 0,
			activeTeam?.teamType,
		),
	);

	const { invalidateQuestionSetsQuery } = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: "MAKING",
	});

	const disabledCreateQuestionSet = [
		!questionSet.teamId,
		!questionSet.creationType,
		!questionSet.title,
		questionSet.counts?.reduce((acc, cur) => acc + (cur?.count ?? 0), 0) === 0,
	].some(Boolean);

	/**
	 *
	 */
	const handleCreationTypeChange = (
		type: CreationNewQuestionSetState["creationType"],
	) => {
		dispatch({ type: "SET_CREATION_TYPE", payload: type });
	};

	/**
	 *
	 */
	const handleCategoryAdd = (category: QuestionSetCategoryApiResponse) => {
		dispatch({
			type: "ADD_CATEGORIES",
			payload: category,
		});
	};

	/**
	 *
	 */
	const handleCategoryRemove = (categoryId: number) => {
		dispatch({ type: "REMOVE_CATEGORY", payload: categoryId });
	};

	/**
	 *
	 */
	const handleTitleChange = (title: string) => {
		dispatch({ type: "SET_TITLE", payload: title });
	};

	/**
	 *
	 */
	const handleQuestionCountCheck = (
		checked: boolean,
		questionType: QuestionCount["type"],
	) => {
		dispatch({
			type: "SET_QUESTION_COUNT_CHECK",
			payload: { checked, type: questionType },
		});
	};

	/**
	 *
	 */
	const handleQuestionCountCountChange = (
		type: QuestionCount["type"],
		count: number,
	) => {
		dispatch({
			type: "SET_QUESTION_COUNT_COUNT",
			payload: { type, count },
		});
	};

	/**
	 *
	 */
	const handleDifficultyChange = (difficulty: string) => {
		dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
	};

	/**
	 *
	 */
	const handleMaterialUpload = (file: File | null) => {
		if (file === null) {
			return;
		}

		const uploadFile = async () => {
			setIsFileUploading(true);

			try {
				const formData = new FormData();
				formData.append("material", file);

				const res = await apiClient.POST("/api/v1/question-sets/materials", {
					body: formData as unknown as { material: string },
					bodySerializer: (body) => body as unknown as FormData,
				});

				if (!res.data?.isSuccess) {
					throw new Error("File upload failed");
				}

				dispatch({
					type: "SET_MATERIALS_ADD",
					payload: {
						id: res.data?.data?.id ?? 0,
						url: res.data?.data?.materialUrl ?? "",
					},
				});
			} catch {
				notify.error("자료 업로드에 실패했습니다.");
				dispatch({ type: "SET_MATERIALS_POP", payload: undefined });
			} finally {
				setIsFileUploading(false);
			}
		};

		dispatch({ type: "SET_UPLOAD_FILES", payload: file });
		uploadFile();
	};

	/**
	 *
	 */
	const handleMaterialsDelete = (index: number) => {
		dispatch({ type: "SET_MATERIALS_DELETE", payload: index });
	};

	/**
	 *
	 */
	const handleInstructionChange = (instruction: string) => {
		dispatch({ type: "SET_INSTRUCTION", payload: instruction });
	};

	/**
	 *
	 */
	const handleCreateButtonClick = async () => {
		const questionSetRequestBody = {
			...questionSet,
			categoryIds: questionSet.categories?.map((category) => category.id) ?? [],
		};

		const res = await apiClient.POST("/api/v1/question-sets", {
			body: {
				...questionSetRequestBody,
				materials: questionSet.materials?.map((material) => ({
					id: material.id,
					url: material.url,
				})),
			},
		});

		if (!res.data?.isSuccess) {
			notify.error("문제 생성에 실패했습니다.");
			return;
		}

		invalidateQuestionSetsQuery();

		const questionSetId = res.data?.data?.questionSetId ?? 0;

		if (questionSet.creationType === "AI_GENERATED") {
			navigate(
				createPath(CREATION_ROUTE_PATH.NEW_LOADING, {
					questionSetId: questionSetId,
				}),
			);

			return;
		}

		navigate(
			createPath(CREATION_ROUTE_PATH.ROOT, { questionSetId: questionSetId }),
			{
				replace: true,
			},
		);
	};

	return {
		questionSet,
		isFileUploading,
		disabledCreateQuestionSet,
		handleCreationTypeChange,
		handleCategoryAdd,
		handleCategoryRemove,
		handleTitleChange,
		handleQuestionCountCheck,
		handleQuestionCountCountChange,
		handleDifficultyChange,
		handleMaterialUpload,
		handleMaterialsDelete,
		handleInstructionChange,
		handleCreateButtonClick,
	};
};

export default useCreationQuesetionSet;
