import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthEmailLogin from "../components/AuthEmailLogin";
import AuthGoogleLogin from "../components/AuthGoogleLogin";

//
//
//

const AuthLogin = () => {
	const [searchParams] = useSearchParams();

	//
	//
	//
	useEffect(() => {
		const redirectUrl = searchParams.get("redirect");
		if (redirectUrl) {
			localStorage.setItem("redirectAfterLogin", redirectUrl);
		}
	}, [searchParams]);

	return (
		<AuthCard title="MAIT 로그인">
			<AuthGoogleLogin />
			<div className="w-full relative flex items-center justify-center gap-gap-4">
				<div className="w-full h-[1px] bg-color-gray-10 absolute" />
				<span className="relative px-gap-4 leading-lineheights-0 top-0 bg-alpha-white100 font-pretendard text-[15px] font-normal select-none">
					또는
				</span>
			</div>
			<AuthEmailLogin />
		</AuthCard>
	);
};

export default AuthLogin;
