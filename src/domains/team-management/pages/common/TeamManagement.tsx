import { NotebookPen } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import TeamManagementAccountAddCard from "../../components/common/TeamManagementAccountAddCard";
import TeamManagementUsers from "../users/TeamManagementUsers";
import TeamManagementLinkCreateModal from "./TeamManagementLinkCreateModal";
import TeamManagementLinkManageModal from "./TeamManagementLinkManageModal";

//
//
//

const TeamManagement = () => {
	const [isLinkCreateModalOpen, setIsLinkCreateModalOpen] = useState(false);
	const [isLinkManageModalOpen, setIsLinkManageModalOpen] = useState(false);
	const [isAccountAddCardOpen, setIsAccountAddCardOpen] = useState(false);

	const accountAddButtonRef = useRef<HTMLButtonElement>(null);

	const { activeTeam } = useTeams();

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
					ref={accountAddButtonRef}
					item="계정 추가"
					className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
					onClick={() => setIsAccountAddCardOpen(true)}
				/>
			</div>
		);
	};

	return (
		<>
			<LabeledPageLayout
				icon={<NotebookPen />}
				label={activeTeam?.teamName ?? ""}
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
			<TeamManagementAccountAddCard
				open={isAccountAddCardOpen}
				onClose={() => setIsAccountAddCardOpen(false)}
				anchorEl={accountAddButtonRef.current}
			/>
		</>
	);
};

export default TeamManagement;
