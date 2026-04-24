import { BellRing, RefreshCw } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import useControlParticipants from "../../../hooks/paticipant/useControlParticipants";
import ControlLiveParticipantActiveMembers from "./ControlLiveParticipantActiveMembers";
import ControlLiveParticipantCorrectRanking from "./ControlLiveParticipantCorrectRanking";
import ControlLiveParticipantScorerRanking from "./ControlLiveParticipantScorerRanking";

//
//
//

const ControlLiveParticipant = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { refreshParticipants, handleSumbitParticipants, handleSubmitWinner } =
		useControlParticipants({
			questionSetId,
		});

	/**
	 *
	 */
	const renderSubmitButtons = () => {
		return (
			<div className="flex gap-gap-5">
				<Button
					icon={<RefreshCw />}
					onClick={refreshParticipants}
					className="border-none text-color-gray-50"
				/>
				<Button
					item="진출자 선정"
					onClick={handleSumbitParticipants}
					className="border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50 disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
				<Button
					item="우승자 선정"
					onClick={handleSubmitWinner}
					className="border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50 disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
			</div>
		);
	};

	return (
		<LabeledPageLayout
			label="다음진출자 선정"
			icon={<BellRing />}
			rightContent={renderSubmitButtons()}
		>
			<div className="flex flex-col gap-gap-11">
				<ControlLiveParticipantActiveMembers />
				<div className="flex items-stretch gap-gap-9">
					<div className="flex flex-[2]">
						<ControlLiveParticipantScorerRanking />
					</div>
					<div className="flex flex-[3]">
						<ControlLiveParticipantCorrectRanking />
					</div>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default ControlLiveParticipant;
