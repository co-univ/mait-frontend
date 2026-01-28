import { Award } from "lucide-react";
import { useParams } from "react-router-dom";
import { Table } from "@/components/table";
import type { UserApiResponse } from "@/libs/types";
import ControlParticipantRankingUser from "../../components/participant/ControlParticipantRankingUser";
import { ControlParticipantRankingPanel } from "../../components/participant/ranking-panel";
import useControlParticipantRanking from "../../hooks/paticipant/useControlParticipantRanking";

//
//
//

const ControlParticipantCorrectRanking = () => {
	const questionSetId = Number(useParams().questionSetId);

	const {
		ranking,
		handleRankingRowParticipantsChange,
		eliminatedParticipants,
		checkIsAllUsersActive,
		selectedRank,
		handleSelectRank,
		handleApplyRankSelection,
		handleActivateAllParticipants,
		handleEliminateAllParticipants,
	} = useControlParticipantRanking({
		questionSetId,
		type: "CORRECT" as const,
	});

	/**
	 *
	 */
	const handleHeaderCheckboxChange = (checked: boolean) => {
		if (checked) {
			handleActivateAllParticipants();
		} else {
			handleEliminateAllParticipants();
		}
	};

	/**
	 *
	 */
	const renderRankCell = (rank: number, count: number) => {
		return (
			<span className="flex items-center gap-gap-5">
				<span>{rank}등</span>
				<span className="px-padding-5 py-padding-1 bg-color-primary-10 rounded-full typo-body-xsmall-bold text-color-primary-50">
					{count}명
				</span>
			</span>
		);
	};

	/**
	 *
	 */
	const renderNameCell = (users?: UserApiResponse[]) => {
		return (
			<>
				{users?.map((user, index) => (
					<span key={user.userId}>
						<ControlParticipantRankingUser
							hasTrailingComma={index < (users?.length ?? 0) - 1}
							userId={user.userId}
							name={user.name ?? ""}
							nickName={user.nickName ?? ""}
						/>
					</span>
				))}
			</>
		);
	};

	return (
		<ControlParticipantRankingPanel.Root>
			<ControlParticipantRankingPanel.Header
				icon={<Award />}
				title="정답수 기준 등수"
			/>
			<ControlParticipantRankingPanel.Selector
				ranking="정답자"
				selectedRank={selectedRank}
				onRankChange={handleSelectRank}
				onApplySelection={handleApplyRankSelection}
			/>
			<Table.Root>
				<ControlParticipantRankingPanel.TableHeader
					checked={eliminatedParticipants?.length === 0}
					onChange={handleHeaderCheckboxChange}
				/>
				<Table.Divider />
				<Table.Body>
					{ranking?.map(({ users }, index) => (
						<>
							<ControlParticipantRankingPanel.TableRow
								// biome-ignore lint/suspicious/noArrayIndexKey: ranking order is stable and only user data changes
								key={index}
								checked={checkIsAllUsersActive(users)}
								rankCell={renderRankCell(index + 1, users?.length ?? 0)}
								nameCell={renderNameCell(users)}
								onChange={(checked) =>
									handleRankingRowParticipantsChange(checked, users)
								}
							/>
							{index < (ranking?.length ?? 0) - 1 && <Table.Divider />}
						</>
					))}
				</Table.Body>
			</Table.Root>
		</ControlParticipantRankingPanel.Root>
	);
};

export default ControlParticipantCorrectRanking;
