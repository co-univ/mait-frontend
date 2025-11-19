import googleLogo from "@/assets/images/google-logo.png";

//
//
//

interface AuthSocialLoginButtonProps {
	onClick: () => void;
}

//
//
//

const AuthGoogleLoginButton = ({ onClick }: AuthSocialLoginButtonProps) => {
	return (
		<button type="button" className="w-full" onClick={onClick}>
			<div className="flex items-center py-padidng-8 px-padding-10 gap-[10px] bg-[#F2F2F2] rounded-md w-full max-w-[385px] h-size-height-10 select-none">
				<img
					src={googleLogo}
					alt="구글 소셜 로고"
					className="w-[28px] h-[28px]"
				/>
				<div className="w-full flex justify-center">
					<p className="font-paperlogy text-[17px] font-medium font-color-alpha-black100">
						Google로 시작하기
					</p>
				</div>
			</div>
		</button>
	);
};

export default AuthGoogleLoginButton;
