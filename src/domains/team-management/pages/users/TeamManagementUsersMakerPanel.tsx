import { Draggable, Droppable } from "@hello-pangea/dnd";
import { UserRound } from "lucide-react";
import type {
	ApplyTeamUserApiResponse,
	JoinedTeamUserApiResponse,
} from "@/libs/types";
import TeamManagementPendingBox from "../../components/common/TeamManagementPendingBox";
import TeamManagementUsersBox from "../../components/users/TeamManagementUsersBox";
import TeamManagementUsersPanel from "../../components/users/TeamManagementUsersPanel";

//
//
//

interface TeamManagementUsersMakerPanelProps {
	isLoading: boolean;
	draggingSourceId: string | null;
	owners?: JoinedTeamUserApiResponse[];
	makers?: JoinedTeamUserApiResponse[];
	applicants?: ApplyTeamUserApiResponse[];
	onUserDelete: (teamUserId: number, name: string) => Promise<void>;
	onApproveUser: (
		applicationId: number,
		name: string,
		nickname: string,
	) => Promise<void>;
	onRejectUser: (
		applicationId: number,
		name: string,
		nickname: string,
	) => Promise<void>;
}

//
//
//

const TeamManagementUsersMakerPanel = ({
	isLoading,
	draggingSourceId,
	owners,
	makers,
	applicants,
	onUserDelete,
	onApproveUser,
	onRejectUser,
}: TeamManagementUsersMakerPanelProps) => {
	return (
		<TeamManagementUsersPanel icon={<UserRound />} title="메이커">
			<div className="flex flex-col gap-gap-5">
				{applicants?.map((user) => (
					<TeamManagementPendingBox
						key={user.id}
						user={user}
						onApprove={onApproveUser}
						onReject={onRejectUser}
					/>
				))}
			</div>
			<div className="flex flex-col gap-gap-5">
				{owners?.map((user) => (
					<TeamManagementUsersBox key={user.teamUserId} user={user} />
				))}
			</div>
			<Droppable
				droppableId="droppable-maker"
				isDropDisabled={draggingSourceId === "droppable-maker"}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="flex flex-col gap-gap-5"
					>
						{makers?.map((user, index) => (
							<Draggable
								isDragDisabled={isLoading}
								key={user.teamUserId}
								draggableId={user.teamUserId.toString()}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TeamManagementUsersBox
											draggable={!isLoading}
											isDragging={snapshot.isDragging}
											user={user}
											onUserDelete={onUserDelete}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</TeamManagementUsersPanel>
	);
};

export default TeamManagementUsersMakerPanel;
