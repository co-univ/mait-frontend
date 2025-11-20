import { Check, ChevronsUpDown, NotebookPen } from "lucide-react";
import { useState } from "react";
import useTeams from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/libs/api";
import { Dropdown } from "../dropdown";
import { notify } from "../Toast";
import SideBarDropdownAddButton from "./SideBarDropdownAddButton";
import SideBarDropdownInput from "./SideBarDropdownInput";

//
//
//

const SideBarDropdown = () => {
	const [isAddingTeam, setIsAddingTeam] = useState(false);
	const [addingTeamName, setAddingTeamName] = useState("");
	const [isAddingTeamLoading, setIsAddingTeamLoading] = useState(false);

	const { user } = useUser();
	const { teams, activeTeam, handleActiveTeamChange, refetch } = useTeams();

	/**
	 *
	 */
	const handleAddTeam = async () => {
		if (isAddingTeamLoading) {
			return;
		}

		setIsAddingTeamLoading(true);

		try {
			const res = await apiClient.POST("/api/v1/teams", {
				body: {
					name: addingTeamName,
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("Failed to create team");
			}

			setIsAddingTeam(false);
			setAddingTeamName("");
			refetch();
		} catch {
			notify.error("팀 생성에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsAddingTeamLoading(false);
		}
	};

	return (
		<Dropdown.Root
			value={activeTeam?.teamId?.toString() || ""}
			className="w-full"
			onValueChange={(value) => handleActiveTeamChange(Number(value))}
		>
			<Dropdown.Trigger
				icon={<ChevronsUpDown size={20} />}
				className="border-none"
			>
				<span className="typo-body-medium">{activeTeam?.teamName}</span>
			</Dropdown.Trigger>

			<Dropdown.Content className="!w-[268px]">
				<Dropdown.Item value="header" isHeader>
					{user?.name}님의 MAIT
				</Dropdown.Item>

				<Dropdown.Divider />

				{teams?.map((team) => (
					<Dropdown.Item
						key={team.teamId}
						value={team.teamId?.toString() || ""}
						icon={<NotebookPen size={20} />}
						checkIcon={<Check size={16} />}
					>
						{team.teamName}
					</Dropdown.Item>
				))}

				{isAddingTeam ? (
					<SideBarDropdownInput
						teamName={addingTeamName}
						onChange={(value) => setAddingTeamName(value)}
						onAddButtonClick={handleAddTeam}
						onCancelButtonClick={() => setIsAddingTeam(false)}
					/>
				) : (
					<SideBarDropdownAddButton onClick={() => setIsAddingTeam(true)} />
				)}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default SideBarDropdown;
