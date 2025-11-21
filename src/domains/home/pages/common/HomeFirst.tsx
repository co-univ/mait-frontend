import { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import homeFirstLottie from "@/assets/lotties/home-first-lottie.json";
import Button from "@/components/Button";
import Header from "@/components/header/Header";
import useUser from "@/hooks/useUser";
import yeah from "./yeah.png";

//
//
//

const LOTTIE_OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: homeFirstLottie,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

//
//
//

const HomeFirst = () => {
	const lottieRef = useRef<HTMLDivElement>(null);

	const { user } = useUser();

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		if (user) {
			navigate("/solving");
		} else {
			navigate("/login");
		}
	};

	//
	useEffect(() => {
		const handleResize = () => {
			if (lottieRef.current) {
				const width = lottieRef.current.offsetWidth;
				lottieRef.current.style.height = `${(width * 3) / 4}px`;
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="w-full h-full relative">
			<Header />
			<div
				className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
				style={{
					background:
						"linear-gradient(180deg, #FFF 0%, #ECF2FE 89.42%, #ECF2FE 100%)",
				}}
			>
				<div className="relative mb-[10vh] z-10 h-full flex flex-col gap-gap-11 items-center justify-center">
					<div className="flex-1" />
					<div className="flex flex-col gap-gap-5 items-center">
						<h1 className="2xl:typo-display-large xl:typo-heading-xlarge typo-heading-large ">
							문제 제작은 자동으로, 학습은 함께
						</h1>
						<h4 className="2xl:typo-heading-large xl:typo-heading-medium !font-medium text-[#4D4D4D] typo-heading-small">
							메잇으로 더 똑똑하게 학습하세요!
						</h4>
					</div>
					<Button
						item="바로 시작하기"
						className="py-padding-6 px-padding-11 border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50"
						onClick={handleButtonClick}
					/>
				</div>
				<div
					ref={lottieRef}
					className="w-full h-[40vh] px-[10vw] overflow-visible pointer-events-none"
				>
					<Lottie options={LOTTIE_OPTIONS} width="100%" />
					{/* <img src={yeah} alt="yeah" className="w-full h-auto" /> */}
				</div>
				{/* <div className="absolute inset-0 pointer-events-none">
				</div> */}
			</div>
		</div>
	);
};

export default HomeFirst;
