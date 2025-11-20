import InviteBlueLetter from "../../components/common/InviteBlueLetter";
import InviteBody from "../../components/common/InviteBody";
import InviteDescriptions from "../../components/common/InviteDescriptions";
import InviteHeader from "../../components/common/InviteHeader";
import InviteLink from "../../components/common/InviteLink";
import InviteTeamName from "../../components/common/InviteTeamName";
import InviteLayout from "../../layouts/common/InviteLayout";

//
//
//

interface InviteNotLoginProps {
	teamName: string;
}

//
//
//

const InviteNotLogin = ({ teamName }: InviteNotLoginProps) => {
	return (
		<InviteLayout>
			<InviteBlueLetter />
			<InviteHeader isDefault />
			<InviteBody>
				이 링크는 <InviteTeamName>{teamName}</InviteTeamName>에 참여하기 위한
				초대입니다.
				<br />
				로그인 또는 회원가입을 완료한 후 팀 참여를 진행해주세요.
			</InviteBody>
			<InviteLink link="/auth/login" label="로그인하고 참여하기" />
			<InviteDescriptions
				descriptions={[
					"초대받은 이메일 계정으로 로그인해 주세요.",
					"아직 MAIT의 회원이 아니라면 지금 가입해주세요.",
				]}
			/>
		</InviteLayout>
	);
};

export default InviteNotLogin;
