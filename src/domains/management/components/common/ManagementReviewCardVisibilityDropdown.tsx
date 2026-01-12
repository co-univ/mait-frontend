import { Check } from "lucide-react";
import { Dropdown } from "@/components/dropdown";
import {
	DEFAULT_VISIBILITY_ICON_SIZE,
	QUESTION_SET_VISIBILITY_CONFIG,
} from "@/components/question-sets/question-sets.constants";
import type { QuestionSetVisibility } from "@/libs/types";

//
//
//

interface ManagementReviewCardVisibilityDropdownProps {
	currentVisibility: QuestionSetVisibility;
	onVisibilityChange: (value: QuestionSetVisibility) => void;
}

//
//
//

const ManagementReviewCardVisibilityDropdown = ({
	currentVisibility,
	onVisibilityChange,
}: ManagementReviewCardVisibilityDropdownProps) => {
	const { Icon, label } = QUESTION_SET_VISIBILITY_CONFIG[currentVisibility];

	return (
		<Dropdown.Root value={currentVisibility} onValueChange={onVisibilityChange}>
			<Dropdown.Trigger className="border-none bg-transparent !p-0 !mb-0">
				<div className="flex gap-gap-5 items-center">
					<Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />
					<span className="typo-body-xsmall">{label}</span>
				</div>
			</Dropdown.Trigger>
			<Dropdown.Content autoWidth>
				{Object.entries(QUESTION_SET_VISIBILITY_CONFIG).map(([key, config]) => (
					<Dropdown.Item
						key={key}
						value={key}
						icon={<config.Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />}
						checkIcon={<Check size={16} />}
					>
						{config.label}
					</Dropdown.Item>
				))}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default ManagementReviewCardVisibilityDropdown;
