import clsx from "clsx";
import { Dices } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { apiClient } from "@/libs/api";
import type { LatestPoliciesApiResponse } from "@/libs/types";
import AuthCard from "../components/AuthCard";
import AuthTerms from "../components/AuthTerms";

//
//
//

const REGEX_NICKNAME = /^[a-zA-Z0-9가-힣]{2,20}$/;

//
//
//

export type TERM_CHECK_TYPE = {
	policyId: number;
	isChecked: boolean;
};

//
//
//

const AuthCreateAccount = () => {
	const [nickname, setNickname] = useState("");
	const [isNicknameValid, setIsNicknameValid] = useState(true);
	const [terms, setTerms] = useState<LatestPoliciesApiResponse[]>([]);
	const [termChecks, setTermChecks] = useState<TERM_CHECK_TYPE[]>([]);

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputNickname = e.target.value;
		if (!REGEX_NICKNAME.test(inputNickname)) {
			setIsNicknameValid(false);
		} else {
			setIsNicknameValid(true);
		}
		setNickname(inputNickname);
	};

	/**
	 *
	 */
	const getRandomNickname = async () => {
		try {
			const response = await apiClient.GET("/api/v1/users/nickname/random");
			setNickname(response?.data?.data?.nickname || "");
		} catch (error) {
			console.log("랜덤 닉네임 생성 실패:", error);
		}
	};

	/**
	 *
	 */
	const getAgreementList = async () => {
		try {
			const response = await apiClient.GET("/api/v1/policies", {
				params: {
					query: {
						timing: "SIGN_UP",
					},
				},
			});
			const termsData = response.data?.data || [];
			setTerms(termsData);

			// 약관 동의 상태 초기화
			const initialTermChecks: TERM_CHECK_TYPE[] = termsData.map(
				(termCheck) => ({
					policyId: termCheck.id,
					isChecked: true,
				}),
			);
			setTermChecks(initialTermChecks);
		} catch (error) {
			console.error("약관 목록 조회 실패:", error);
		}
	};

	/**
	 *
	 */
	const handleButtonClick = async () => {
		try {
			const response = await apiClient.POST("/api/v1/users/sign-up", {
				body: {
					nickname: nickname,
					policyChecks: termChecks,
				},
			});

			const accessToken = response.response.headers.get("Authorization");
			if (accessToken) {
				localStorage.setItem("accessToken", accessToken);
			}

			if (response.data?.isSuccess) {
				navigate("success");
			}
		} catch (error) {
			console.error("계정 생성하기 실패: ", error);
		}
	};

	//
	useEffect(() => {
		getRandomNickname();
		getAgreementList();
	}, []);

	return (
		<AuthCard title="계정 생성하기">
			<div className="w-full relative flex items-center justify-center gap-gap-4">
				<div className="bg-gray-10 h-[1px] w-full absolute"></div>
				<h3 className="relative bg-alpha-white100 select-none px-gap-4 text-black typo-body-large-bold font-pretendard">
					계정 생성 마지막 단계입니다!
				</h3>
			</div>
			<p className="text-alpha-black100 typo-body-small font-pretendard">
				MAIT을 이용하시려면 닉네임을 설정하고 약관에 동의해 주세요.
				<br />
				닉네임은 서비스 내에서 표시되는 이름으로, 수정 가능합니다.
			</p>

			<div className="flex flex-col gap-padding-3">
				<div className="relative w-full">
					<input
						type="text"
						value={nickname}
						placeholder={nickname}
						className={clsx(
							"w-full h-[47px] py-gap-6 px-gap-8 flex flex-col items-start rounded-radius-medium1 border-[1px] border-gray-20 focus:outline-none",
							{
								"focus:border-danger-50 focus:ring-danger-50 border-danger-50 border-[2px]":
									!isNicknameValid,
								"focus:border-primary-50 focus:ring-primary-50 focus:ring-1":
									isNicknameValid,
							},
						)}
						onChange={handleNicknameChange}
					/>
					<Dices
						className="absolute top-[11px] right-2 text-gray-50 cursor-pointer active:text-primary-50"
						onClick={getRandomNickname}
					/>
				</div>
				<p
					className={clsx("typo-body-xsmall font-pretendard", {
						"text-danger-50": !isNicknameValid,
						"text-gray-50": isNicknameValid,
					})}
				>
					닉네임은 2~20자로 입력할 수 있습니다.
				</p>
			</div>

			<div className="bg-color-gray-10 h-[1px] w-full"></div>
			<AuthTerms
				terms={terms}
				termChecks={termChecks}
				setTermChecks={setTermChecks}
			/>
			<Button
				className="bg-primary-50 h-[50px] w-full flex justify-center text-alpha-white100"
				item={<p>계정 생성하기</p>}
				onClick={handleButtonClick}
			/>
		</AuthCard>
	);
};

export default AuthCreateAccount;
