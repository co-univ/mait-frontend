import { Award } from "lucide-react";
import { useParams } from "react-router-dom";
import { Table } from "@/components/table";
import { ControlParticipantRankingPanel } from "../../components/participant/ranking-panel";
import useControlParticipantRanking from "../../hooks/paticipant/useControlParticipantRanking";

//
//
//

const ControlParticipantCorrectRanking = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { ranking } = useControlParticipantRanking({
		questionSetId,
		type: "CORRECT" as const,
	});

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

	return (
		<ControlParticipantRankingPanel.Root>
			<ControlParticipantRankingPanel.Header
				icon={<Award />}
				title="정답자 기준 등수"
			/>
			<ControlParticipantRankingPanel.Selector ranking="정답자" />
			<Table.Root>
				<ControlParticipantRankingPanel.TableHeader />
				<Table.Divider />
				<Table.Body>
					{ranking?.map(({ users }, index) => (
						<>
							<ControlParticipantRankingPanel.TableRow
								// biome-ignore lint/suspicious/noArrayIndexKey: ranking order is stable and only user data changes
								key={index}
								rankCell={renderRankCell(index + 1, users?.length ?? 0)}
								nameCell={users
									?.map((user) => `${user.name}(${user.nickName})`)
									.join(", ")}
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
