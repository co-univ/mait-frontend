import SolvingQuizTitle from "../../components/SolvingQuizTitle";
import SolvingQuizContentMultipleAnswer from "./SolvingQuizContentMultipleAnswer";

//
//
//

const SolvingQuizContent = () => {
	return (
		<div className="flex flex-col w-full flex-1">
			<SolvingQuizTitle title="GraphQL은 모든 요청을 동일한 () 로 보내며, 요청 방식도 post로 통일되어 있다. 빈칸에 들어갈 말을 고르세요." />
			<div className="flex-grow h-size-height-5" />
			<SolvingQuizContentMultipleAnswer />
		</div>
	);
};

export default SolvingQuizContent;
