/** biome-ignore-all lint/nursery/useUniqueElementIds: ex */

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckBox from "@/components/CheckBox";
import { useLogin } from "@/hooks/useAuth";

//
//
//

const AuthEmailLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isRememberEmail, setIsRememberEmail] = useState(false);

	const loginMutation = useLogin();

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			alert("이메일과 비밀번호를 입력해주세요.");
			return;
		}

		try {
			await loginMutation.mutateAsync({ email, password });
			setEmail("");
			setPassword("");
			navigate("/");
		} catch (error) {
			console.error("로그인 실패:", error);
			alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
		}
	};

	return (
		<div className="flex items-center justify-center font-paperlogy">
			<div className="w-full">
				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<p className="mb-1 block text-[15px] font-medium">이메일 로그인</p>
						<div className="flex flex-col gap-[10px] placeholder:text-color-gray-30 text-alpha-black100 text-[15px] font-medium select-none">
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="이메일"
								className="w-full rounded-radius-medium1 border border-gray-20 px-gap-8 py-gap-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								disabled={loginMutation.isPending}
							/>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="비밀번호"
									className="w-full rounded-radius-medium1 border border-gray-20 px-gap-8 py-gap-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									disabled={loginMutation.isPending}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
								>
									{showPassword ? (
										<EyeOff className="w-3 h-3 text-gray-30" />
									) : (
										<Eye className="w-3 h-3 text-gray-30" />
									)}
								</button>
							</div>
						</div>

						{/* Remember Email */}
						<div className="flex items-center gap-gap-4 mt-[10px]">
							<CheckBox
								checked={isRememberEmail}
								size={20}
								onChange={setIsRememberEmail}
							/>
							<p
								className={clsx(
									"text-[13px] font-medium select-none",
									{ "text-[#CDD1D5]": !isRememberEmail },
									{ "text-alpha-black100": isRememberEmail },
								)}
							>
								이메일 저장
							</p>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={
							loginMutation.isPending || !email.trim() || !password.trim()
						}
						className="w-full rounded-md bg-primary-50 px-4 py-2 text-[17px] font-medium text-white focus:outline-none cursor-pointer select-none"
					>
						{loginMutation.isPending ? "로그인 중..." : "로그인"}
					</button>

					{/* Forgot Password */}
					<div className="flex justify-between text-[15px] gap-[12px] text-[#969DA6]">
						<button type="button">회원가입</button>
						<div className="flex gap-[10px] items-center">
							<button type="button">아이디 찾기</button>
							<div className="w-[1px] h-[15px] bg-gray-10"></div>
							<button type="button">비밀번호 찾기</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthEmailLogin;
