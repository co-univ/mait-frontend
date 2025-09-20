import AdjustableTextarea from "@/components/AdjustableTextarea";

//
//
//

const CreationQuestionContent = () => {
	return (
		<AdjustableTextarea
			placeholder="문제를 입력하세요"
			className="w-full py-padding-9 px-padding-12 rounded-medium1 border border-color-gray-40 typo-body-large placeholder:text-color-gray-40"
		/>
	);
};

export default CreationQuestionContent;
