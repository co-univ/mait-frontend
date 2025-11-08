import CheckBox from "@/components/CheckBox";

//
//
//

const TERMS_ITEMS = [
	"전체 약관 동의",
	"[필수] 서비스 이용약관 동의",
	"[필수] 개인정보 수집 및 이용 동의",
	"[선택] 마케팅 정보 수신 동의",
];

//
//
//

const AuthTerms = () => {
	return (
		<div className="flex flex-col gap-gap-5">
			{TERMS_ITEMS.map((item, index) => (
				<div key={index} className="flex items-center gap-gap-4">
					<CheckBox
						checked={false}
						size={20}
						onChange={(checked) => console.log(item, checked)}
					/>
					<p className="typo-body-small text-gray-50">{item}</p>
				</div>
			))}
		</div>
	);
};

export default AuthTerms;
