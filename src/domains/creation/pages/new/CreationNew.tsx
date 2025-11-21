import { ChevronRight, PencilLine, Puzzle } from "lucide-react";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiClient } from "@/libs/api";
import type { QuestionCount } from "@/libs/types";
import {
	type CreationNewQuestionSetState,
	creationNewQuestionSetInitialState,
	creationNewQuestionSetReducer,
} from "../../reducers/new/CreationNewQuestionSetReducer";
import CreationNewLeftPanel from "./CreationNewLeftPanel";
import CreationNewRightPanel from "./CreationNewRightPanel";

//
//
//

const CreationNew = () => {
	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const [isFileUploading, setIsFileUploading] = useState(false);

	const [questionSet, dispatch] = useReducer(
		creationNewQuestionSetReducer,
		creationNewQuestionSetInitialState(activeTeam?.teamId ?? 0),
	);

	const disabledCreateQuestionSet = [
		!questionSet.teamId,
		!questionSet.creationType,
		!questionSet.subject,
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
	const handleSubjectChange = (subject: string) => {
		dispatch({ type: "SET_SUBJECT", payload: subject });
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
					bodySerializer: (body) => body as unknown as FormData, // 이 부분이 필요합니다
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
		const res = await apiClient.POST("/api/v1/question-sets", {
			body: {
				...questionSet,
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

		const questionSetId = res.data?.data?.questionSetId;

		if (questionSet.creationType === "AI_GENERATED") {
			navigate(`/creation/new/loading/question-set/${questionSetId}`);
			return;
		}

		navigate(`/creation/question/question-set/${questionSetId}`);
	};

	return (
		<LabeledPageLayout icon={<PencilLine />} label="문제 정보 입력">
			<div className="flex flex-col gap-gap-11">
				<div className="flex justify-between items-center">
					<Badge
						icon={<Puzzle />}
						item="자료가 없으면 문제 생성이 부정확할 수 있습니다."
						className="typo-body-medium text-color-warning-60 bg-warning-5 border border-color-warning-30 w-fit"
					/>

					<Button
						disabled={disabledCreateQuestionSet}
						icon={<ChevronRight />}
						item="문제 만들기"
						onClick={handleCreateButtonClick}
						className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
					/>
				</div>

				<div className="flex gap-gap-5 w-full">
					<CreationNewLeftPanel
						creationType={questionSet.creationType}
						subject={questionSet.subject}
						counts={questionSet.counts}
						onCreationTypeChange={handleCreationTypeChange}
						onSubjectChange={handleSubjectChange}
						onQuestionCountCheck={handleQuestionCountCheck}
						onQuestionCountCountChange={handleQuestionCountCountChange}
					/>

					<CreationNewRightPanel
						readonly={questionSet.creationType === "MANUAL"}
						isFileUploading={isFileUploading}
						difficulty={questionSet.difficulty ?? ""}
						materials={questionSet.materials}
						instruction={questionSet.instruction ?? ""}
						onDifficultyChange={handleDifficultyChange}
						onMaterialUpload={handleMaterialUpload}
						onMaterialsDelete={handleMaterialsDelete}
						onInstructionChange={handleInstructionChange}
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationNew;
