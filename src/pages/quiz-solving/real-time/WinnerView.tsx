import React from "react";

interface WinnerViewProps {
	activeParticipants: Array<{
		participantId: number;
		userId: number;
		participantName: string;
	}>;
	currentUserId: number;
}

const WinnerView = ({ activeParticipants, currentUserId }: WinnerViewProps) => {
	const isWinner = activeParticipants.some(
		(participant) => participant.userId === currentUserId,
	);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
				<div className="text-center mb-8">
					<div className="text-6xl mb-4">🏆</div>
					<h1 className="text-3xl font-bold mb-4">
						{isWinner ? "🎉 우승!" : "게임 종료"}
					</h1>
					<p className="text-lg text-gray-600 mb-6">
						{isWinner
							? "축하합니다! 퀴즈 대회에서 우승하셨습니다!"
							: "퀴즈 대회가 종료되었습니다."}
					</p>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-4">최종 순위</h2>
					<div className="bg-gray-50 rounded-lg p-4">
						{activeParticipants.length > 0 ? (
							<ul className="space-y-2">
								{activeParticipants.map((participant, index) => (
									<li
										key={participant.participantId}
										className={`flex items-center justify-between p-3 rounded ${
											participant.userId === currentUserId
												? "bg-yellow-100 border-2 border-yellow-300"
												: "bg-white"
										}`}
									>
										<span className="font-medium">
											{index === 0 && "🥇 "}
											{index === 1 && "🥈 "}
											{index === 2 && "🥉 "}
											{index + 1}. {participant.participantName}
											{participant.userId === currentUserId && (
												<span className="ml-2 text-yellow-600 font-bold">
													(나)
												</span>
											)}
										</span>
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500 text-center">참가자가 없습니다.</p>
						)}
					</div>
				</div>

				{isWinner && (
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
						<p className="text-yellow-700 text-center font-semibold">
							🎊 우승을 축하합니다! 🎊
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default WinnerView;
