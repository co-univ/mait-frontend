import bookImage from "@/assets/images/book.png";
import flowerImage from "@/assets/images/flower.png";

//
//
//

const FEATURES = [
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

const HomeThirdMobileSecond = () => {
	return (
		<div className="w-full h-full">
			<div className="flex flex-col items-center md:gap-[84px] gap-[48px] w-full h-full md:py-[100px] py-[72px] md:px-[96px] px-[32px]">
				<h2 className="md:typo-heading-xlarge typo-heading-medium text-color-gray-80 w-full text-center">
					학습이 더 쉬워지는 기능들,
					<br />
					지금 만나보세요!
				</h2>
				<div className="flex flex-col md:gap-[48px] gap-[24px] items-center w-full">
					{FEATURES.map((feature) => (
						<div
							key={feature.title}
							className="flex flex-col justify-center items-start p-[16px] rounded-[12px] w-full max-w-[420px]"
							style={{
								background:
									"radial-gradient(68.12% 63.47% at 33.45% 30.3%, #FFF 0%, #F8FBFF 100%)",
							}}
						>
							<div className="flex h-[160px]">
								<div className="flex flex-col gap-[4px] w-full">
									<p className="typo-heading-medium text-color-gray-90">
										{feature.title}
									</p>
									<p className="typo-body-small text-color-gray-60">
										{feature.description}
									</p>
								</div>
								<img
									src={feature.image}
									alt={feature.title}
									className="self-end w-[80px]"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeThirdMobileSecond;
