import { Draggable, Droppable } from "@hello-pangea/dnd";
import { UserRound } from "lucide-react";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { JoinedTeamUserApiResponse } from "@/libs/types";
import TeamManagementPendingBox from "../../components/common/TeamManagementPendingBox";
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
	const { activeTeam } = useTeams();

	const { data } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/applicants",
		{
			params: {
				path: { teamId: activeTeam?.teamId ?? 0 },
			},
		},
	);

	const applicants = data?.data;

	return (
		<TeamManagementUsersPanel icon={<UserRound />} title="메이커">
			<div className="flex flex-col gap-gap-5">
				{applicants?.map((user) => (
					<TeamManagementPendingBox key={user.id} user={user} />
				))}
			</div>
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
