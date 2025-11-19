import { X } from "lucide-react";
import type { PolicyType } from "@/libs/types";
import AuthCard from "./AuthCard";

//
//
//

interface AuthTermDetailProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	policyType: PolicyType;
	title: string;
	content: string;
}

//
//
//

const AuthTermDetail = ({
	isOpen,
	setIsOpen,
	policyType,
	title,
	content,
}: AuthTermDetailProps) => {
	const type = policyType === "ESSENTIAL" ? "필수" : "선택";

	/**
	 *
	 */
	const handleClose = () => {
		setIsOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<AuthCard title="계정 생성하기" className="relative">
			<X
				className="w-4 h-4 text-gray-50 cursor-pointer top-[12px] right-[12px] absolute"
				onClick={handleClose}
			/>
			<div className="flex flex-col gap-[2rem]">
				<h3 className="text-alpha-black100 w-full typo-body-small-bold font-pretendard flex gap-[4px]">
					<span>[{type}]</span>
					{title}
				</h3>
				<p className="w-full typo-body-small font-pretendard whitespace-pre-line break-keep">
					{content}
				</p>
			</div>
		</AuthCard>
	);
};

export default AuthTermDetail;
