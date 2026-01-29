import { LARGE_PAGE_MARGIN, type QuestionResponseType } from "@/app.constants";
import Modal from "@/components/modal/Modal";
import QuestionContent from "@/components/QuestionContent";
import CreationQuestionPreviewModalCloseButton from "@/domains/creation/components/question/preview/CreationQuestionPreviewModalCloseButton";
import CreationQuestionPreviewModalHeader from "@/domains/creation/components/question/preview/CreationQuestionPreviewModalHeader";
import SolvingQuizImage from "@/domains/solving/components/common/SolvingQuizImage";
import SolvingTopBar from "@/domains/solving/components/common/topbar";
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
	questionCount: number;
	questionSetTitle: string;
	question?: QuestionResponseType;
	onClose: () => void;
}

//
//
//

const CreationQuestionPreviewModal = ({
	open,
	questionCount,
	questionSetTitle,
	question,
	onClose,
}: CreationQuestionPreviewModalProps) => {
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

	if (!question) {
		onClose();

		return null;
	}

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
						<SolvingTopBar
							disabled={false}
							questionNum={question.number ?? 0}
							questionCount={questionCount}
							quizTitle={questionSetTitle}
							onSubmit={() => {}}
						/>
						<QuestionContent content={question.content || ""} />

						<SolvingQuizImage src={question.imageUrl} />

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
