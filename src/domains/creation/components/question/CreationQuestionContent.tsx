import AdjustableTextarea from "@/components/AdjustableTextarea";

//
//
//

interface CreationQuestionContentProps {
	value: string;
	onChange: (value: string) => void;
}

//
//
//

const CreationQuestionContent = ({
	value,
	onChange,
}: CreationQuestionContentProps) => {
	/**
	 *
	 */
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<AdjustableTextarea
			placeholder="문제를 입력하세요"
			className="w-full py-padding-9 px-padding-12 rounded-medium1 border border-color-gray-40 typo-body-large placeholder:text-color-gray-40"
			value={value}
			onChange={handleChange}
		/>
	);
};

export default CreationQuestionContent;
