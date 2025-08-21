import { Bell, UserRound } from "lucide-react";
import useUser from "@/hooks/useUser";
import HeaderInfoSectionSearchInput from "./HeaderInfoSectionSearchInput";

//
//
//

const HeaderInfoSection = () => {
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
		} else {
			// Handle guest click
		}
	};

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
