import {
	DragDropContext,
	type DragStart,
	type DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import useTeams from "@/hooks/useTeams";
import useTeamManagementUsers from "../../hooks/users/useTeamManagementUsers";
import TeamManagementUsersMakerPanel from "./TeamManagementUsersMakerPanel";
import TeamManagementUsersPlayerPanel from "./TeamManagementUsersPlayerPanel";

//
//
//

//
//
//

const TeamManagementUsers = () => {
	const [draggingSourceId, setDraggingSourceId] = useState<string | null>(null);

	const { activeTeam } = useTeams();

	const {
		owners,
		makers,
		players,
		applicants,
		handleRoleUpdate,
		handleUserDelete,
		handleApproveUser,
		handleRejectUser,
		isLoading,
	} = useTeamManagementUsers({ teamId: activeTeam?.teamId ?? 0 });

	/**
	 *
	 */
	const handleDragStart = (start: DragStart) => {
		setDraggingSourceId(start.source.droppableId);
	};

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		setDraggingSourceId(null);

		if (!result.destination) {
			return;
		}

		const teamUserId = Number(result.draggableId);
		const sourceDroppableId = result.source.droppableId;
		const destinationDroppableId = result.destination.droppableId;

		if (sourceDroppableId !== destinationDroppableId) {
			const newRole =
				destinationDroppableId === "droppable-maker" ? "MAKER" : "PLAYER";
			handleRoleUpdate(teamUserId, newRole);
		}
	};

	return (
		<div className="flex gap-gap-9 w-full">
			<DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<div className="flex-1">
					<TeamManagementUsersMakerPanel
						isLoading={isLoading}
						draggingSourceId={draggingSourceId}
						owners={owners}
						makers={makers}
						applicants={applicants}
						onUserDelete={handleUserDelete}
						onApproveUser={handleApproveUser}
						onRejectUser={handleRejectUser}
					/>
				</div>
				<div className="flex-1">
					<TeamManagementUsersPlayerPanel
						draggingSourceId={draggingSourceId}
						isLoading={isLoading}
						players={players}
						onUserDelete={handleUserDelete}
					/>
				</div>
			</DragDropContext>
		</div>
	);
};

export default TeamManagementUsers;
