import { SquarePen } from "lucide-react";
import type React from "react";

//
//
//

interface QuestionSetsLayoutPops {
	children: React.ReactNode;
}

//
//
//

const QuestionSetsLayout = ({ children }: QuestionSetsLayoutPops) => {
	return (
		<div className="flex flex-col gap-gap-11 py-padding-12">
			<div className="flex gap-gap-5 items-center">
				<SquarePen size={32} />
				<h1 className="typo-heading-medium">문제 관리</h1>
			</div>

			<div>{children}</div>
		</div>
	);
};

export default QuestionSetsLayout;
