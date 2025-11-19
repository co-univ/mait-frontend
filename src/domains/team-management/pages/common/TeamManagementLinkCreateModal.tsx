import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { Field } from "@/components/field";
import Modal from "@/components/modal/Modal";
import { Radio } from "@/components/radio";
import { notify } from "@/components/Toast";
import { apiClient } from "@/libs/api";
import type { CreateTeamInviteApiRequest } from "@/libs/types";
import { getInviteUrl } from "@/utils/get-invite-url";
import CopyButton from "../../components/common/CopyButton";

//
//
//

interface TeamManagementLinkCreateModalProps {
	open: boolean;
	onClose: () => void;
	onLinkManageClick: () => void;
}

//
//
//

const TeamManagementLinkCreateModal = ({
	open,
	onClose,
	onLinkManageClick,
}: TeamManagementLinkCreateModalProps) => {
	const [role, setRole] = useState<CreateTeamInviteApiRequest["role"]>("MAKER");
	const [duration, setDuration] =
		useState<CreateTeamInviteApiRequest["duration"]>("ONE_DAY");
	const [approval, setApproval] = useState<"NECCESSARY" | "NOT_NECESSARY">(
		"NECCESSARY",
	);
	const [linkCode, setLinkCode] = useState<string>();
	const [isCreating, setIsCreating] = useState(false);

	const teamId = Number(useParams().teamId);

	/**
	 *
	 */
	const handleRoleChange = (value: string) => {
		setRole(value as CreateTeamInviteApiRequest["role"]);

		if (value === "PLAYER") {
			setApproval("NOT_NECESSARY");
		}
	};

	/**
	 *
	 */
	const handleDurationChange = (value: string) => {
		setDuration(value as CreateTeamInviteApiRequest["duration"]);
	};

	/**
	 *
	 */
	const handleApprovalChange = (value: string) => {
		setApproval(value as "NECCESSARY" | "NOT_NECESSARY");
	};

	/**
	 *
	 */
	const handleLinkCreate = async () => {
		if (isCreating) {
			return;
		}

		try {
			setIsCreating(true);

			const res = await apiClient.POST("/api/v1/teams/{teamId}/invitation", {
				params: {
					path: {
						teamId,
					},
					query: {
						requiresApproval: approval === "NECCESSARY",
					},
				},
				body: {
					role,
					duration,
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("Invitation link creation failed");
			}

			setLinkCode(res.data.data?.token ?? "");
		} catch {
			notify.error("초대 링크 생성에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsCreating(false);
		}
	};

	/**
	 *
	 */
	const renderRoleField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-heading-small">
					초대자 권한 유형
				</Field.Label>
				<Radio.Group
					disabled={linkCode !== undefined}
					value={role}
					onChange={handleRoleChange}
					className="bg-color-gray-5 flex items-center py-padding-10 px-padding-11 rounded-radius-medium1"
				>
					<Radio.Item value="MAKER" className="flex-1">
						<Radio.Input />
						<Radio.Label>메이커</Radio.Label>
					</Radio.Item>
					<Radio.Item value="PLAYER" className="flex-1">
						<Radio.Input />
						<Radio.Label>플레이어</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderDurationField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-heading-small">
					초대자 권한 유형
				</Field.Label>
				<Radio.Group
					disabled={linkCode !== undefined}
					value={duration}
					onChange={handleDurationChange}
					className="bg-color-gray-5 flex flex-col gap-gap-7 py-padding-10 px-padding-11 rounded-radius-medium1"
				>
					<Radio.Item value="ONE_DAY">
						<Radio.Input />
						<Radio.Label>1일</Radio.Label>
					</Radio.Item>
					<Radio.Item value="THREE_DAYS">
						<Radio.Input />
						<Radio.Label>3일</Radio.Label>
					</Radio.Item>
					<Radio.Item value="SEVEN_DAYS">
						<Radio.Input />
						<Radio.Label>7일</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderApprovalField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-heading-small">
					<div>승인 절차</div>
					<div className="typo-body-small text-color-gray-40">
						*관리자의 별도 승인이 필요한 경우를 의미합니다.
					</div>
				</Field.Label>
				<Radio.Group
					disabled={role === "PLAYER" || linkCode !== undefined}
					value={approval}
					onChange={handleApprovalChange}
					className="bg-color-gray-5 flex items-center py-padding-10 px-padding-11 rounded-radius-medium1"
				>
					<Radio.Item value="NECCESSARY" className="flex-1">
						<Radio.Input />
						<Radio.Label>필요</Radio.Label>
					</Radio.Item>
					<Radio.Item value="NOT_NECESSARY" className="flex-1">
						<Radio.Input />
						<Radio.Label>불필요</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderLinkButtons = () => {
		if (linkCode) {
			return null;
		}

		return (
			<div className="flex gap-gap-5">
				<div className="flex-1" />
				<Button
					item="초대 링크 관리"
					onClick={onLinkManageClick}
					className="py-padding-4 px-padding-8 typo-body-small border-none underline"
				/>
				<Button
					item="생성하기"
					onClick={handleLinkCreate}
					className="py-padding-4 px-padding-8 typo-body-small"
				/>
			</div>
		);
	};

	/**
	 *
	 */
	const renderLinkResult = () => {
		if (!linkCode) {
			return null;
		}

		return (
			<div className="flex gap-gap-4">
				<input
					readOnly
					value={getInviteUrl(linkCode)}
					className="flex-1 py-padding-4 px-padding-6 rounded-radius-medium1 border border-color-gray-20 overflow-x-auto typo-body-small"
				/>
				<CopyButton value={getInviteUrl(linkCode)} />
			</div>
		);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="w-[512px] flex flex-col gap-gap-8">
				{renderRoleField()}
				{renderDurationField()}
				{renderApprovalField()}
				{linkCode ? renderLinkResult() : renderLinkButtons()}
			</div>
		</Modal>
	);
};

export default TeamManagementLinkCreateModal;
