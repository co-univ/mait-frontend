import type React from "react";
import { useQuestionScorer, useSubmitRecords } from "../hooks";

interface QuestionSubmissionInfoProps {
	questionSetId: number;
	questionId: number;
	isExpanded: boolean;
}

export const QuestionSubmissionInfo: React.FC<QuestionSubmissionInfoProps> = ({
	questionSetId,
	questionId,
	isExpanded,
}) => {
	const {
		data: scorerData,
		isLoading: scorerLoading,
		refetch: refetchScorer,
	} = useQuestionScorer(questionSetId, questionId);
	const {
		data: submitRecordsData,
		isLoading: recordsLoading,
		refetch: refetchSubmitRecords,
	} = useSubmitRecords(questionSetId, questionId);

	const handleRefresh = async () => {
		await Promise.all([refetchScorer(), refetchSubmitRecords()]);
	};

	if (!isExpanded) {
		return null;
	}

	const isLoading = scorerLoading || recordsLoading;
	const scorer = scorerData?.data;
	const submitRecords = submitRecordsData?.data || [];

	return (
		<div className="mt-4 border-t border-gray-200 pt-4">
			{/* Header with refresh button */}
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-sm font-semibold text-gray-800">제출 정보</h4>
				<button
					onClick={handleRefresh}
					disabled={isLoading}
					className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<svg
						className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					새로고침
				</button>
			</div>

			{isLoading ? (
				<div className="animate-pulse space-y-3">
					<div className="h-4 bg-gray-200 rounded w-1/3"></div>
					<div className="space-y-2">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-3 bg-gray-200 rounded"></div>
						))}
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{/* 득점자 정보 */}
					{scorer ? (
						<div className="bg-green-50 rounded-lg p-3 border border-green-200">
							<h5 className="text-sm font-semibold text-green-800 mb-2">
								🏆 득점자
							</h5>
							<div className="flex items-center gap-3">
								<span className="text-sm font-medium text-green-700">
									{scorer.userName || `사용자 #${scorer.userId}`}
								</span>
								<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
									{scorer.submitOrder}번째 제출
								</span>
							</div>
						</div>
					) : (
						<div className="rounded-lg p-3 border border-gray-200">
							<p className="text-sm text-gray-600">아직 정답자가 없습니다.</p>
						</div>
					)}

					{/* 제출 기록 */}
					<div>
						<h5 className="text-sm font-semibold text-gray-800 mb-3">
							📝 제출 기록 ({submitRecords.length}개)
						</h5>

						{submitRecords.length > 0 ? (
							<div className="space-y-2">
								{submitRecords.map((record) => (
									<div
										key={record.id}
										className={`flex items-center justify-between p-2 rounded border ${
											record.isCorrect
												? "bg-green-50 border-green-200"
												: "bg-red-50 border-red-200"
										}`}
									>
										<div className="flex items-center gap-3">
											<span
												className={`w-2 h-2 rounded-full ${
													record.isCorrect ? "bg-green-500" : "bg-red-500"
												}`}
											/>
											<span className="text-sm font-medium text-gray-700">
												{record.userName || `사용자 #${record.userId}`}
											</span>
										</div>

										<div className="flex items-center gap-2">
											<span
												className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
													record.isCorrect
														? "bg-green-100 text-green-700"
														: "bg-red-100 text-red-700"
												}`}
											>
												{record.isCorrect ? "정답" : "오답"}
											</span>
											<span className="text-xs text-gray-500">
												{record.submitOrder}번째
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-6 rounded-lg border border-gray-200">
								<p className="text-sm text-gray-500">
									아직 제출된 답안이 없습니다.
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
