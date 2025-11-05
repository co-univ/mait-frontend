import { Puzzle } from "lucide-react";
import { useParams } from "react-router-dom";
import Badge from "@/components/Badge";
import FileInput from "@/components/FileInput";
import CreationQuestionContent from "@/domains/creation/components/question/CreationQuestionContent";
import useCreationQuestion from "@/domains/creation/hooks/question/useCreationQuestion";
import type { QuestionType } from "@/libs/types";
import CreationQuestionContentFillBlank from "../../components/question/CreationQuestionContentFillBlank";
import CreationQuestionAnswerFillBlank from "./answer/CreationQuestionAnswerFillBlank";
import CreationQuestionAnswerMultiple from "./answer/CreationQuestionAnswerMultiple";
import CreationQuestionAnswerOrdering from "./answer/CreationQuestionAnswerOrdering";
import CreationQuestionAnswerShort from "./answer/CreationQuestionAnswerShort";

//
//
//

const CreationQuestionMain = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { question, handleContentChange } = useCreationQuestion({
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
		<div className="flex flex-1 flex-col gap-gap-11">
			<Badge
				icon={<Puzzle />}
				item={
					<span className="typo-heading-xsmall">{`Q${question?.number || 0}`}</span>
				}
				className="text-color-primary-50 !bg-color-primary-5 self-start"
			/>

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

			<FileInput
				text="이미지 추가"
				file={null}
				onChange={() => {
					alert("축하합니다! 당신은 따봉 퀴리릭을 발견하셨습니다.");
				}}
			/>

			{renderQuestionAnswer()}
		</div>
	);
};

export default CreationQuestionMain;
