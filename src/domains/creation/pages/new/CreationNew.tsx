import { ChevronRight, PencilLine, Puzzle } from "lucide-react";
import { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiClient } from "@/libs/api";
import type { QuestionCount } from "@/libs/types";
import {
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

	const teamId = Number(useParams().teamId);

	const [questionSet, dispatch] = useReducer(
		creationNewQuestionSetReducer,
		creationNewQuestionSetInitialState(teamId),
	);

	const disabledCreateQuestionSet = [
		!questionSet.teamId,
		!questionSet.creationType,
		!questionSet.subject,
	].some(Boolean);

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
	const handleCreateButtonClick = async () => {
		try {
			const res = await apiClient.POST("/api/v1/question-sets", {
				body: questionSet,
			});

			const questionSetId = res.data?.data?.questionSetId;

			navigate(
				`/creation/question/team/${teamId}/question-set/${questionSetId}/question/0`,
			);
		} catch {
			notify.error("문제 생성에 실패했습니다.");
		}
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
						subject={questionSet.subject}
						counts={questionSet.counts}
						onSubjectChange={handleSubjectChange}
						onQuestionCountCheck={handleQuestionCountCheck}
						onQuestionCountCountChange={handleQuestionCountCountChange}
					/>

					<CreationNewRightPanel />
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationNew;
