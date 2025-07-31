import SolvingQuizImage from "../../components/SolvingQuizImage";
import SolvingQuizTitle from "../../components/SolvingQuizTitle";
import SolvingQuizContentMultipleAnswers from "./SolvingQuizContentMultipleAnswers";
import SolvingQuizContentOrderAnswers from "./SolvingQuizContentOrderAnswers";

//
//
//

const SolvingQuizContent = () => {
	return (
		<div className="flex flex-col w-full flex-1">
			<SolvingQuizTitle title="GraphQL은 모든 요청을 동일한 () 로 보내며, 요청 방식도 post로 통일되어 있다. 빈칸에 들어갈 말을 고르세요." />
			<SolvingQuizImage src="https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/c71fff82-b7f9-4f9c-87aa-48f1b22bcc5f.jpeg" />
			<div className="flex-grow h-size-height-5" />
			{/* <SolvingQuizContentMultipleAnswers /> */}
			<SolvingQuizContentOrderAnswers />
		</div>
	);
};

export default SolvingQuizContent;
