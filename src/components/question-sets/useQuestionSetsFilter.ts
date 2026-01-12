import { useSearchParams } from "react-router-dom";
import type { QuestionSetVisibility } from "@/libs/types";

//
//
//

interface UseQuestionSetsFilterReturn {
	getVisibilities: () => QuestionSetVisibility[];
	getIsVisibilitySelected: (visibility: QuestionSetVisibility) => boolean;
	getIsVisibilityFiltered: (visibility: QuestionSetVisibility) => boolean;
	setVisibilities: (visibilities: QuestionSetVisibility[]) => void;
	handleFilterClick: (visibility: QuestionSetVisibility) => void;
}

//
//
//

const useQuestionSetsFilter = (): UseQuestionSetsFilterReturn => {
	const [searchParams, setSearchParams] = useSearchParams();

	/**
	 *
	 */
	const getVisibilities = (): QuestionSetVisibility[] => {
		const param = searchParams.get("visibility");

		if (!param) {
			return [];
		}

		return param.split(",") as QuestionSetVisibility[];
	};

	/**
	 * Check if a specific visibility option is currently selected in the filter (in URL params)
	 */
	const getIsVisibilitySelected = (visibility: QuestionSetVisibility) => {
		return getVisibilities().includes(visibility);
	};

	/**
	 * Check if a question set with the given visibility should be displayed
	 * Returns true if no filters are selected (show all) or if the visibility matches the filter
	 */
	const getIsVisibilityFiltered = (visibility: QuestionSetVisibility) => {
		const visibilities = getVisibilities();

		if (visibilities.length === 0) {
			return true;
		}

		return visibilities.includes(visibility);
	};

	/**
	 *
	 */
	const setVisibilities = (visibilities: QuestionSetVisibility[]) => {
		const newParams = new URLSearchParams(searchParams);

		if (visibilities.length === 0) {
			newParams.delete("visibility");
		} else {
			newParams.set("visibility", visibilities.join(","));
		}

		setSearchParams(newParams);
	};

	/**
	 *
	 */
	const handleFilterClick = (visibility: QuestionSetVisibility) => {
		const currentVisibilities = getVisibilities();

		if (currentVisibilities.includes(visibility)) {
			setVisibilities(currentVisibilities.filter((v) => v !== visibility));
		} else {
			setVisibilities([...currentVisibilities, visibility]);
		}
	};

	return {
		getVisibilities,
		getIsVisibilitySelected,
		getIsVisibilityFiltered,
		setVisibilities,
		handleFilterClick,
	};
};

export default useQuestionSetsFilter;
