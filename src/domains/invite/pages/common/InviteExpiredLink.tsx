import { HOME_ROUTE_PATH } from "@/domains/home";
import InviteBody from "../../components/common/InviteBody";
import InviteDescriptions from "../../components/common/InviteDescriptions";
import InviteHeader from "../../components/common/InviteHeader";
import InviteLink from "../../components/common/InviteLink";
import InviteRedLetter from "../../components/common/InviteRedLetter";
import InviteLayout from "../../layouts/common/InviteLayout";

//
//
//

const InviteExpiredLink = () => {
	return (
		<InviteLayout>
			<InviteRedLetter />
			<InviteHeader title="이 초대 링크는 더 이상 유효하지 않아요." />
			<InviteBody>
				이 초대 링크는 만료되었거나 더 이상 사용하실 수 없습니다.
				<br />
				팀에 참여하려면 관리자에게 새로운 초대 링크를 요청해주세요.
			</InviteBody>
			<InviteLink link={HOME_ROUTE_PATH.ROOT} label="홈으로 이동" />
			<InviteDescriptions
				descriptions={[
					"이미 가입된 계정이 있다면 로그인해 보실 수 있어요.",
					"문제가 계속된다면 팀 관리자에게 문의해 주세요.",
				]}
			/>
		</InviteLayout>
	);
};

export default InviteExpiredLink;
