import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	useCorrectAnswerRank,
	useEndLiveQuestionSet,
	useLiveStatus,
	useSendWinner,
	useStartLiveQuestionSet,
} from "../hooks";

interface QuizSetControlProps {
	questionSetId: number;
}

export const QuizSetControl: React.FC<QuizSetControlProps> = ({
	questionSetId,
}) => {
	const [showWinnerModal, setShowWinnerModal] = useState(false);

	const { data: liveStatusData, isLoading } = useLiveStatus(questionSetId);
	const { data: rankData } = useCorrectAnswerRank(questionSetId);
	const startLiveMutation = useStartLiveQuestionSet();
	const endLiveMutation = useEndLiveQuestionSet();
	const sendWinnerMutation = useSendWinner();

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

	const handleSendWinner = () => {
		const activeParticipants = rankData?.data?.activeParticipants || [];
		const winnerUserIds = activeParticipants
			.map((participant) => participant.participantInfos?.userId)
			.filter((id): id is number => id !== undefined);

		if (winnerUserIds.length === 0) {
			alert("우승자로 설정할 참가자가 없습니다.");
			return;
		}

		sendWinnerMutation.mutate(
			{
				questionSetId,
				data: { winnerUserIds },
			},
			{
				onSuccess: () => {
					alert(`${winnerUserIds.length}명의 우승자가 전송되었습니다!`);
				},
				onError: (error) => {
					console.error("Send winner error:", error);
					alert("우승자 전송에 실패했습니다.");
				},
			},
		);
	};

	if (isLoading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="animate-pulse">
					<div className="mb-4 h-6 w-1/4 rounded bg-gray-200"></div>
					<div className="h-10 w-32 rounded bg-gray-200"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center justify-between">
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
								: "cursor-not-allowed bg-gray-300 text-gray-500"
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
								: "cursor-not-allowed bg-gray-300 text-gray-500"
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
					<div className="flex gap-3">
						<Link
							to={`/control/${questionSetId}/participants`}
							className="inline-flex items-center gap-2 rounded-md bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
						>
							👥 참가자 관리
						</Link>
						<button
							type="button"
							onClick={handleSendWinner}
							disabled={
								sendWinnerMutation.isPending ||
								!rankData?.data?.activeParticipants?.length
							}
							className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
								!sendWinnerMutation.isPending &&
								rankData?.data?.activeParticipants?.length
									? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
									: "cursor-not-allowed bg-gray-100 text-gray-500"
							}`}
						>
							🏆 {sendWinnerMutation.isPending ? "전송 중..." : "우승자 보내기"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
