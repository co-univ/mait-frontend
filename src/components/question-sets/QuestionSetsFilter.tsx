import clsx from "clsx";
import { useMemo } from "react";
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

const DEFAULT_VISIBILITIES: QuestionSetVisibility[] = [
	"PUBLIC",
	"GROUP",
	"PRIVATE",
];

//
//
//

interface QuestionSetsFilterProps {
	visibilities?: QuestionSetVisibility[];
}

const QuestionSetsFilter = ({ visibilities }: QuestionSetsFilterProps = {}) => {
	const { getIsVisibilitySelected, handleFilterClick } =
		useQuestionSetsFilter();

	//
	const filterConfig = useMemo(() => {
		const targetVisibilities = visibilities || DEFAULT_VISIBILITIES;

		return targetVisibilities.map((visibility) => {
			const { Icon, label } = QUESTION_SET_VISIBILITY_CONFIG[visibility];

			return {
				label,
				icon: <Icon size={DEFAULT_VISIBILITY_ICON_SIZE} />,
				visibility,
			};
		});
	}, [visibilities]);

	return (
		<div className="flex gap-gap-9">
			{filterConfig.map(({ label, icon, visibility }) => (
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
