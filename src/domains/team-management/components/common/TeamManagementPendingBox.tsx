import type { ApplyTeamUserApiResponse } from "@/libs/types";

//
//
//

interface TeamManagementPendingBoxProps {
	user: ApplyTeamUserApiResponse;
}

//
//
//

const TeamManagementPendingBox = ({ user }: TeamManagementPendingBoxProps) => {
	return (
		<div className="flex justify-between items-center p-padding-6 rounded-radius-medium1 bg-color-primary-5 typo-body-small">
			<span>
				{user.name}({user.nickname})
			</span>
			<span className="flex gap-gap-5">
				<button
					type="button"
					className="p-padding-6 rounded-radius-medium1 bg-color-alpha-white100 text-color-primary-50"
				>
					승인
				</button>
				<button
					type="button"
					className="p-padding-6 rounded-radius-medium1 bg-color-alpha-white100 text-color-danger-50"
				>
					거절
				</button>
			</span>
		</div>
	);
};

export default TeamManagementPendingBox;
