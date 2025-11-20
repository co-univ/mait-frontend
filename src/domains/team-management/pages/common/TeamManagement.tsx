import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import TeamManagementUsers from "../users/TeamManagementUsers";
import TeamManagementLinkCreateModal from "./TeamManagementLinkCreateModal";
import TeamManagementLinkManageModal from "./TeamManagementLinkManageModal";

//
//
//

const TeamManagement = () => {
	const [isLinkCreateModalOpen, setIsLinkCreateModalOpen] = useState(false);
	const [isLinkManageModalOpen, setIsLinkManageModalOpen] = useState(false);

	const teamId = Number(useParams().teamId);

	const { selectedTeam } = useTeams({ teamId });

	/**
	 *
	 */
	const handleLinkManageModalOpen = () => {
		setIsLinkCreateModalOpen(false);
		setIsLinkManageModalOpen(true);
	};

	/**
	 *
	 */
	const renderInviteButtons = () => {
		return (
			<div className="flex gap-gap-5">
				<Button
					item="초대 링크 생성"
					className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
					onClick={() => setIsLinkCreateModalOpen(true)}
				/>
				<Button
					item="계정 추가"
					className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
				/>
			</div>
		);
	};

	return (
		<>
			<LabeledPageLayout
				icon={<NotebookPen />}
				label={selectedTeam?.teamName ?? ""}
				rightContent={renderInviteButtons()}
			>
				<TeamManagementUsers />
			</LabeledPageLayout>
			<TeamManagementLinkCreateModal
				open={isLinkCreateModalOpen}
				onClose={() => setIsLinkCreateModalOpen(false)}
				onLinkManageClick={handleLinkManageModalOpen}
			/>
			<TeamManagementLinkManageModal
				open={isLinkManageModalOpen}
				onClose={() => setIsLinkManageModalOpen(false)}
			/>
		</>
	);
};

export default TeamManagement;
