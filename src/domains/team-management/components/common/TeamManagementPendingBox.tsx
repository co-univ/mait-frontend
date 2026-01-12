import Button from "@/components/Button";
import type { ApplyTeamUserApiResponse } from "@/libs/types";

//
//
//

interface TeamManagementPendingBoxProps {
	user: ApplyTeamUserApiResponse;
	onApprove: (applicationId: number, name: string, nickname: string) => Promise<void>;
	onReject: (applicationId: number, name: string, nickname: string) => Promise<void>;
}

//
//
//

const TeamManagementPendingBox = ({ user, onApprove, onReject }: TeamManagementPendingBoxProps) => {
	const handleApproveUser = () => {
		onApprove(user.id, user.name, user.nickname);
	};

	const handleRejectUser = () => {
		onReject(user.id, user.name, user.nickname);
	};

	return (
		<div className="flex justify-between items-center p-padding-6 rounded-radius-medium1 bg-color-primary-5 typo-body-small">
			<span>
				{user.name}({user.nickname})
			</span>
			<span className="flex gap-gap-5">
				<Button
					item="승인"
					onClick={handleApproveUser}
					className="bg-color-alpha-white100 border-none text-color-primary-50 typo-body-small"
				/>
				<Button
					item="거절"
					onClick={handleRejectUser}
					className="bg-color-alpha-white100 border-none text-color-danger-50 typo-body-small"
				/>
			</span>
		</div>
	);
};

export default TeamManagementPendingBox;
