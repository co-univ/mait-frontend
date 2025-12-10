import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import logoSpin from "@/assets/lotties/mait-logo-spin.json";

//
//
//

const OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: logoSpin,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

//
//
//

const AuthAccountCreationSuccess = () => {
	const navigate = useNavigate();

	setTimeout(() => {
		navigate("/");
	}, 3000);

	return (
		<div className="fixed inset-0 flex flex-col justify-center items-center">
			<Lottie options={OPTIONS} width={150} height={150} />
			<h2
				className="text-center typo-heading-large mb-[1rem]"
				style={{
					background:
						"linear-gradient(90deg, var(--color-text-Primary, #256EF4) 0%, var(--color-text-Secondary, #6325F4) 100%)",
					backgroundClip: "text",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
				}}
			>
				계정 생성이 완료되었어요!
			</h2>
		</div>
	);
};

export default AuthAccountCreationSuccess;
