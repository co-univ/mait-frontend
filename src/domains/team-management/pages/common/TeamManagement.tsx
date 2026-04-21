import { flip, offset, useFloating } from "@floating-ui/react-dom";
import { NotebookPen } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import TeamManagementAccountAddPopover from "../../components/common/TeamManagementAccountAddPopover";
import TeamManagementAdditionalButton from "../../components/common/TeamManagementAdditionalButton";
import useTeamManagementActions from "../../hooks/useTeamManagementActions";
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

	const { activeTeam, isMakerOrAbove } = useTeams();
	const { handleLeave, handleDelete } = useTeamManagementActions();

	const isOwner = activeTeam?.role === "OWNER";

	const { refs, floatingStyles } = useFloating({
		placement: "bottom-end",
		middleware: [offset(10), flip()],
	});

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
		if (!isMakerOrAbove) {
			return null;
		}

		return (
			<div ref={refs.setReference} className="flex gap-gap-5">
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
				label={
					<div className="flex items-center gap-gap-3">
						{activeTeam?.teamName ?? ""}
						<TeamManagementAdditionalButton
							isOwner={isOwner}
							onLeave={handleLeave}
							onDelete={handleDelete}
						/>
					</div>
				}
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
			<TeamManagementAccountAddPopover
				open={isAccountAddCardOpen}
				onClose={() => setIsAccountAddCardOpen(false)}
				setFloating={refs.setFloating}
				floatingStyles={floatingStyles}
			/>
		</>
	);
};

export default TeamManagement;
