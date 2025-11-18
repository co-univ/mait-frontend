import { Award } from "lucide-react";
import { Table } from "@/components/table";
import { ControlParticipantRankingPanel } from "../../components/participant/ranking-panel";

//
//
//

const ControlParticipantAnswerRanking = () => {
	return (
		<ControlParticipantRankingPanel.Root>
			<ControlParticipantRankingPanel.Header
				icon={<Award />}
				title="선착순 기준 등수"
			/>
			<ControlParticipantRankingPanel.Selector ranking="선착순" />
			<Table.Root>
				<ControlParticipantRankingPanel.TableHeader />
				<Table.Divider />
				<Table.Body>
					<ControlParticipantRankingPanel.TableRow
						rankCell={
							<span className="flex items-center gap-gap-5">
								<span>1등</span>
								<span className="px-padding-5 py-padding-1 bg-color-primary-10 rounded-full typo-body-xsmall-bold text-color-primary-50">
									7명
								</span>
							</span>
						}
						nameCell="이하은(아지 송), 전민재(전밈), 손민재(Son), 오지연(치와와), 신유승(유씽씽), 남기훈(긱훈), 조원영(장원영)"
					/>
					<Table.Divider />
					<ControlParticipantRankingPanel.TableRow
						rankCell={
							<span className="flex items-center gap-gap-5">
								<span>2등</span>
								<span className="px-padding-5 py-padding-1 bg-color-primary-10 rounded-full typo-body-xsmall-bold text-color-primary-50">
									3명
								</span>
							</span>
						}
						nameCell="이하은, 장원영, 손민재"
					/>
					<Table.Divider />
					<ControlParticipantRankingPanel.TableRow
						rankCell={
							<span className="flex items-center gap-gap-5">
								<span>3등</span>
								<span className="px-padding-5 py-padding-1 bg-color-primary-10 rounded-full typo-body-xsmall-bold text-color-primary-50">
									1명
								</span>
							</span>
						}
						nameCell="오지연"
					/>
				</Table.Body>
			</Table.Root>
		</ControlParticipantRankingPanel.Root>
	);
};

export default ControlParticipantAnswerRanking;
