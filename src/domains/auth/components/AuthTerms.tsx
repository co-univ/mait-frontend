import { ChevronRight } from "lucide-react";
import type React from "react";
import CheckBox from "@/components/CheckBox";
import type { LatestPoliciesApiResponse } from "@/libs/types";
import type { TERM_CHECK_TYPE } from "../pages/AuthCreateAccount";

//
//
//

interface AuthTermsProps {
	terms: LatestPoliciesApiResponse[];
	termChecks: TERM_CHECK_TYPE[];
	setTermChecks: React.Dispatch<React.SetStateAction<TERM_CHECK_TYPE[]>>;
	onDetailClick: (term: LatestPoliciesApiResponse) => void;
}

//
//
//

const AuthTerms = ({
	terms,
	termChecks,
	setTermChecks,
	onDetailClick,
}: AuthTermsProps) => {
	/**
	 *
	 */
	const getType = (termType: string) => {
		return termType === "ESSENTIAL" ? "필수" : "선택";
	};

	/**
	 *
	 */
	const handleCheckboxChange = (policyId: number, isChecked: boolean) => {
		setTermChecks((prev) =>
			prev.map((term) =>
				term.policyId === policyId ? { ...term, isChecked } : term,
			),
		);
	};

	/**
	 *
	 */
	const getCheckedState = (policyId: number) => {
		const term = termChecks.find(
			(termCheck) => termCheck.policyId === policyId,
		);
		return term?.isChecked ?? false;
	};

	/**
	 *
	 */
	const handleDetailClick = (policyId: number) => {
		const term = terms.find((term) => term.id === policyId);
		if (term) {
			onDetailClick(term);
		}
	};

	return (
		<div className="flex flex-col gap-gap-5">
			{terms.map((term) => (
				<div key={term.id} className="flex items-center gap-gap-4">
					<CheckBox
						checked={getCheckedState(term.id)}
						size={20}
						onChange={(isChecked) => handleCheckboxChange(term.id, isChecked)}
					/>
					<p className="typo-body-small text-gray-50">
						<span>[{getType(term.policyType)}] </span>
						{term.title}
					</p>
					<ChevronRight
						className="w-[20px] h-[20px] text-gray-50 ml-auto cursor-pointer"
						onClick={() => handleDetailClick(term.id)}
					/>
				</div>
			))}
		</div>
	);
};

export default AuthTerms;
