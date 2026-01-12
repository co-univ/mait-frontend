import type { SolvingAnswerProps } from "./SolvingAnswer";
import SolvingAnswer from "./SolvingAnswer";

//
//
//

interface SolvingAnswerShortProps extends SolvingAnswerProps {
	answer: string;
	onAnswerChange: (answer: string) => void;
}

//
//
//

const SolvingAnswerShort = ({
	answer,
	onAnswerChange,
	...props
}: SolvingAnswerShortProps) => {
	return (
		<SolvingAnswer {...props} content={answer} onChange={onAnswerChange} />
	);
};

export default SolvingAnswerShort;
