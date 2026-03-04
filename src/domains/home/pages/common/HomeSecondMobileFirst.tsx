import generateImage from "@/assets/images/home-second-generate.png";

//
//
//

const HomeSecondMobileFirst = () => {
	return (
		<div
			className="w-full h-full"
			style={{
				background: "linear-gradient(180deg, #ECF2FE 0%, #FFF 46.63%)",
			}}
		>
			<div className="flex flex-col items-center md:gap-[76px] gap-[32px] w-full h-full md:py-[100px] py-[72px] md:px-[96px] px-[32px]">
				<h2 className="md:typo-heading-xlarge typo-heading-medium text-color-gray-80 w-full">
					Mait은 이렇게 사용할 수 있어요
				</h2>
				<div className="flex flex-col gap-[54px] items-center w-full">
					{/* 텍스트 섹션 */}
					<div className="flex flex-col gap-[20px] items-start px-[24px] w-full min-w-0">
						<div className="border border-color-primary-30 px-[20px] py-[10px] rounded-[28px]">
							<span className="typo-heading-xxsmall text-color-primary-50 whitespace-nowrap">
								실시간 AI 분석
							</span>
						</div>
						<div className="flex flex-col gap-[10px] items-start w-full">
							<p className="typo-heading-medium text-color-gray-80 w-full">
								문제 제작
							</p>
							<p className="md:typo-body-medium typo-body-small text-[#4d4d4d]">
								입력한 자료와 주제를 기반으로 AI가 자동으로 문제를 만들어줘요.
								생성된 문제는 편집 화면에서 자유롭게 수정하거나 보완할 수있어요.
							</p>
						</div>
					</div>

					{/* Image Container */}
					<img
						src={generateImage}
						alt="문제 제작 이미지"
						className="w-full md:max-w-[480px] max-w-[300px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeSecondMobileFirst;
