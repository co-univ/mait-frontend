import { Plus } from "lucide-react";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import Button from "@/components/Button";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ShortAnswerApiResponse } from "@/libs/types";
import CreationQuestionAnswerSubstituteBox from "./CreationQuestionAnswerSubstituteBox";

//
//
//

interface CreationQuestionAnswerFillBlankBoxProps {
	answers: ShortAnswerApiResponse[];
	onAnswerChange: (answerId: number, newAnswer: string) => void;
	onSubAnswerAdd: (number: number) => void;
	onMainAnswerDelete: (number: number) => void;
	onSubAnswerDelete: (answerId: number) => void;
}

//
//
//

const CreationQuestionAnswerFillBlankBox = ({
	answers,
	onAnswerChange,
	onSubAnswerAdd,
	onMainAnswerDelete,
	onSubAnswerDelete,
}: CreationQuestionAnswerFillBlankBoxProps) => {
	const mainAnswer = answers.find((answer) => answer.isMain);

	const subAnswers = answers.filter((answer) => !answer.isMain);

	/**
	 *
	 */
	const handleMainAnswerChange = (newAnswer: string) => {
		if (mainAnswer) {
			onAnswerChange(mainAnswer.id, newAnswer);
		}
	};

	/**
	 *
	 */
	const handleSubAnswerAdd = () => {
		if (mainAnswer) {
			onSubAnswerAdd(mainAnswer.number);
		}
	};

	/**
	 *
	 */
	const renderSubAnswers = () => {
		return subAnswers.map((answer) => {
			/**
			 *
			 */
			const handleSubAnswerChange = (newAnswer: string) => {
				onAnswerChange(answer.id, newAnswer);
			};

			return (
				<CreationQuestionAnswerSubstituteBox
					key={answer.id}
					answer={answer}
					onAnswerChange={handleSubAnswerChange}
					onSubAnswerDelete={onSubAnswerDelete}
				/>
			);
		});
	};

	return (
		<div className="flex items-center gap-gap-9">
			<span className="typo-heading-small">({mainAnswer?.number})</span>
			<div className="w-full flex flex-col px-padding-11 py-padding-9 rounded-medium1 bg-color-gray-5">
				<div className="flex items-center gap-gap-9">
					<AdjustableTextarea
						value={mainAnswer?.answer || ""}
						onChange={(e) => handleMainAnswerChange(e.target.value)}
						placeholder="빈칸 답안"
						className="flex-1 typo-body-large"
					/>

					<div className="flex gap-gap-5 items-center">
						<Button
							icon={<Plus />}
							item="인정 답안"
							className="bg-color-gray-10"
							onClick={handleSubAnswerAdd}
						/>
						<DeleteCheckBox
							onClick={() => onMainAnswerDelete(mainAnswer?.number || 0)}
						/>
					</div>
				</div>

				{subAnswers.length > 0 && <div className="h-size-height-2" />}

				<div className="flex flex-col gap-gap-6">{renderSubAnswers()}</div>
			</div>
		</div>
	);
};

export default CreationQuestionAnswerFillBlankBox;
