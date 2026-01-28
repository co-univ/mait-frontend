import clsx from "clsx";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import DeleteCheckBox from "@/components/DeleteCheckBox";

//
//
//

interface ControlSolvingQuestionAnswerSubContentProps {
	editable?: boolean;
	content: string;
	onChange: (newContent: string) => void;
	onDelete: () => void;
}

//
//
//

const ControlSolvingQuestionAnswerSubContent = ({
	editable = false,
	content,
	onChange,
	onDelete,
}: ControlSolvingQuestionAnswerSubContentProps) => {
	return (
		<div
			className={clsx(
				"w-full flex justify-between p-padding-6 border rounded-radius-medium1",
				{
					"bg-color-gray-10 border-none text-color-alpha-black100 typo-body-medium":
						!editable,
					"bg-color-primary-5 border-color-primary-50 text-color-primary-50 typo-body-medium1":
						editable,
				},
			)}
		>
			{editable && (
				<div className="w-full flex items-center gap-gap-8">
					<AdjustableTextarea
						value={content}
						onChange={(e) => onChange(e.target.value)}
						className="w-full typo-heading-xsmall"
					/>
					<DeleteCheckBox onClick={onDelete} />
				</div>
			)}
			{!editable && <p>{content}</p>}
		</div>
	);
};

export default ControlSolvingQuestionAnswerSubContent;
