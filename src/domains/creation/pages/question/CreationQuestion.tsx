import { Puzzle } from "lucide-react";
import Badge from "@/components/Badge";
import FileInput from "@/components/FileInput";
import CreationQuestionContent from "@/domains/creation/components/question/CreationQuestionContent";
import CreationQuestionMultiple from "./CreationQuestionMultiple";
import CreationQuestionOrdering from "./CreationQuestionOrdering";
import CreationQuestionShort from "./CreationQuestionShort";

//
//
//

const CreationQuestion = () => {
	return (
		<div className="flex flex-1 flex-col gap-gap-11">
			<Badge
				icon={<Puzzle />}
				item={<span className="typo-heading-xsmall">Q1</span>}
				className="text-color-primary-50 !bg-color-primary-5 self-start"
			/>

			<div className="flex w-full">
				<CreationQuestionContent />
			</div>

			<FileInput
				text="이미지 추가"
				file={null}
				onChange={() => {
					alert("축하합니다! 당신은 따봉 퀴리릭을 발견하셨습니다.");
				}}
			/>

			{/* <CreationQuestionMultiple /> */}
			{/* <CreationQuestionShort /> */}
			<CreationQuestionOrdering />
		</div>
	);
};

export default CreationQuestion;
