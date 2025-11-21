import { useEffect, useRef, useState } from "react";
import generateImage from "@/assets/images/home-second-generate.png";
import questionImage from "@/assets/images/home-second-question.png";
import SolvingBell from "@/domains/solving/components/common/SolvingBell";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";

//
//
//

const HomeSecond = () => {
	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();

	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);

				if (entry.isIntersecting && isSidebarOpen) {
					toggleSidebarOpen();
				}
			},
			{
				threshold: 0.5, // 50% 이상 보일 때 활성화
			},
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [isSidebarOpen, toggleSidebarOpen]);

	return (
		<div
			ref={containerRef}
			className="w-full h-full px-[112px] flex items-center justify-center"
			style={{
				background: "linear-gradient(180deg, #ECF2FE 0%, #FFF 46.63%)",
			}}
		>
			<div className="w-full max-w-[980px] flex flex-col">
				{/* Title */}
				<h2 className="typo-heading-large text-color-gray-80 mb-[72px]">
					Mait은 이렇게 사용할 수 있어요
				</h2>

				{/* Sections Container */}
				<div className="w-full">
					{/* Section 1: 문제 제작 (Text Left, Image Right) */}
					<div className="flex justify-between">
						{/* Text Content */}
						<div className="flex flex-col">
							{/* Badge */}
							<div className="inline-flex items-center justify-center px-padding-10 py-padding-5 border border-color-primary-30 rounded-[28px] w-fit mb-[20px]">
								<span className="typo-heading-xxsmall text-color-primary-50">
									실시간 AI 분석
								</span>
							</div>

							{/* Title and Description */}
							<div className="flex flex-col gap-gap-5">
								<h3 className="typo-heading-medium text-color-gray-80">
									문제 제작
								</h3>
								<div className="typo-body-medium text-[#4d4d4d]">
									<p>
										입력한 자료와 주제를 기반으로 AI가 자동으로 문제를
										만들어줘요.
									</p>
									<p>
										생성된 문제는 편집 화면에서 자유롭게 수정하거나 보완할 수
										있어요.
									</p>
								</div>
							</div>
						</div>
						{/* Image Container */}
						<img
							src={generateImage}
							alt="문제 제작 이미지"
							className="w-[380px]"
						/>
					</div>

					{/* Section 2: 문제셋 저장과 문제 풀이 (Image Left, Text Right) */}
					<div className="flex justify-between items-center -mt-[68px]">
						{/* Image Container */}

						<div className="relative">
							<img
								src={questionImage}
								alt="문제셋 저장과 문제 풀이 이미지"
								className="w-[360px]"
							/>
							<div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[200px] z-10">
								<SolvingBell open={isVisible} />
							</div>
						</div>

						{/* Text Content */}
						<div className="flex flex-col">
							{/* Badge */}
							<div className="inline-flex items-center justify-center px-padding-10 py-padding-5 border border-color-primary-30 rounded-[28px] w-fit mb-[20px]">
								<span className="typo-heading-xxsmall text-color-primary-50">
									실시간 퀴즈 풀이
								</span>
							</div>

							{/* Title and Description */}
							<div className="flex flex-col gap-gap-5">
								<h3 className="typo-heading-medium text-color-gray-80">
									문제셋 저장과 문제 풀이
								</h3>
								<div className="typo-body-medium text-[#4d4d4d]">
									<p>
										완성된 문제셋은 개인 공간이나 팀 그룹에 저장할 수 있어요.
									</p>
									<p>
										이후 초대한 사용자와 함께 퀴즈를 풀고, 결과를 확인하며
										학습을 이어가요.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSecond;
