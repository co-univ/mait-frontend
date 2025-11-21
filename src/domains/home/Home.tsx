import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import kv from "@/assets/lotties/home1-kv.json";
import useUser from "@/hooks/useUser";

//
//
//

const LOTTIE_OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: kv,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

//
//
//

const Home = () => {
	const [width, setWidth] = useState(window.innerWidth);

	const { user } = useUser();

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		if (user) {
			navigate(`/solving/${process.env.PUBLIC_QUESTION_ID}`);
		} else {
			navigate("/login");
		}
	};

	//
	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center absolute left-0">
			<div className="flex flex-col gap-[2rem] items-center mt-11 z-10">
				<div className="flex flex-col gap-[10px] items-center">
					<h1 className="typo-heading-xlarge">
						문제 제작은 자동으로, 학습은 함께
					</h1>
					<h4 className="text-[24px] leading-lineheights-0 font-paperlogy">
						메잇으로 더 똑똑하게 학습하세요!
					</h4>
				</div>
				<button
					type="button"
					onClick={handleButtonClick}
					className="w-fit h-[50px] flex items-center justify-center py-gap-6 px-gap-10 rounded-radius-medium1 typo-heading-xsmall bg-color-primary-5 text-primary-50"
				>
					바로 시작하기
				</button>
			</div>
			<div className="mt-[-23rem] w-full flex justify-center z-0 user-select-none pointer-events-none">
				<Lottie options={LOTTIE_OPTIONS} width={width} />
			</div>
		</div>
	);
};

export default Home;
