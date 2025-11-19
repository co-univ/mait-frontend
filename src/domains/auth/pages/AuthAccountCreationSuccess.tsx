import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/mait-logo.svg";

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
			<img src={logo} alt="Mait Logo" className="w-[150px] h-auto mb-[2rem]" />
			<h2
				className="text-center typo-heading-xlarge mb-[1rem]"
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
