import { ChevronRight } from "lucide-react";
import type React from "react";
import CheckBox from "@/components/CheckBox";
import type { LatestPoliciesApiResponse } from "@/libs/types";
import type { TERM_CHECK_TYPE } from "../pages/AuthCreateAccount";

//
//
//

export const TERMS_ITEMS: LatestPoliciesApiResponse[] = [
	{
		id: 0,
		title: "서비스 이용약관 동의 (필수)",
		content: "서비스 이용약관에 동의합니다.",
		policyType: "ESSENTIAL",
		timing: "SIGN_UP",
		category: "TERMS_OF_SERVICE",
	},
	{
		id: 1,
		title: "개인정보 처리방침 동의 (필수)",
		content: "개인정보 처리방침에 동의합니다.",
		policyType: "ESSENTIAL",
		timing: "SIGN_UP",
		category: "TERMS_OF_SERVICE",
	},
	{
		id: 2,
		title: "마케팅 정보 수신 동의 (선택)",
		content: "마케팅 정보 수신에 동의합니다.",
		policyType: "OPTIONAL",
		timing: "SIGN_UP",
		category: "TERMS_OF_SERVICE",
	},
];

export const TERM_CHECKS = [
	{ policyId: 0, isChecked: true },
	{ policyId: 1, isChecked: true },
	{ policyId: 2, isChecked: false },
];

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
		const term = TERMS_ITEMS.find((term) => term.id === policyId);
		if (term) {
			onDetailClick(term);
		}
	};

	return (
		<div className="flex flex-col gap-gap-5">
			{TERMS_ITEMS.map((term) => (
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
