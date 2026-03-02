import { Puzzle } from "lucide-react";
import Badge from "@/components/Badge";

//
//
//

interface CreationQuestionTitleInputProps {
	title: string;
	onChange: (title: string) => void;
}

//
//
//

const CreationQuestionTitleInput = ({
	title,
	onChange,
}: CreationQuestionTitleInputProps) => {
	return (
		<div className="flex-1">
			<Badge
				icon={<Puzzle />}
				item={
					<input
						type="text"
						value={title}
						placeholder="문제 셋 제목"
						onChange={(e) => onChange(e.target.value)}
						className="bg-transparent focus:outline-none w-full border-b border-color-alpha-black100"
					/>
				}
				className="!bg-color-alpha-white100 typo-heading-small"
			/>
		</div>
	);
};

export default CreationQuestionTitleInput;
