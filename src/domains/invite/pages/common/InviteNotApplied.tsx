import InviteBlueLetter from "../../components/common/InviteBlueLetter";
import InviteBody from "../../components/common/InviteBody";
import InviteButton from "../../components/common/InviteButton";
import InviteHeader from "../../components/common/InviteHeader";
import InviteTeamName from "../../components/common/InviteTeamName";
import InviteLayout from "../../layouts/common/InviteLayout";

//
//
//

interface InviteNotAppliedProps {
	teamName: string;
	onClick: () => void;
}

//
//
//

const InviteNotApplied = ({ teamName, onClick }: InviteNotAppliedProps) => {
	return (
		<InviteLayout>
			<InviteBlueLetter />
			<InviteHeader isDefault />
			<InviteBody>
				<InviteTeamName>{teamName}</InviteTeamName> 초대가 확인되었습니다.
				<br />
				<b className="typo-body-large">'참여하기'</b>를 눌러 팀 참여를
				진행해주세요.
			</InviteBody>
			<InviteButton item="참여하기" onClick={onClick} />
		</InviteLayout>
	);
};

export default InviteNotApplied;
