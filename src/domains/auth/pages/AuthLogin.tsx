import AuthEmailLogin from "../components/AuthEmailLogin";
import AuthLoginButton from "../components/AuthSocialLoginButton";

//
//
//

const AuthLogin = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-[2rem]">
			<h2 className="text-center font-paperlogy text-color-alpha-black100 font-bold text-[2rem]">
				MAIT 로그인
			</h2>
			<div className="w-full max-w-[449px] p-5 bg-color-alpha-white100 rounded-radius-medium1 flex flex-col justify-center gap-[2rem]">
				<AuthLoginButton />
				<div className="w-full relative flex items-center justify-center gap-gap-4">
					<div className="w-full h-[1px] bg-color-gray-10 absolute"></div>
					<span className="relative px-gap-4 leading-lineheights-0 top-0 bg-alpha-white100 font-pretendard text-[15px] font-normal select-none">
						또는
					</span>
				</div>
				<AuthEmailLogin />
			</div>
		</div>
	);
};

export default AuthLogin;
