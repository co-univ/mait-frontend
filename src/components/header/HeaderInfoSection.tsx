import { Bell, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE_PATH } from "@/domains/auth/auth.routes";
import { MYPAGE_ROUTE_PATH } from "@/domains/my-page/mypage.routes";
import useBreakpoint from "@/hooks/useBreakpoint";
import useUser from "@/hooks/useUser";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";

//
//
//

interface HeaderInfoSectionProps {
	isHide?: boolean;
}

//
//
//

const HeaderInfoSection = ({ isHide }: HeaderInfoSectionProps) => {
	const navigate = useNavigate();

	const { user } = useUser();

	const { isSm } = useBreakpoint();

	/**
	 *
	 */
	const handleNotificationClick = () => {
		// TODO: Implement notification click handler
	};

	/**
	 *
	 */
	const handleUserMenuClick = () => {
		if (user) {
			navigate(MYPAGE_ROUTE_PATH.ROOT);
		} else {
			navigate(AUTH_ROUTE_PATH.LOGIN);
		}
	};

	if (isHide) {
		return;
	}

	return (
		<div className="flex items-center">
			{isSm && <HeaderSearch />}

			<div className="w-20" />

			{isSm && (
				<>
					<button type="button" onClick={handleNotificationClick}>
						<Bell />
					</button>

					<div className="w-20" />

					<button
						type="button"
						onClick={handleUserMenuClick}
						className="flex items-center"
					>
						<UserRound />
						<div className="w-[10px]" />
						<span className="typo-body-small">
							{user ? user.name : "로그인"}
						</span>
					</button>
				</>
			)}

			{!isSm && <HeaderMenu />}
		</div>
	);
};

export default HeaderInfoSection;
