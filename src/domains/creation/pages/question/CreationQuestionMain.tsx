import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Button from "@/components/Button";
import CreationQuestionContent from "@/domains/creation/components/question/CreationQuestionContent";
import type { QuestionType } from "@/libs/types";
import CreationQuestionContentFillBlank from "../../components/question/CreationQuestionContentFillBlank";
import CreationQuestionImage from "../../components/question/CreationQuestionImage";
import CreationQuestionTitleInput from "../../components/question/CreationQuestionTitleInput";
import useCreationQuestion from "../../hooks/question/useCreationQuestion";
import useCreationQuestionSet from "../../hooks/question/useCreationQuestionSet";
import CreationQuestionAnswerFillBlank from "./answer/CreationQuestionAnswerFillBlank";
import CreationQuestionAnswerMultiple from "./answer/CreationQuestionAnswerMultiple";
import CreationQuestionAnswerOrdering from "./answer/CreationQuestionAnswerOrdering";
import CreationQuestionAnswerShort from "./answer/CreationQuestionAnswerShort";
import CreationQuestionPreviewModal from "./preview/CreationQuestionPreviewModal";

//
//
//

interface CreationQuestionMainProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionMain = ({
	questionSetId,
	questionId,
}: CreationQuestionMainProps) => {
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

	const { questionSet, changeQuestionSetTitle } = useCreationQuestionSet({
		questionSetId,
	});

	const { question, changeContent, addImage, deleteImage, isImageUploading } =
		useCreationQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const renderQuestionAnswer = () => {
		switch (question?.type as QuestionType) {
			case "MULTIPLE":
				return (
					<CreationQuestionAnswerMultiple
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "SHORT":
				return (
					<CreationQuestionAnswerShort
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "ORDERING":
				return (
					<CreationQuestionAnswerOrdering
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "FILL_BLANK":
				return (
					<CreationQuestionAnswerFillBlank
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex flex-1 flex-col gap-gap-11">
				<div className="flex items-center justify-between gap-gap-5">
					<CreationQuestionTitleInput
						title={questionSet?.title || ""}
						onChange={changeQuestionSetTitle}
					/>
					<Button
						icon={<ChevronRight />}
						item="미리보기"
						className="flex-row-reverse"
						onClick={() => setIsPreviewModalOpen(true)}
					/>
				</div>

				<div className="flex w-full">
					{(question?.type as QuestionType) === "FILL_BLANK" ? (
						<CreationQuestionContentFillBlank
							questionSetId={questionSetId}
							questionId={questionId}
						/>
					) : (
						<CreationQuestionContent
							value={question?.content || ""}
							onChange={changeContent}
						/>
					)}
				</div>

				<CreationQuestionImage
					imageUrl={question?.imageUrl || ""}
					onChange={addImage}
					onDelete={deleteImage}
					isLoading={isImageUploading}
				/>

				{renderQuestionAnswer()}
			</div>

			<CreationQuestionPreviewModal
				open={isPreviewModalOpen}
				questionSetId={questionSetId}
				questionId={questionId}
				onClose={() => setIsPreviewModalOpen(false)}
			/>
		</>
	);
};

export default CreationQuestionMain;
