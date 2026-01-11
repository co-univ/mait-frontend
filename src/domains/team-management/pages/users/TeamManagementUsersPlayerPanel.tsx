import { Draggable, Droppable } from "@hello-pangea/dnd";
import { UsersRound } from "lucide-react";
import type { JoinedTeamUserApiResponse } from "@/libs/types";
import TeamManagementUsersBox from "../../components/users/TeamManagementUsersBox";
import TeamManagementUsersPanel from "../../components/users/TeamManagementUsersPanel";

//
//
//

interface TeamManagementUsersPlayerPanelProps {
	isLoading: boolean;
	draggingSourceId: string | null;
	players?: JoinedTeamUserApiResponse[];
	onUserDelete: (teamUserId: number, name: string) => Promise<void>;
}

//
//
//

const TeamManagementUsersPlayerPanel = ({
	isLoading,
	draggingSourceId,
	players,
	onUserDelete,
}: TeamManagementUsersPlayerPanelProps) => {
	return (
		<TeamManagementUsersPanel icon={<UsersRound />} title="플레이어">
			<Droppable
				droppableId="droppable-player"
				isDropDisabled={draggingSourceId === "droppable-player"}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="flex flex-col gap-gap-5"
					>
						{players?.map((user, index) => (
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

export default TeamManagementUsersPlayerPanel;
