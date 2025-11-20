import clsx from "clsx";
import { useState } from "react";
import type { JoinedTeamUserApiResponse } from "@/libs/types";

//
//
//

interface TeamManagementUsersBoxProps {
	user: JoinedTeamUserApiResponse;
}

//
//
//

const TeamManagementUsersBox = ({ user }: TeamManagementUsersBoxProps) => {
	const [isMouseOver, setIsMouseOver] = useState(false);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: uesrs box can detect mouse over state
		<div
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
			className={clsx(
				"flex items-center gap-gap-4 p-padding-6 border border-color-gray-10 rounded-radius-medium1 typo-body-small",
				{
					"bg-color-primary-5 border-color-primary-5": isMouseOver,
				},
			)}
		>
			<span className="w-[112px]">{user.name}</span>
			<span className="w-[180px]">{user.role}</span>
			<span className="w-0 flex-1 truncate">{user.nickname}</span>
		</div>
	);
};

export default TeamManagementUsersBox;
