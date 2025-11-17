import { Tabs } from "@/components/tabs";

//
//
//

const ControlSolvingSubmissionTabs = () => {
	return (
		<div className="flex gap-gap-5">
			<Tabs.List>
				<Tabs.Trigger value="all">선착순</Tabs.Trigger>
			</Tabs.List>
			<Tabs.List>
				<Tabs.Trigger value="correct">
					<div className="flex items-center gap-gap-5">
						정답자
						<span className="py-padding-1 px-padding-5 bg-color-success-10 rounded-full typo-body-xsmall-bold text-color-success-50">
							4
						</span>
					</div>
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.List>
				<Tabs.Trigger value="incorrect">
					<div className="flex items-center gap-gap-5">
						오답자
						<span className="py-padding-1 px-padding-5 bg-color-point-10 rounded-full typo-body-xsmall-bold text-color-danger-50">
							2
						</span>
					</div>
				</Tabs.Trigger>
			</Tabs.List>
		</div>
	);
};

export default ControlSolvingSubmissionTabs;
