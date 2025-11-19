import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import TeamManagementLinkCreateModal from "./TeamManagementLinkCreateModal";
import TeamManagementLinkManageModal from "./TeamManagementLinkManageModal";

//
//
//

const TeamManagement = () => {
	const [isLinkCreateModalOpen, setIsLinkCreateModalOpen] = useState(false);
	const [isLinkManageModalOpen, setIsLinkManageModalOpen] = useState(false);

	const teamId = Number(useParams().teamId);

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
	console.log(isLinkCreateModalOpen);
	return (
		<>
			<LabeledPageLayout
				icon={<NotebookPen />}
				label="조원영의 문제세상"
				rightContent={renderInviteButtons()}
			>
				ㅎㅇ
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
