import {
	Check,
	ChevronDown,
	Grid2x2Check,
	GripHorizontal,
	ListOrdered,
	Table,
} from "lucide-react";
import type React from "react";
import { Dropdown } from "@/components/dropdown";
import useCreateQuestion from "@/domains/creation/hooks/question/_useCreationQuestion";
import type { QuestionType } from "@/libs/types";

//
//
//

const QUESTION_TYPES = [
	{
		value: "MULTIPLE",
		label: "객관식",
		icon: <GripHorizontal size={20} />,
	},
	{
		value: "SHORT",
		label: "주관식",
		icon: <ListOrdered size={20} />,
	},
	{
		value: "FILL_BLANK",
		label: "빈칸 넣기",
		icon: <Table size={20} />,
	},
	{
		value: "ORDERING",
		label: "순서",
		icon: <Grid2x2Check size={20} />,
	},
] as const satisfies ReadonlyArray<{
	value: QuestionType;
	label: string;
	icon: React.ReactNode;
}>;

interface CreationQuestionAdditionalDropdownProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionAdditionalDropdown = ({
	questionSetId,
	questionId,
}: CreationQuestionAdditionalDropdownProps) => {
	const { question, changeType } = useCreateQuestion({
		questionSetId,
		questionId,
	});

	const selectedType = QUESTION_TYPES.find(
		(type) => type.value === (question?.type as QuestionType),
	);

	return (
		<Dropdown.Root
			value={question?.type}
			onValueChange={(value) => changeType(value as QuestionType)}
		>
			<Dropdown.Trigger icon={<ChevronDown size={16} />}>
				{selectedType?.label}
			</Dropdown.Trigger>

			<Dropdown.Content>
				<Dropdown.Item value="header" isHeader>
					문제셋
				</Dropdown.Item>

				<Dropdown.Divider />

				{QUESTION_TYPES.map((type) => (
					<Dropdown.Item
						key={type.value}
						value={type.value}
						icon={type.icon}
						checkIcon={<Check size={16} />}
					>
						{type.label}
					</Dropdown.Item>
				))}
			</Dropdown.Content>
		</Dropdown.Root>
	);
};

export default CreationQuestionAdditionalDropdown;
