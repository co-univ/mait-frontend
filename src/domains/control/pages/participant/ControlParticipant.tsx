import { BellRing } from "lucide-react";
import Button from "@/components/Button";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import ControlParticipantNextMembers from "./ControlParticipantNextMembers";

//
//
//

const ControlParticipant = () => {
	/**
	 *
	 */
	const renderSubmitButtons = () => {
		return (
			<div className="flex gap-gap-10">
				<Button
					item="진출자 확정하기"
					className="border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50"
				/>
				<Button
					item="우승자 선정"
					className="border-none bg-color-primary-5 !typo-heading-xsmall text-color-primary-50"
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
				<ControlParticipantNextMembers />
			</div>
		</LabeledPageLayout>
	);
};

export default ControlParticipant;
