import { Plus } from "lucide-react";
import Button from "@/components/Button";

//
//
//

interface QuestionSetsContentHeaderProps {
	label: string;
	/** Indicator color variable (e.g., 'color-primary-50', 'color-secondary-60') */
	color?: string;
}

//
//
//

/**
 * Header for Question Sets content section.
 * Displays status badge and action button.
 */
const QuestionSetsContentHeader = ({
	label,
	color = "color-primary-50",
}: QuestionSetsContentHeaderProps) => {
	/**
	 *
	 */
	const handleCreateNewQuestion = () => {
		// TODO: Implement create new question logic
		console.log("Create new question");
	};

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex gap-gap-5 items-center">
				<div className={`w-[10px] h-[10px] rounded-full bg-${color}`} />
				<div className={`typo-heading-xsmall text-${color}`}>{label}</div>
			</div>

			<Button
				className="border border-color-gray-10"
				icon={<Plus size={20} />}
				item="새 문제 만들기"
				onClick={handleCreateNewQuestion}
			/>
		</div>
	);
};

//
//
//

export default QuestionSetsContentHeader;
