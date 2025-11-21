import { BellRing } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import useControlParticipants from "../../hooks/paticipant/useControlParticipants";
import ControlParticipantActiveMembers from "./ControlParticipantActiveMembers";
import ControlParticipantCorrectRanking from "./ControlParticipantCorrectRanking";
import ControlParticipantScorerRanking from "./ControlParticipantScorerRanking";

//
//
//

const ControlParticipant = () => {
	const questionSetId = Number(useParams().questionSetId);

	const { isEditing, isMutating, handleSumbitParticipants } =
		useControlParticipants({
			questionSetId,
		});

	/**
	 *
	 */
	const renderSubmitButtons = () => {
		return (
			<div className="flex gap-gap-10">
				<Button
					disabled={!isEditing || isMutating}
					item="진출자 확정하기"
					onClick={handleSumbitParticipants}
					className="border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50 disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
				<Button
					disabled={!isEditing || isMutating}
					item="우승자 선정"
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
				<ControlParticipantActiveMembers />
				<div className="flex items-stretch gap-gap-9">
					<div className="flex flex-[2]">
						<ControlParticipantScorerRanking />
					</div>
					<div className="flex flex-[3]">
						<ControlParticipantCorrectRanking />
					</div>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default ControlParticipant;
