import React from "react";

interface QualifierViewProps {
	activeParticipants: Array<{
		participantId: number;
		userId: number;
		participantName: string;
	}>;
	currentUserId: number;
}

const QualifierView = ({
	activeParticipants,
	currentUserId,
}: QualifierViewProps) => {
	const isQualified = activeParticipants.some(
		(participant) => participant.userId === currentUserId,
	);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-4">
						{isQualified ? "🎉 다음 단계 진출!" : "😢 다음 단계 탈락"}
					</h1>
					<p className="text-lg text-gray-600 mb-6">
						{isQualified
							? "축하합니다! 다음 단계에 진출하셨습니다."
							: "아쉽게도 다음 단계에 진출하지 못했습니다."}
					</p>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-4">다음 단계 진출자 명단</h2>
					<div className="bg-gray-50 rounded-lg p-4">
						{activeParticipants.length > 0 ? (
							<ul className="space-y-2">
								{activeParticipants.map((participant, index) => (
									<li
										key={participant.participantId}
										className={`flex items-center justify-between p-3 rounded ${
											participant.userId === currentUserId
												? "bg-blue-100 border-2 border-blue-300"
												: "bg-white"
										}`}
									>
										<span className="font-medium">
											{index + 1}. {participant.participantName}
											{participant.userId === currentUserId && (
												<span className="ml-2 text-blue-600 font-bold">
													(나)
												</span>
											)}
										</span>
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500 text-center">진출자가 없습니다.</p>
						)}
					</div>
				</div>

				{!isQualified && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<p className="text-red-700 text-center">
							다음 문제부터는 풀이에 참여할 수 없습니다.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default QualifierView;
