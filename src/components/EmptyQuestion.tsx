import chartClipImage from "@/assets/images/chart-clip.png";

//
//
//

const EmptyQuestion = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center gap-gap-5">
			<img src={chartClipImage} alt="empty state" className="size-[100px]" />
			<span className="text-color-gray-30 typo-body-medium">
				원하는 문제를 생성해볼래요?
			</span>
		</div>
	);
};

export default EmptyQuestion;
