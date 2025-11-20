import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { JoinedTeamUserApiResponse } from "@/libs/types";
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
	const [localMakers, setLocalMakers] = useState<JoinedTeamUserApiResponse[]>();
	const [localPlayers, setLocalPlayers] =
		useState<JoinedTeamUserApiResponse[]>();

	const teamId = Number(useParams().teamId);

	const {
		makers,
		players,
		handleListOrderChange,
		handleRoleUpdate,
		handleUserDelete,
		isLoading,
	} = useTeamManagementUsers({ teamId });

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const teamUserId = Number(result.draggableId);
		const sourceDroppableId = result.source.droppableId;
		const destinationDroppableId = result.destination.droppableId;

		if (sourceDroppableId === destinationDroppableId) {
			if (sourceDroppableId === "droppable-maker" && makers) {
				const newMakers = handleListOrderChange(
					makers,
					result.source.index,
					result.destination.index,
				);

				setLocalMakers(newMakers);
			} else if (sourceDroppableId === "droppable-player" && players) {
				const newPlayers = handleListOrderChange(
					players,
					result.source.index,
					result.destination.index,
				);

				setLocalPlayers(newPlayers);
			}
		} else {
			const newRole =
				destinationDroppableId === "droppable-maker" ? "MAKER" : "PLAYER";
			handleRoleUpdate(teamUserId, newRole);
		}
	};

	//
	//
	//
	useEffect(() => {
		setLocalMakers(makers);
	}, [makers]);

	//
	//
	//
	useEffect(() => {
		setLocalPlayers(players);
	}, [players]);

	return (
		<div className="flex gap-gap-9 w-full">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="flex-1">
					<TeamManagementUsersMakerPanel
						isLoading={isLoading}
						makers={localMakers}
						onUserDelete={handleUserDelete}
					/>
				</div>
				<div className="flex-1">
					<TeamManagementUsersPlayerPanel
						isLoading={isLoading}
						players={localPlayers}
						onUserDelete={handleUserDelete}
					/>
				</div>
			</DragDropContext>
		</div>
	);
};

export default TeamManagementUsers;
