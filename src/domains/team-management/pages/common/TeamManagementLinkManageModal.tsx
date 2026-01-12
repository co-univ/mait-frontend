import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Square } from "lucide-react";
import { useConfirm } from "@/components/confirm";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import Modal from "@/components/modal/Modal";
import { notify } from "@/components/Toast";
import { Table } from "@/components/table";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import { getInviteUrl } from "@/utils/get-invite-url";
import CopyButton from "../../../../components/CopyButton";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

//
//
//

interface TeamManagementLinkManageModalProps {
	open: boolean;
	onClose: () => void;
}

//
//
//

const TeamManagementLinkManageModal = ({
	open,
	onClose,
}: TeamManagementLinkManageModalProps) => {
	const { activeTeam } = useTeams();

	const { data, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/invitations",
		{
			params: {
				path: { teamId: activeTeam?.teamId ?? 0 },
			},
		},
	);

	const invitationLinks = data?.data;

	const { mutate } = apiHooks.useMutation(
		"delete",
		"/api/v1/teams/invitations/{invitationId}",
		{
			onSuccess: () => {
				notify.success("초대 링크를 삭제했습니다.");
				refetch();
			},
			onError: () => {
				notify.error("초대 링크 삭제에 실패했습니다.");
			},
		},
	);

	const { confirm } = useConfirm();

	/**
	 *
	 */
	const handleDeleteInvitationLink = async (invitationId: number) => {
		const res = await confirm({
			title: "초대 링크 삭제",
			description:
				"링크를 삭제하시면 이미 공유된 링크를 통해서도 접속이 불가능해집니다.",
		});

		if (!res) {
			return;
		}

		mutate({
			params: {
				path: { invitationId },
			},
		});
	};

	/**
	 *
	 */
	const renderModalHeader = () => {
		return (
			<div>
				<h3 className="typo-body-small text-color-gray-40">생성 링크</h3>
				<h2 className="typo-heading-medium">초대 링크 관리</h2>
			</div>
		);
	};

	/**
	 *
	 */
	const renderTable = () => {
		return (
			<Table.Root>
				<Table.Header>
					<Table.HeaderCell width="32px">
						<Square size={20} />
					</Table.HeaderCell>
					<Table.HeaderCell width="112px">권한</Table.HeaderCell>
					<Table.HeaderCell grow>링크</Table.HeaderCell>
					<Table.HeaderCell width="168px">종료 일시</Table.HeaderCell>
				</Table.Header>

				<Table.Divider />

				<Table.Body>
					{invitationLinks?.map((link, index) => (
						<>
							<Table.Row key={link.linkId}>
								<Table.Cell width="32px" className="flex items-center">
									<DeleteCheckBox
										size={20}
										onClick={() => handleDeleteInvitationLink(link.linkId)}
									/>
								</Table.Cell>
								<Table.Cell width="112px">
									{link.role === "MAKER" ? "메이커" : "플레이어"}
								</Table.Cell>
								<Table.Cell grow className="flex gap-gap-5 items-center">
									<span className="truncate w-0 flex-1">
										{getInviteUrl(link.token)}
									</span>
									<CopyButton value={getInviteUrl(link.token)} />
								</Table.Cell>
								<Table.Cell width="168px">
									{dayjs
										.utc(link.expiredAt)
										.tz("Asia/Seoul")
										.format("YYYY-MM-DD")}
									&nbsp;
									<b className="typo-body-small-bold">
										{dayjs.utc(link.expiredAt).tz("Asia/Seoul").format("HH:mm")}
									</b>
								</Table.Cell>
							</Table.Row>
							{index < (invitationLinks?.length ?? 0) - 1 && <Table.Divider />}
						</>
					))}
				</Table.Body>
			</Table.Root>
		);
	};
	return (
		<Modal open={open} onClose={onClose}>
			<div className="w-[600px] flex flex-col gap-gap-9">
				{renderModalHeader()}
				{renderTable()}
			</div>
		</Modal>
	);
};

export default TeamManagementLinkManageModal;
