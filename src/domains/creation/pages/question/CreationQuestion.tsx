import { SquareMinus } from "lucide-react";
import { useEffect } from "react";
import {
	useBeforeUnload,
	useBlocker,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import {
	useCreationQuestion,
	useCreationQuestions,
} from "@/domains/creation/hooks/question";
import CreationQuestionLayout from "@/domains/creation/layouts/question/CreationQuestionLayout";
import CreationQuestionAdditional from "@/domains/creation/pages/question/additional/CreationQuestionAdditional";
import CreationQuestionMain from "@/domains/creation/pages/question/CreationQuestionMain";
import type { QuestionNavigationButtonRenderProps } from "../../../../components/question-navigation/QuestionNavigationList";
import type { QuestionResponseType } from "../../creation.constant";

//
//
//

const CreationQuestion = () => {
	const navigate = useNavigate();

	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions, handleAddQuestion } = useCreationQuestions({
		questionSetId,
	});
	const { handleUpdateQuestion, handleDeleteQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	const isExistEditingQuestion = questions.some(
		(question) => question.isEditing,
	);

	const blocker = useBlocker(({ nextLocation }) => {
		return (
			isExistEditingQuestion &&
			!nextLocation.pathname.startsWith("/creation/question")
		);
	});

	useBeforeUnload((e) => {
		if (isExistEditingQuestion) {
			e.preventDefault();
			e.returnValue = "";
		}
	});

	const { confirm } = useConfirm();

	/**
	 *
	 */
	const handleQuestionNavigationClick = (newQuestionId: number) => {
		handleUpdateQuestion();

		navigate(
			`/creation/question/team/${teamId}/question-set/${questionSetId}/question/${newQuestionId}`,
			{ replace: true },
		);
	};

	/**
	 *
	 */
	const renderQuestionNavigationButton = ({
		question,
		index,
		isActive,
		isMouseOver,
		onMouseEnter,
		onMouseLeave,
	}: QuestionNavigationButtonRenderProps<QuestionResponseType>) => {
		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: div used for hover state
			<div
				className="relative"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<QuestionNavigationButton
					isActive={isActive}
					isMouseOver={isMouseOver}
					number={index + 1}
					onClick={() => handleQuestionNavigationClick(question.id)}
				/>

				{isMouseOver && (
					<button
						type="button"
						onClick={() => handleDeleteQuestion(question.id)}
						className="absolute top-[5px] right-[5px]"
					>
						<SquareMinus size={20} className="text-color-point-50" />
					</button>
				)}
			</div>
		);
	};

	//
	//
	//
	useEffect(() => {
		if (blocker.state === "blocked") {
			confirm({
				title: "편집 중인 문제가 있습니다.",
				description:
					"페이지를 떠나시겠습니까? (편집 내용은 저장되지 않습니다.)",
			}).then((result) => {
				if (result) {
					blocker.proceed();
				} else {
					blocker.reset();
				}
			});
		}
	}, [blocker, confirm]);

	return (
		<CreationQuestionLayout>
			<QuestionNavigation
				hasAddButton
				questions={questions}
				activeQuestionId={questionId}
				onQuestionAdd={handleAddQuestion}
				renderQuestionNavigationButton={renderQuestionNavigationButton}
			/>
			{questionId !== 0 ? (
				<>
					<CreationQuestionMain />
					<CreationQuestionAdditional />
				</>
			) : (
				<div className="flex flex-1 justify-center items-center typo-heading-large">
					문제를 만들어야함
				</div>
			)}
		</CreationQuestionLayout>
	);
};

export default CreationQuestion;
