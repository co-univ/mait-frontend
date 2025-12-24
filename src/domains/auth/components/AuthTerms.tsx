import type React from "react";
import { useEffect, useState } from "react";
import CheckBox from "@/components/CheckBox";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shadcn-ui/accordion";
import type { LatestPoliciesApiResponse } from "@/libs/types";
import type { TERM_CHECK_TYPE } from "../pages/AuthCreateAccount";

//
//
//

interface AuthTermsProps {
	terms: LatestPoliciesApiResponse[];
	termChecks: TERM_CHECK_TYPE[];
	setTermChecks: React.Dispatch<React.SetStateAction<TERM_CHECK_TYPE[]>>;
}

//
//
//

const AllTermsAccordionItem = ({
	isAllCheck,
	onToggle,
}: {
	isAllCheck: boolean;
	onToggle: () => void;
}) => (
	<AccordionItem value="전체 약관 동의" className="flex flex-col gap-gap-4">
		<TermCheckboxRow
			checked={isAllCheck}
			label="전체 약관 동의"
			onCheckChange={onToggle}
		/>
		<AccordionContent className="bg-color-gray-5 rounded-radius-medium1 p-padding-8">
			<span className="typo-body-small-bold font-pretendard">
				전체 약관 동의
			</span>
			<p>&nbsp;</p>
			<p>전체 약관 동의 시, 아래 항목에 모두 동의한 것으로 간주됩니다.</p>
			<p>
				&nbsp;• &nbsp;서비스 이용약관 <br />
				&nbsp;• &nbsp;개인정보 수집 및 이용 동의 <br />
				&nbsp;• &nbsp;마케팅 정보 수신 동의 <br />
			</p>
		</AccordionContent>
	</AccordionItem>
);

//
//
//

const TermCheckboxRow = ({
	checked,
	label,
	onCheckChange,
}: {
	checked: boolean;
	label: React.ReactNode;
	onCheckChange: () => void;
}) => (
	<div className="flex items-center w-full justify-between border-0 h-fit">
		<div className="flex items-center gap-gap-4">
			<CheckBox checked={checked} size={20} onChange={onCheckChange} />
			<p className="typo-body-small font-pretendard text-gray-50">{label}</p>
		</div>
		<AccordionTrigger className="text-gray-50" />
	</div>
);

//
//
//

const TermAccordionItem = ({
	term,
	checked,
	onCheckChange,
}: {
	term: LatestPoliciesApiResponse;
	checked: boolean;
	onCheckChange: (isChecked: boolean) => void;
}) => {
	/**
	 *
	 */
	const getType = (termType: string) => {
		return termType === "ESSENTIAL" ? "필수" : "선택";
	};

	return (
		<AccordionItem
			key={term.id}
			value={String(term.id)}
			className="flex flex-col gap-gap-4"
		>
			<TermCheckboxRow
				checked={checked}
				label={
					<>
						<span>[{getType(term.policyType)}] </span>
						{term.title}
					</>
				}
				onCheckChange={() => onCheckChange(checked)}
			/>
			<AccordionContent className="bg-color-gray-5 rounded-radius-medium1 p-padding-8">
				<span className="typo-body-small-bold font-pretendard">
					[{getType(term.policyType)}] {term.title}
				</span>
				<p>&nbsp;</p>
				<p>{term.content}</p>
			</AccordionContent>
		</AccordionItem>
	);
};

//
//
//

const AuthTerms = ({ terms, termChecks, setTermChecks }: AuthTermsProps) => {
	const [isAllCheck, setIsAllCheck] = useState(true);

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
	const handleAllCheckboxChange = () => {
		setIsAllCheck(!isAllCheck);
	};

	//
	useEffect(() => {
		setTermChecks((prev) =>
			prev.map((term) => ({ ...term, isChecked: isAllCheck })),
		);
	}, [isAllCheck, setTermChecks]);

	return (
		<Accordion
			type="single"
			collapsible
			className="w-full flex flex-col gap-gap-5"
		>
			<AllTermsAccordionItem
				isAllCheck={isAllCheck}
				onToggle={handleAllCheckboxChange}
			/>
			{terms.map((term) => (
				<TermAccordionItem
					key={term.id}
					term={term}
					checked={getCheckedState(term.id)}
					onCheckChange={(isChecked) =>
						handleCheckboxChange(term.id, isChecked)
					}
				/>
			))}
		</Accordion>
	);
};

export default AuthTerms;
