import Button from "@/components/Button";
import AuthCard from "../components/AuthCard";
import AuthTerms from "../components/AuthTerms";

//
//
//

const AuthCreateAccount = () => {
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
				<input
					type="text"
					placeholder=""
					className="w-full h-[47px] py-gap-6 px-gap-8 flex flex-col items-start rounded-radius-medium1 border-[1px] border-gray-20 focus:border-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-50"
				/>
				<p className="typo-body-xsmall font-pretendard text-gray-50">
					닉네임은 2~20자로 입력할 수 있습니다.
				</p>
			</div>
      
			<div className="bg-color-gray-10 h-[1px] w-full"></div>
			<AuthTerms />
			<Button
				className="bg-primary-50 h-[50px] w-full flex justify-center text-alpha-white100"
				item={<p>계정 생성하기</p>}
			/>
		</AuthCard>
	);
};

export default AuthCreateAccount;
