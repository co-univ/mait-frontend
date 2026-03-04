import clsx from "clsx";
import { ChevronsDown, ChevronsUp, SquareMinus } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionNavigation, {
	QuestionNavigationButton,
	type QuestionNavigationRef,
} from "@/components/question-navigation";
import QuestionNavigationDirectionButton from "@/components/question-navigation/QuestionNavigationDirectionButton";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";
import useCreationQuestion from "../../hooks/question/useCreationQuestion";
import useCreationQuestionSet from "../../hooks/question/useCreationQuestionSet";

//
//
//

interface CreationQuestionNavigationProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionNavigation = ({
	questionSetId,
	questionId,
}: CreationQuestionNavigationProps) => {
	const questionNavigationRef = useRef<QuestionNavigationRef>(null);

	const { questions, addQuestion, deleteQuestion, invalidQuestions } =
		useCreationQuestionSet({
			questionSetId,
		});

	const { saveQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationButtonClick = (newQuestionId: number) => {
		saveQuestion();

		navigate(
			createPath(CREATION_ROUTE_PATH.QUESTION, {
				questionSetId,
				questionId: newQuestionId,
			}),
			{
				replace: true,
			},
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

		const hasInvalidAbove = invalidQuestions?.some((invalidQuestion) => {
			const index = questions?.findIndex(
				(question) => question.id === invalidQuestion.questionId,
			);
			return (
				index !== undefined && index !== -1 && index < visibleRange.startIndex
			);
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

		const hasInvalidBelow = invalidQuestions?.some((invalidQuestion) => {
			const index = questions?.findIndex(
				(question) => question.id === invalidQuestion.questionId,
			);
			return (
				index !== undefined && index !== -1 && index > visibleRange.endIndex
			);
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
		const isInvalid = invalidQuestions?.some(
			(invalidQuestion) => invalidQuestion.questionId === question.id,
		);

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
					onClick={() => handleQuestionNavigationButtonClick(question.id)}
					className={clsx({
						"border !border-color-point-50": isInvalid,
					})}
				/>

				{isMouseOver && (
					<button
						type="button"
						onClick={() =>
							deleteQuestion({
								currentQuestionId: questionId,
								targetQuestionId: question.id,
							})
						}
						className="absolute top-[5px] right-[5px]"
					>
						<SquareMinus size={20} className="text-color-point-50" />
					</button>
				)}
			</div>
		);
	};

	return (
		<QuestionNavigation
			ref={questionNavigationRef}
			hasAddButton
			questions={questions ?? []}
			activeQuestionId={questionId}
			onQuestionAdd={addQuestion}
			renderUpButton={renderQuestoinNaivigationUpButton}
			renderDownButton={renderQuestoinNavigationDownButton}
			renderQuestionNavigationButton={renderQuestionNavigationButton}
		/>
	);
};

export default CreationQuestionNavigation;
