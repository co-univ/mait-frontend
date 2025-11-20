import { Draggable, Droppable } from "@hello-pangea/dnd";
import { UserRound } from "lucide-react";
import type { JoinedTeamUserApiResponse } from "@/libs/types";
import TeamManagementUsersBox from "../../components/users/TeamManagementUsersBox";
import TeamManagementUsersPanel from "../../components/users/TeamManagementUsersPanel";

//
//
//

interface TeamManagementUsersMakerPanelProps {
	isLoading: boolean;
	owners?: JoinedTeamUserApiResponse[];
	makers?: JoinedTeamUserApiResponse[];
	onUserDelete: (teamUserId: number, name: string) => Promise<void>;
}

//
//
//

const TeamManagementUsersMakerPanel = ({
	isLoading,
	owners,
	makers,
	onUserDelete,
}: TeamManagementUsersMakerPanelProps) => {
	return (
		<TeamManagementUsersPanel icon={<UserRound />} title="메이커">
			<div className="flex flex-col gap-gap-5">
				{owners?.map((user) => (
					<TeamManagementUsersBox key={user.teamUserId} user={user} />
				))}
			</div>
			<Droppable droppableId="droppable-maker">
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
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TeamManagementUsersBox
											draggable={!isLoading}
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
