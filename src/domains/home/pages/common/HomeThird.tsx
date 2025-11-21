import bookImage from "@/assets/images/book.png";
import cubeImage from "@/assets/images/cube.png";
import flowerImage from "@/assets/images/flower.png";

//
//
//

const FEATURES = [
	{
		title: "문제셋 검색",
		description: "공개된 문제셋을 검색해 북마크하거나 그룹에 추가할 수 있어요.",
		image: bookImage,
	},
	{
		title: "팀 협업",
		description: "팀원을 초대해 함께 문제를 만들고\n풀 수 있어요.",
		image: cubeImage,
	},
	{
		title: "통계 확인",
		description:
			"문제 정답률과 참석 현황을 시각화해\n학습 흐름을 분석할 수 있어요.",
		image: flowerImage,
	},
	{
		title: "개인 학습 공간",
		description: "혼자 문제셋을 만들고 관리할 수 있는\n비공개 공간이 제공돼요.",
		image: bookImage,
	},
];

//
//
//

const HomeThird = () => {
	return (
		<div className="w-full h-full bg-alpha-white100 flex items-center justify-center px-[172px] py-[112px]">
			<div className="w-full max-w-[1095px] flex flex-col gap-gap-13 items-center">
				{/* Title */}
				<h2 className="typo-heading-large text-color-gray-80 text-center">
					학습이 더 쉬워지는 기능들,
					<br />
					지금 만나보세요!
				</h2>

				{/* Grid Container */}
				<div className="w-full grid grid-cols-2 gap-gap-10">
					{FEATURES.map((feature, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: static list for publishing purpose
							key={index}
							className="h-[200px] relative rounded-radius-xlarge1 p-padding-8 flex flex-col justify-between"
							style={{
								background:
									"radial-gradient(circle at 178px 80px, rgba(255,255,255,1) 0%, rgba(248,251,255,1) 100%)",
							}}
						>
							{/* Text Content */}
							<div className="flex flex-col gap-gap-1">
								<h3 className="typo-heading-medium text-[#0d0d0d]">
									{feature.title}
								</h3>
								<p className="typo-body-small text-[#4d4d4d] whitespace-pre-line w-[240px]">
									{feature.description}
								</p>
							</div>

							{/* Image Placeholder */}
							<div className="absolute bottom-[12px] right-[12px]">
								<img
									src={feature.image}
									alt={feature.title}
									className="w-[112px]"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeThird;
