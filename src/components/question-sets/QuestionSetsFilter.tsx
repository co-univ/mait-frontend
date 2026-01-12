import clsx from "clsx";
import type { QuestionSetVisibility } from "@/libs/types";
import Button from "../Button";
import {
	DEFAULT_VISIBILITY_ICON_SIZE,
	QUESTION_SET_VISIBILITY_CONFIG,
} from "./question-sets.constants";
import useQuestionSetsFilter from "./useQuestionSetsFilter";

//
//
//

const FILTER_CONFIG: {
	label: string;
	icon: React.ReactNode;
	visibility: QuestionSetVisibility;
}[] = (
	Object.entries(QUESTION_SET_VISIBILITY_CONFIG) as [
		QuestionSetVisibility,
		(typeof QUESTION_SET_VISIBILITY_CONFIG)[QuestionSetVisibility],
	][]
).map(([visibility, { Icon, label }]) => ({
	label,
	icon: <Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />,
	visibility,
}));

//
//
//

const QuestionSetsFilter = () => {
	const { getIsVisibilitySelected, handleFilterClick } =
		useQuestionSetsFilter();

	return (
		<div className="flex gap-gap-9">
			{FILTER_CONFIG.map(({ label, icon, visibility }) => (
				<Button
					key={visibility}
					icon={<span className="[&>svg]:size-[20px]">{icon}</span>}
					item={label}
					onClick={() => handleFilterClick(visibility)}
					className={clsx({
						"bg-color-primary-50 border-color-primary-50 text-color-alpha-white100":
							getIsVisibilitySelected(visibility),
					})}
				/>
			))}
		</div>
	);
};

export default QuestionSetsFilter;
