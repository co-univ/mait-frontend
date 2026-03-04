import { useEffect, useRef, useState } from "react";
import questionImage from "@/assets/images/home-second-question.png";
import SolvingBell from "@/domains/solving/components/common/SolvingBell";

//
//
//

const HomeSecondMobileSecond = () => {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	//
	//
	//
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
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
	}, []);

	return (
		<div ref={containerRef} className="w-full h-full">
			<div className="flex flex-col items-center md:gap-[76px] gap-[32px] w-full h-full md:py-[100px] py-[72px] md:px-[96px] px-[32px]">
				<h2 className="md:typo-heading-xlarge typo-heading-medium text-color-gray-80 w-full">
					Mait은 이렇게 사용할 수 있어요
				</h2>
				<div className="flex flex-col gap-[54px] items-center w-full">
					{/* 텍스트 섹션 */}
					<div className="flex flex-col gap-[20px] items-start px-[24px] w-full min-w-0">
						<div className="border border-color-primary-30 px-[20px] py-[10px] rounded-[28px]">
							<span className="typo-heading-xxsmall text-color-primary-50 whitespace-nowrap">
								실시간 퀴즈 풀이
							</span>
						</div>
						<div className="flex flex-col gap-[10px] items-start w-full">
							<p className="typo-heading-medium text-color-gray-80 w-full">
								문제셋 저장과 문제 풀이
							</p>
							<p className="md:typo-body-medium typo-body-small text-[#4d4d4d]">
								완성된 문제셋은 개인 공간이나 팀 그룹에 저장할 수 있어요. 이후
								초대한 사용자와 함께 퀴즈를 풀고, 결과를 확인하며 학습을
								이어가요.
							</p>
						</div>
					</div>

					{/* Image Container */}
					<div className="relative">
						<img
							src={questionImage}
							alt="문제셋 저장과 문제 풀이 이미지"
							className="w-full md:max-w-[480px] max-w-[300px]"
						/>
						<div className="absolute -top-[120px] left-1/2 -translate-x-1/2 size-[200px] z-10">
							<SolvingBell open={isVisible} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSecondMobileSecond;
