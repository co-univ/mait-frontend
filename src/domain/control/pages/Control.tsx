import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	QuestionList,
	QuestionSetSelector,
	QuizSetControl,
} from "../components";
import { ControlLayout } from "../layouts";

const Control = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const urlQuestionSetId = Number(searchParams.get("questionSetId"));

	const [selectedQuestionSetId, setSelectedQuestionSetId] = useState<number>(
		urlQuestionSetId || 0,
	);

	const handleSelectQuestionSet = (questionSetId: number) => {
		setSelectedQuestionSetId(questionSetId);
		setSearchParams({ questionSetId: questionSetId.toString() });
	};

	return (
		<ControlLayout
			title="퀴즈 제어"
			subtitle={
				selectedQuestionSetId
					? `퀴즈셋 #${selectedQuestionSetId} 실시간 제어 패널`
					: "제어할 퀴즈셋을 선택해주세요"
			}
		>
			<QuestionSetSelector
				selectedQuestionSetId={selectedQuestionSetId || undefined}
				onSelectQuestionSet={handleSelectQuestionSet}
			/>

			{selectedQuestionSetId > 0 && (
				<>
					<QuizSetControl questionSetId={selectedQuestionSetId} />
					<QuestionList questionSetId={selectedQuestionSetId} />
				</>
			)}
		</ControlLayout>
	);
};

export default Control;
