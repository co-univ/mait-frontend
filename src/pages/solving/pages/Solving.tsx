import SolvingLayout from "../layouts/SolvingLayout";
import SolvingQuizContent from "./solving-quiz-content";
import SolvingTopBar from "./solving-top-bar";

//
//
//

const Solving = () => {
	return (
		<SolvingLayout>
			<SolvingTopBar />
			<div className="h-size-height-5" />
			<SolvingQuizContent />
		</SolvingLayout>
	);
};

export default Solving;
