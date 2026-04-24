import { PencilLine } from "lucide-react";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { CONTROL_ROUTE_PATH } from "../../../control.routes";
import ControlSolvingQuestionNavigation from "../common/ControlSolvingQuestionNavigation";
import ControlStudySolvingQuestion from "./question/ControlStudySolvingQuestion";
import ControlStudySolvingSubmission from "./submission/ControlStudySolvingSubmission";

//
//
//

const ControlStudySolving = () => {
	return (
		<LabeledPageLayout icon={<PencilLine />} label="문제 풀이 관리">
			<div className="flex flex-col gap-gap-11">
				<ControlSolvingQuestionNavigation
					routePath={CONTROL_ROUTE_PATH.STUDY_SOLVING}
				/>
				<div className="flex gap-gap-10 w-full">
					<div className="flex-[2] w-0">
						<ControlStudySolvingQuestion />
					</div>
					<div className="flex-[3] min-w-0">
						<ControlStudySolvingSubmission />
					</div>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default ControlStudySolving;
