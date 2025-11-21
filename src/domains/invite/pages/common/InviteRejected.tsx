import InviteDescriptions from "../../components/common/InviteDescriptions";
import InviteHeader from "../../components/common/InviteHeader";
import InviteLink from "../../components/common/InviteLink";
import InviteRedLetter from "../../components/common/InviteRedLetter";
import InviteLayout from "../../layouts/common/InviteLayout";

//
//
//

const InviteRejected = () => {
	return (
		<InviteLayout>
			<InviteRedLetter />
			<InviteHeader title="팀 초대가 승인되지 않았습니다." />
			<InviteLink link="/" label="홈으로 이동" />
			<InviteDescriptions
				descriptions={["문의가 필요하신 경우, 팀 관리자에게 연락해주세요"]}
			/>
		</InviteLayout>
	);
};

export default InviteRejected;
