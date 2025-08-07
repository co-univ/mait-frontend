import type React from "react";
import { useState } from "react";
import {
	useAllowQuestionAccess,
	useAllowQuestionSolve,
	useQuestion,
} from "../hooks";
import { QuestionSubmissionInfo } from "./QuestionSubmissionInfo";

interface QuestionControlProps {
	questionSetId: number;
	questionId: number;
	questionNumber: number;
	questionContent: string;
}

export const QuestionControl: React.FC<QuestionControlProps> = ({
	questionSetId,
	questionId,
	questionNumber,
	questionContent,
}) => {
	const [isSubmissionInfoExpanded, setIsSubmissionInfoExpanded] =
		useState(false);

	// Get question status from server
	const { data: questionData } = useQuestion(questionSetId, questionId);

	// Extract question status from API response
	const questionStatus = questionData?.data?.questionStatusType;
	const isAccessible =
		questionStatus === "ACCESS_PERMISSION" ||
		questionStatus === "SOLVE_PERMISSION";
	const isSolvable = questionStatus === "SOLVE_PERMISSION";

	const allowAccessMutation = useAllowQuestionAccess();
	const allowSolveMutation = useAllowQuestionSolve();

	const handleAccessToggle = async () => {
		try {
			if (!isAccessible) {
				await allowAccessMutation.mutateAsync({ questionSetId, questionId });
			}
			// State will be updated via server refresh from mutation's onSuccess
		} catch (error) {
			console.error("접근 제어 실패:", error);
		}
	};

	const handleSolveToggle = async () => {
		try {
			if (!isSolvable) {
				if (!isAccessible) {
					await allowAccessMutation.mutateAsync({ questionSetId, questionId });
				}
				await allowSolveMutation.mutateAsync({ questionSetId, questionId });
			}
			// State will be updated via server refresh from mutation's onSuccess
		} catch (error) {
			console.error("풀이 제어 실패:", error);
		}
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-3 mb-2">
						<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
							문제 {questionNumber}
						</span>
						<div className="flex gap-2">
							<span
								className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
									isAccessible
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								접근 {isAccessible ? "ON" : "OFF"}
							</span>
							<span
								className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
									isSolvable
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								풀이 {isSolvable ? "ON" : "OFF"}
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-700 line-clamp-2">
						{questionContent}
					</p>
				</div>

				<div className="flex flex-col gap-2 ml-4">
					<button
						type="button"
						onClick={handleAccessToggle}
						disabled={allowAccessMutation.isPending}
						className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
							isAccessible
								? "bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
								: "bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
						}`}
					>
						{allowAccessMutation.isPending
							? "처리 중..."
							: isAccessible
								? "접근 OFF"
								: "접근 ON"}
					</button>

					<button
						type="button"
						onClick={handleSolveToggle}
						disabled={allowSolveMutation.isPending}
						className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
							isSolvable
								? "bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
								: "bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
						}`}
					>
						{allowSolveMutation.isPending
							? "처리 중..."
							: isSolvable
								? "풀이 OFF"
								: "풀이 ON"}
					</button>

					<button
						type="button"
						onClick={() =>
							setIsSubmissionInfoExpanded(!isSubmissionInfoExpanded)
						}
						className="rounded-md px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
					>
						{isSubmissionInfoExpanded ? "제출 정보 숨기기" : "제출 정보 보기"}
					</button>
				</div>
			</div>

			{isSolvable && !isAccessible && (
				<div className="mt-2 rounded-md bg-yellow-50 p-2">
					<p className="text-xs text-yellow-800">
						⚠️ 풀이가 ON이면 접근도 자동으로 ON됩니다.
					</p>
				</div>
			)}

			<QuestionSubmissionInfo
				questionSetId={questionSetId}
				questionId={questionId}
				isExpanded={isSubmissionInfoExpanded}
			/>
		</div>
	);
};
