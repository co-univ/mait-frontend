import type { SolvingAnswerProps } from "./SolvingAnswer";
import SolvingAnswer from "./SolvingAnswer";

//
//
//

interface SolvingAnswerShortProps extends SolvingAnswerProps {
	answer: string;
}

//
//
//

const SolvingAnswerShort = ({ answer, ...props }: SolvingAnswerShortProps) => {
	return <SolvingAnswer {...props} content={answer} />;
};

export default SolvingAnswerShort;
