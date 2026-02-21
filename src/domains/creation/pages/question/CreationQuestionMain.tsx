import { ChevronRight, Puzzle } from "lucide-react";
import { useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import CreationQuestionContent from "@/domains/creation/components/question/CreationQuestionContent";
import type { QuestionType } from "@/libs/types";
import CreationQuestionContentFillBlank from "../../components/question/CreationQuestionContentFillBlank";
import CreationQuestionImage from "../../components/question/CreationQuestionImage";
import useCreationQuestion from "../../hooks/question/_useCreationQuestion";
import useCreationQuestionSet from "../../hooks/question/_useCreationQuestionSet";
import { creationQuestionFindNumber } from "../../utils/question/creation-question-find-number";
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

	const { questionSet, questions } = useCreationQuestionSet({
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
				return <CreationQuestionAnswerMultiple />;
			case "SHORT":
				return <CreationQuestionAnswerShort />;
			case "ORDERING":
				return <CreationQuestionAnswerOrdering />;
			case "FILL_BLANK":
				return <CreationQuestionAnswerFillBlank />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex flex-1 flex-col gap-gap-11">
				<div className="flex items-center justify-between">
					<Badge
						icon={<Puzzle />}
						item={
							<span className="typo-heading-xsmall">{`Q${creationQuestionFindNumber(questions, questionId)}`}</span>
						}
						className="text-color-primary-50 !bg-color-primary-5 self-start"
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
						<CreationQuestionContentFillBlank />
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
				questionCount={questions?.length ?? 0}
				questionSetTitle={questionSet?.title || ""}
				question={
					question && {
						...question,
						number: creationQuestionFindNumber(questions, questionId),
					}
				}
				onClose={() => setIsPreviewModalOpen(false)}
			/>
		</>
	);
};

export default CreationQuestionMain;
