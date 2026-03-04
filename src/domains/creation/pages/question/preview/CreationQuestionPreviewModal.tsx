import { useState } from "react";
import { LARGE_PAGE_MARGIN, type QuestionResponseType } from "@/app.constants";
import Modal from "@/components/modal/Modal";
import QuestionContent from "@/components/QuestionContent";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import CreationQuestionPreviewModalCloseButton from "@/domains/creation/components/question/preview/CreationQuestionPreviewModalCloseButton";
import CreationQuestionPreviewModalHeader from "@/domains/creation/components/question/preview/CreationQuestionPreviewModalHeader";
import {
	useCreationQuestion,
	useCreationQuestionSet,
} from "@/domains/creation/hooks/question";
import SolvingQuizImage from "@/domains/solving/components/common/SolvingQuizImage";
import SolvingLayout from "@/domains/solving/layouts/common/SolvingLayout";
import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	QuestionType,
	ShortQuestionApiResponse,
} from "@/libs/types";
import CreationQuestionPreviewModalFillBlankAnswers from "./CreationQuestionPreviewModalFillBlankAnswers";
import CreationQuestionPreviewModalMultipleAnswers from "./CreationQuestionPreviewModalMultipleAnswers";
import CreationQuestionPreviewModalOrderingAnswers from "./CreationQuestionPreviewModalOrderingAnswers";
import CreationQuestoinPreviewModalShortAnswers from "./CreationQuestoinPreviewModalShortAnswers";

//
//
//

interface CreationQuestionPreviewModalProps {
	open: boolean;
	questionSetId: number;
	questionId: number;
	onClose: () => void;
}

//
//
//

const CreationQuestionPreviewModal = ({
	open,
	questionSetId,
	questionId,
	onClose,
}: CreationQuestionPreviewModalProps) => {
	const [activeQuestionId, setActiveQuestionId] = useState(questionId);

	const { questions } = useCreationQuestionSet({
		questionSetId,
	});
	const { question } = useCreationQuestion({
		questionSetId,
		questionId: activeQuestionId,
	});

	/**
	 *
	 */
	const renderQuestionNavigationButton = ({
		question,
		index,
		isActive,
		isMouseOver,
	}: QuestionNavigationButtonRenderProps<QuestionResponseType>) => {
		return (
			<QuestionNavigationButton
				isActive={isActive}
				isMouseOver={isMouseOver}
				number={index + 1}
				onClick={() => setActiveQuestionId(question.id)}
			/>
		);
	};

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		switch (question?.type as QuestionType) {
			case "MULTIPLE":
				return (
					<CreationQuestionPreviewModalMultipleAnswers
						question={question as MultipleQuestionApiResponse}
					/>
				);
			case "SHORT":
				return (
					<CreationQuestoinPreviewModalShortAnswers
						question={question as ShortQuestionApiResponse}
					/>
				);
			case "ORDERING":
				return (
					<CreationQuestionPreviewModalOrderingAnswers
						question={question as OrderingQuestionApiResponse}
					/>
				);
			case "FILL_BLANK":
				return (
					<CreationQuestionPreviewModalFillBlankAnswers
						question={question as FillBlankQuestionApiResponse}
					/>
				);
		}
	};

	return (
		<Modal open={open} showCloseButton={false} onClose={onClose}>
			<div className="relative h-screen w-screen flex flex-col bg-color-alpha-white100 overflow-scroll">
				<CreationQuestionPreviewModalHeader />
				<CreationQuestionPreviewModalCloseButton onClose={onClose} />

				<div
					className="h-full"
					style={{
						padding: `0 ${LARGE_PAGE_MARGIN}px`,
					}}
				>
					<SolvingLayout>
						<QuestionNavigation
							orientation="horizontal"
							activeQuestionId={activeQuestionId}
							questions={questions || []}
							renderQuestionNavigationButton={renderQuestionNavigationButton}
						/>

						<QuestionContent content={question?.content || ""} />

						<SolvingQuizImage src={question?.imageUrl} />

						<div className="h-full flex items-end">
							{renderQuestionAnswers()}
						</div>
					</SolvingLayout>
				</div>
			</div>
		</Modal>
	);
};

export default CreationQuestionPreviewModal;
