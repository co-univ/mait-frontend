import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useUser from "src/hooks/useUser";
import useLoginModalOpenStore from "src/stores/useLoginModalOpenStore";
import book from "../../assets/images/book.png";
import cube from "../../assets/images/cube.png";

//
//
//

const Home = () => {
	const { openLoginModal } = useLoginModalOpenStore();

	const { user } = useUser();

	const navigate = useNavigate();

	/**
	 * If the user is logged in, redirect to quiz-solving.
	 * If not, show the login modal.
	 */
	const handleButtonClick = () => {
		if (user) {
			navigate(`/solving/${process.env.PUBLIC_QUESTION_ID}`);
		} else {
			// openLoginModal();
			navigate("/login");
		}
	};

	return (
		<div className="w-full h-full flex items-center justify-between">
			<div className="fixed inset-0 h-screen w-screen bg-gradient-to-b from-color-alpha-white100 to-color-primary-5 -z-10" />

			<div className="h-full flex flex-col gap-gap-14 justify-center">
				<div className="flex flex-col gap-gap-9">
					<div className="typo-heading-xlarge text-color-gray-80">
						<div>빠르게 문제를 만들고,</div>
						<div>함께 풀어보세요!</div>
					</div>
					<div className="typo-body-medium text-[#4D4D4D]">
						<div>
							학습 자료나 아이디어를 기반으로, AI가 문제를 자동으로
							만들어줍니다.
						</div>
						<div>문제 제작은 간편하게, 학습은 함께 진행해보세요.</div>
					</div>
				</div>
				<div>
					<button
						type="button"
						className="py-padding-6 px-padding-8 bg-color-primary-50 typo-body-medium text-color-alpha-white100 rounded-medium1"
						onClick={handleButtonClick}
					>
						바로 시작하기
					</button>
				</div>
				<div className="h-size-height-5" />
			</div>

			<div className="relative">
				<motion.img
					src={cube}
					alt="Cube"
					className="w-[340px]"
					animate={{
						y: [0, -15, 0],
						x: [0, 10, 0],
						rotate: [0, -3, 3, 0],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 0.5,
					}}
				/>
				<motion.img
					src={book}
					alt="Book"
					className="absolute top-[-92px] left-[24px] w-[160px]"
					animate={{
						y: [0, -20, 0],
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
