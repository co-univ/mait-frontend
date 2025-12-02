import { Bell, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import HeaderInfoSectionSearchInput from "./HeaderInfoSectionSearchInput";
import { MYPAGE_ROUTE_PATH } from "@/domains/my-page/mypage.routes";
import { AUTH_ROUTE_PATH } from "@/domains/auth/auth.routes";

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
		// TODO: Implement user menu click handler

		if (user) {
			// Handle user click
			navigate(MYPAGE_ROUTE_PATH.ROOT);
		} else {
			// Handle guest click
			navigate(AUTH_ROUTE_PATH.LOGIN);
		}
	};

	if (isHide) {
		return;
	}

	return (
		<div className="flex items-center">
			<HeaderInfoSectionSearchInput />
			<div className="w-20" />
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
				<span className="typo-body-small">{user ? user.name : "로그인"}</span>
			</button>
		</div>
	);
};

export default HeaderInfoSection;
