import type React from "react";
import { Link } from "react-router-dom";
import {
	useEndLiveQuestionSet,
	useLiveStatus,
	useStartLiveQuestionSet,
} from "../hooks";

interface QuizSetControlProps {
	questionSetId: number;
}

export const QuizSetControl: React.FC<QuizSetControlProps> = ({
	questionSetId,
}) => {
	const { data: liveStatusData, isLoading } = useLiveStatus(questionSetId);
	const startLiveMutation = useStartLiveQuestionSet();
	const endLiveMutation = useEndLiveQuestionSet();

	const liveStatus = liveStatusData?.data?.liveStatus;
	const isBeforeLive = liveStatus === "BEFORE_LIVE";
	const isLive = liveStatus === "LIVE";
	const isAfterLive = liveStatus === "AFTER_LIVE";

	const handleStartQuiz = () => {
		console.log("handleStartQuiz 클릭:", questionSetId);
		startLiveMutation.mutate(questionSetId, {
			onSuccess: (data) => {
				console.log("Start mutation success:", data);
			},
			onError: (error) => {
				console.error("Start mutation error:", error);
			},
		});
	};

	const handleEndQuiz = () => {
		console.log("handleEndQuiz 클릭:", questionSetId);
		endLiveMutation.mutate(questionSetId, {
			onSuccess: (data) => {
				console.log("End mutation success:", data);
			},
			onError: (error) => {
				console.error("End mutation error:", error);
			},
		});
	};

	if (isLoading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="animate-pulse">
					<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
					<div className="h-10 bg-gray-200 rounded w-32"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">퀴즈셋 제어</h3>
					<div className="mt-2 flex items-center gap-2">
						<span className="text-sm text-gray-600">현재 상태:</span>
						<span
							className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
								isLive
									? "bg-green-100 text-green-800"
									: isAfterLive
										? "bg-gray-100 text-gray-800"
										: "bg-yellow-100 text-yellow-800"
							}`}
						>
							{isLive ? "진행 중" : isAfterLive ? "종료됨" : "시작 전"}
						</span>
					</div>
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={handleStartQuiz}
						disabled={isLive || isAfterLive || startLiveMutation.isPending}
						className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
							isBeforeLive && !startLiveMutation.isPending
								? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
					>
						{startLiveMutation.isPending ? "시작 중..." : "퀴즈 시작"}
					</button>

					<button
						type="button"
						onClick={handleEndQuiz}
						disabled={!isLive || endLiveMutation.isPending}
						className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
							isLive && !endLiveMutation.isPending
								? "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
					>
						{endLiveMutation.isPending ? "종료 중..." : "퀴즈 종료"}
					</button>
				</div>
			</div>

			{/* 추가 기능 버튼 */}
			<div className="border-t border-gray-200 pt-4">
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">추가 관리 기능</span>
					<Link
						to={`/control/${questionSetId}/participants`}
						className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
					>
						👥 참가자 관리
					</Link>
				</div>
			</div>
		</div>
	);
};
