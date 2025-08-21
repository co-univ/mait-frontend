import type React from "react";
import { useQuestions } from "../hooks";
import { QuestionControl } from "./QuestionControl";

interface QuestionListProps {
	questionSetId: number;
}

export const QuestionList: React.FC<QuestionListProps> = ({
	questionSetId,
}) => {
	const { data: questionsData, isLoading, error } = useQuestions(questionSetId);

	if (isLoading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					문제별 제어
				</h3>
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="animate-pulse">
							<div className="h-20 rounded bg-gray-200"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
				<h3 className="mb-2 text-lg font-semibold text-red-900">문제별 제어</h3>
				<p className="text-sm text-red-700">
					문제 목록을 불러오는데 실패했습니다.
				</p>
			</div>
		);
	}

	const questions = questionsData?.data || [];

	if (questions.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					문제별 제어
				</h3>
				<p className="text-sm text-gray-600">등록된 문제가 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">
				문제별 제어 ({questions.length}개)
			</h3>
			<div className="space-y-3">
				{questions.map((question) => (
					<QuestionControl
						key={question.id}
						questionSetId={questionSetId}
						questionId={question.id}
						questionNumber={question.number}
						questionContent={question.content || "내용 없음"}
					/>
				))}
			</div>
		</div>
	);
};
