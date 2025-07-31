import { ChevronRight, Puzzle } from "lucide-react";
import { useState } from "react";
import SolvingQuizAnswer from "../components/SolvingQuizAnswer";
import SolvingQuizTitle from "../components/SolvingQuizTitle";
import SolvingLayout from "../layouts/SolvingLayout";
import SolvingControls from "./SolvingControls";
import SolvingHeader from "./SolvingHeader";

//
//
//

const Solving = () => {
	const [answer, setAnswer] = useState<string>("dfdf");

	const handleAnswerChange = (value: string) => {
		setAnswer(value);
	};

	return (
		<SolvingLayout>
			<div className="sticky top-0 bg-alpha-white100">
				<SolvingHeader title="문제 해결" percentage={20} />

				<div className="h-size-height-5" />

				<SolvingControls
					badgeLabel="Q1"
					badgeIcon={<Puzzle className="stroke-primary-50" />}
					buttonLabel="제출하기"
					buttonIcon={<ChevronRight className="stroke-primary-50" />}
				/>
			</div>

			<div className="h-size-height-5" />

			<div className="flex flex-col w-full flex-1">
				<SolvingQuizTitle title="GraphQL은 모든 요청을 동일한 () 로 보내며, 요청 방식도 post로 통일되어 있다. 빈칸에 들어갈 말을 고르세요." />

				<div className="flex-grow h-size-height-5" />

				<SolvingQuizAnswer
					readonly
					value={answer}
					onChange={handleAnswerChange}
					placeholder="답을 입력하세요."
				/>
			</div>
		</SolvingLayout>
	);
};

export default Solving;
