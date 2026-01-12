import type { OrderingOptionApiResponse } from "@/libs/types";
import type { SolvingAnswerProps } from "./SolvingAnswer";
import SolvingAnswer from "./SolvingAnswer";

//
//
//

interface SolvingAnswerOrderingProps extends SolvingAnswerProps {
	option: OrderingOptionApiResponse;
}

//
//
//

const SolvingAnswerOrdering = ({
	option,
	...props
}: SolvingAnswerOrderingProps) => {
	return (
		<div className="w-full flex items-center gap-gap-9">
			<span className="typo-heading-xsmall">
				{String.fromCharCode(65 - 1 + option.originOrder)}
			</span>
			<div className="w-full">
				<SolvingAnswer {...props} readOnly content={option.content} />
			</div>
		</div>
	);
};

export default SolvingAnswerOrdering;
