import type React from "react";
import { useQuestionSets } from "../hooks";

interface QuestionSetSelectorProps {
	selectedQuestionSetId?: number;
	onSelectQuestionSet: (questionSetId: number) => void;
}

export const QuestionSetSelector: React.FC<QuestionSetSelectorProps> = ({
	selectedQuestionSetId,
	onSelectQuestionSet,
}) => {
	const teamId = Number(process.env.PUBLIC_TEAM_ID) || 1;
	const { data: questionSetsData, isLoading, error } = useQuestionSets(teamId);

	if (isLoading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="animate-pulse">
					<div className="mb-4 h-6 w-1/4 rounded bg-gray-200"></div>
					<div className="h-10 w-full rounded bg-gray-200"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
				<h3 className="mb-2 text-lg font-semibold text-red-900">문제셋 선택</h3>
				<p className="text-sm text-red-700">
					문제셋 목록을 불러오는데 실패했습니다.
				</p>
			</div>
		);
	}

	const questionSets = questionSetsData?.data || [];

	if (questionSets.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					문제셋 선택
				</h3>
				<p className="text-sm text-gray-600">등록된 문제셋이 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">
				문제셋 선택 ({questionSets.length}개)
			</h3>

			<div className="space-y-3">
				{questionSets.map((questionSet) => {
					const isSelected = selectedQuestionSetId === questionSet.id;
					const createdDate = new Date(
						questionSet.createdAt,
					).toLocaleDateString("ko-KR");

					return (
						<div
							key={questionSet.id}
							className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
								isSelected
									? "border-blue-500 bg-blue-50"
									: "border-gray-200 bg-white hover:border-gray-300"
							}`}
							onClick={() => onSelectQuestionSet(questionSet.id)}
						>
							<div className="flex items-start justify-between">
								<div className="min-w-0 flex-1">
									<div className="mb-2 flex items-center gap-3">
										<h4 className="text-base font-medium text-gray-900">
											{questionSet.title ||
												questionSet.subject ||
												`문제셋 #${questionSet.id}`}
										</h4>
										<div className="flex gap-2">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
													questionSet.creationType === "AI_GENERATED"
														? "bg-purple-100 text-purple-700"
														: "bg-blue-100 text-blue-700"
												}`}
											>
												{questionSet.creationType === "AI_GENERATED"
													? "AI 생성"
													: "수동 생성"}
											</span>
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
													questionSet.deliveryMode === "LIVE_TIME"
														? "bg-green-100 text-green-700"
														: "bg-gray-100 text-gray-700"
												}`}
											>
												{questionSet.deliveryMode === "LIVE_TIME"
													? "실시간"
													: "복습"}
											</span>
										</div>
									</div>

									<div className="flex items-center gap-4 text-sm text-gray-600">
										<span>문제 수: {questionSet.questionCount}개</span>
										<span>생성일: {createdDate}</span>
										{questionSet.subject && (
											<span>주제: {questionSet.subject}</span>
										)}
									</div>
								</div>

								{isSelected && (
									<div className="ml-4 flex-shrink-0">
										<div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
											<svg
												className="h-3 w-3 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{selectedQuestionSetId && (
				<div className="mt-4 rounded-md bg-blue-50 p-3">
					<p className="text-sm text-blue-800">
						✅ 문제셋 #{selectedQuestionSetId}이(가) 선택되었습니다.
					</p>
				</div>
			)}
		</div>
	);
};
