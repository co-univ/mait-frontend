import { HOME_ROUTE_PATH } from "@/domains/home";
import InviteBlueLetter from "../../components/common/InviteBlueLetter";
import InviteBody from "../../components/common/InviteBody";
import InviteHeader from "../../components/common/InviteHeader";
import InviteLink from "../../components/common/InviteLink";
import InviteLayout from "../../layouts/common/InviteLayout";

//
//
//

const InvitePending = () => {
	return (
		<InviteLayout>
			<InviteBlueLetter />
			<InviteHeader isDefault />
			<InviteBody>
				관리자가 초대를 승인하면 팀에 참여할 수 있어요.
				<br />
				승인 완료 시 알림을 통해 안내드릴게요.
			</InviteBody>
			<InviteLink link={HOME_ROUTE_PATH.ROOT} label="홈으로 이동" />
		</InviteLayout>
	);
};

export default InvitePending;
