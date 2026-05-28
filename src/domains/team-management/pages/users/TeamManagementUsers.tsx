import { flip, offset, useFloating } from "@floating-ui/react-dom";
import { NotebookPen } from "lucide-react";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import TeamManagementUsersAccountAddPopover from "../../components/users/TeamManagementUsersAccountAddPopover";
import TeamManagementUsersAdditionalButton from "../../components/users/TeamManagementUsersAdditionalButton";
import useTeamManagementUsersActions from "../../hooks/users/useTeamManagementUsersActions";
import TeamManagementUsersContainer from "./TeamManagementUsersContainer";
import TeamManagementUsersLinkCreateModal from "./TeamManagementUsersLinkCreateModal";
import TeamManagementUsersLinkManageModal from "./TeamManagementUsersLinkManageModal";

//
//
//

const TeamManagementUsers = () => {
	const [isLinkCreateModalOpen, setIsLinkCreateModalOpen] = useState(false);
	const [isLinkManageModalOpen, setIsLinkManageModalOpen] = useState(false);
	const [isAccountAddCardOpen, setIsAccountAddCardOpen] = useState(false);

	const accountAddButtonRef = useRef<HTMLButtonElement>(null);

	const { activeTeam, isMakerOrAbove } = useTeams();
	const {
		isTeamNameEditing,
		changedTeamName,
		handleTeamNameChange,
		editTeamName,
		cancelEditTeamName,
		submitChangedTeamName,
		handleLeave,
		handleDelete,
	} = useTeamManagementUsersActions();

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
	const renderLabel = () => {
		if (isTeamNameEditing) {
			return (
				<div className="flex items-center gap-gap-3">
					<input
						type="text"
						value={changedTeamName}
						onChange={(e) => handleTeamNameChange(e.target.value)}
						className="bg-transparent border-b-2 border-color-alpha-black100 focus-visible:outline-none"
					/>
					<button
						type="button"
						onClick={cancelEditTeamName}
						className="flex items-center justify-center px-padding-8 py-padding-4 rounded-md border border-color-gray-10 typo-body-xsmall"
					>
						취소
					</button>
					<button
						type="button"
						onClick={submitChangedTeamName}
						className="flex items-center justify-center px-padding-8 py-padding-4 rounded-md typo-body-xsmall bg-color-primary-50 text-color-alpha-white100"
					>
						저장
					</button>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-gap-3">
				{activeTeam?.teamName ?? ""}
				<TeamManagementUsersAdditionalButton
					isOwner={isOwner}
					isMakerOrAbove={isMakerOrAbove}
					editTeamName={editTeamName}
					onLeave={handleLeave}
					onDelete={handleDelete}
				/>
			</div>
		);
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
				label={renderLabel()}
				rightContent={renderInviteButtons()}
			>
				<TeamManagementUsersContainer />
			</LabeledPageLayout>
			<TeamManagementUsersLinkCreateModal
				open={isLinkCreateModalOpen}
				onClose={() => setIsLinkCreateModalOpen(false)}
				onLinkManageClick={handleLinkManageModalOpen}
			/>
			<TeamManagementUsersLinkManageModal
				open={isLinkManageModalOpen}
				onClose={() => setIsLinkManageModalOpen(false)}
			/>
			<TeamManagementUsersAccountAddPopover
				open={isAccountAddCardOpen}
				onClose={() => setIsAccountAddCardOpen(false)}
				setFloating={refs.setFloating}
				floatingStyles={floatingStyles}
			/>
		</>
	);
};

export default TeamManagementUsers;
