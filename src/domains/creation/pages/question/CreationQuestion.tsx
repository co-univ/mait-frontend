import clsx from "clsx";
import { ChevronsDown, ChevronsUp, SquareMinus } from "lucide-react";
import { useEffect, useRef } from "react";
import {
	useBeforeUnload,
	useBlocker,
	useNavigate,
	useParams,
} from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import { useConfirm } from "@/components/confirm";
import QuestionNavigation, {
	QuestionNavigationButton,
	type QuestionNavigationRef,
} from "@/components/question-navigation";
import QuestionNavigationDirectionButton from "@/components/question-navigation/QuestionNavigationDirectionButton";
import {
	useCreationQuestion,
	useCreationQuestions,
} from "@/domains/creation/hooks/question";
import CreationQuestionLayout from "@/domains/creation/layouts/question/CreationQuestionLayout";
import CreationQuestionAdditional from "@/domains/creation/pages/question/additional/CreationQuestionAdditional";
import CreationQuestionMain from "@/domains/creation/pages/question/CreationQuestionMain";
import type { QuestionNavigationButtonRenderProps } from "../../../../components/question-navigation/QuestionNavigationList";

//
//
//

const CreationQuestion = () => {
	const navigate = useNavigate();
	const questionNavigationRef = useRef<QuestionNavigationRef>(null);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions, invalidQuestions, handleAddQuestion } =
		useCreationQuestions({
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
			`/creation/question/question-set/${questionSetId}/question/${newQuestionId}`,
			{ replace: true },
		);
	};

	/**
	 *
	 */
	const renderQuestoinNaivigationUpButton = () => {
		const visibleRange = questionNavigationRef.current?.getVisibleRange();

		if (!visibleRange) {
			return (
				<QuestionNavigationDirectionButton
					onClick={() => questionNavigationRef.current?.scrollUp()}
				>
					<ChevronsUp />
				</QuestionNavigationDirectionButton>
			);
		}

		const hasInvalidAbove = invalidQuestions.some((invalidId) => {
			const index = questions.findIndex((q) => q.id === invalidId);
			return index !== -1 && index < visibleRange.startIndex;
		});

		return (
			<QuestionNavigationDirectionButton
				onClick={() => questionNavigationRef.current?.scrollUp()}
				className={clsx({
					"border !border-color-point-50": hasInvalidAbove,
				})}
			>
				<ChevronsUp />
			</QuestionNavigationDirectionButton>
		);
	};

	/**
	 *
	 */
	const renderQuestoinNavigationDownButton = () => {
		const visibleRange = questionNavigationRef.current?.getVisibleRange();

		if (!visibleRange) {
			return (
				<QuestionNavigationDirectionButton
					onClick={() => questionNavigationRef.current?.scrollDown()}
				>
					<ChevronsDown />
				</QuestionNavigationDirectionButton>
			);
		}

		const hasInvalidBelow = invalidQuestions.some((invalidId) => {
			const index = questions.findIndex((q) => q.id === invalidId);
			return index !== -1 && index > visibleRange.endIndex;
		});

		return (
			<QuestionNavigationDirectionButton
				onClick={() => questionNavigationRef.current?.scrollDown()}
				className={clsx({
					"border !border-color-point-50": hasInvalidBelow,
				})}
			>
				<ChevronsDown />
			</QuestionNavigationDirectionButton>
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
		const isInvalid = invalidQuestions.includes(question.id);

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
					className={clsx({
						"border !border-color-point-50": isInvalid,
					})}
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
				ref={questionNavigationRef}
				hasAddButton
				questions={questions}
				activeQuestionId={questionId}
				onQuestionAdd={handleAddQuestion}
				renderUpButton={renderQuestoinNaivigationUpButton}
				renderDownButton={renderQuestoinNavigationDownButton}
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
