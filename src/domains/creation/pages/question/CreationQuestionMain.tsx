import { ChevronRight, Puzzle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import CreationQuestionContent from "@/domains/creation/components/question/CreationQuestionContent";
import useCreationQuestion from "@/domains/creation/hooks/question/useCreationQuestion";
import { apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import CreationQuestionContentFillBlank from "../../components/question/CreationQuestionContentFillBlank";
import CreationQuestionImage from "../../components/question/CreationQuestionImage";
import { useCreationQuestions } from "../../hooks/question";
import { creationQuestionFindNumber } from "../../utils/question/creation-question-find-number";
import CreationQuestionAnswerFillBlank from "./answer/CreationQuestionAnswerFillBlank";
import CreationQuestionAnswerMultiple from "./answer/CreationQuestionAnswerMultiple";
import CreationQuestionAnswerOrdering from "./answer/CreationQuestionAnswerOrdering";
import CreationQuestionAnswerShort from "./answer/CreationQuestionAnswerShort";
import CreationQuestionPreviewModal from "./preview/CreationQuestionPreviewModal";

//
//
//

const CreationQuestionMain = () => {
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { data } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const questionSet = data?.data;

	const { questions } = useCreationQuestions({ questionSetId });

	const {
		question,
		handleContentChange,
		handleImageChange,
		handleImageAdd,
		isUploadingImage,
	} = useCreationQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const renderQuestionImage = () => {
		if (question?.imageUrl) {
			return (
				<CreationQuestionImage
					imageUrl={question.imageUrl}
					onDelete={() => handleImageChange(undefined, undefined)}
				/>
			);
		}

		return (
			<FileInput
				text="이미지 추가"
				accept=".jpg,.jpeg,.png,.svg"
				file={null}
				onChange={handleImageAdd}
				isLoading={isUploadingImage}
			/>
		);
	};

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
							onChange={handleContentChange}
						/>
					)}
				</div>

				{renderQuestionImage()}

				{renderQuestionAnswer()}
			</div>

			<CreationQuestionPreviewModal
				open={isPreviewModalOpen}
				questionCount={questions.length}
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
