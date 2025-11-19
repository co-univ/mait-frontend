import { Coins } from "lucide-react";
import { Table } from "@/components/table";
import { ControlParticipantRankingPanel } from "../../components/participant/ranking-panel";

//
//
//

const ControlParticipantScorerRanking = () => {
	return (
		<ControlParticipantRankingPanel.Root>
			<ControlParticipantRankingPanel.Header
				icon={<Coins />}
				title="선착순 기준 등수"
			/>
			<ControlParticipantRankingPanel.Selector ranking="선착순" />
			<Table.Root>
				<ControlParticipantRankingPanel.TableHeader />
				<Table.Divider />
				<Table.Body>
					<ControlParticipantRankingPanel.TableRow
						rankCell="1등"
						nameCell="이하은(아지 송)"
					/>
					<Table.Divider />
					<ControlParticipantRankingPanel.TableRow
						rankCell="2등"
						nameCell="전민재(전밈)"
					/>
					<Table.Divider />
					<ControlParticipantRankingPanel.TableRow
						rankCell="3등"
						nameCell="손민재(Son)"
					/>
				</Table.Body>
			</Table.Root>
		</ControlParticipantRankingPanel.Root>
	);
};

export default ControlParticipantScorerRanking;
