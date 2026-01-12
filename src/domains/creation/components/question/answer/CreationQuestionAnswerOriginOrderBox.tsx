import AdjustableTextarea from "@/components/AdjustableTextarea";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { OrderingOptionApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestionAnswerOriginOrderBoxProps {
	option: OrderingOptionApiResponse;
	onContentChange: (content: string) => void;
	onOptionDelete: (optionId: number) => void;
}

//
//
//

const CreationQuestionAnswerOriginOrderBox = ({
	option,
	onContentChange,
	onOptionDelete,
}: CreationQuestionAnswerOriginOrderBoxProps) => {
	/**
	 *
	 */
	const handleOptionDelete = () => {
		onOptionDelete(option.id);
	};

	return (
		<div className="flex gap-gap-9 items-center">
			<span className="typo-heading-small">
				{String.fromCharCode(64 + option.originOrder)}
			</span>

			<div className="w-full flex items-center gap-gap-9 px-padding-11 py-padding-9 rounded-medium1 bg-color-gray-5">
				<AdjustableTextarea
					value={option.content}
					placeholder={`보기 ${option.originOrder}`}
					onChange={(e) => onContentChange(e.target.value)}
					className="w-full typo-body-large"
				/>

				<DeleteCheckBox onClick={handleOptionDelete} />
			</div>
		</div>
	);
};

export default CreationQuestionAnswerOriginOrderBox;
