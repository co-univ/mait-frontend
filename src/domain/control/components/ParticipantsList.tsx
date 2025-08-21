import type React from "react";
import { useState } from "react";
import {
	useActiveParticipants,
	useCorrectAnswerRank,
	useUpdateActiveParticipants,
} from "../hooks";

interface ParticipantsListProps {
	questionSetId: number;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
	questionSetId,
}) => {
	const {
		data: participantsData,
		isLoading: participantsLoading,
		error: participantsError,
	} = useActiveParticipants(questionSetId);
	const {
		data: rankData,
		isLoading: rankLoading,
		error: rankError,
	} = useCorrectAnswerRank(questionSetId);
	const updateParticipantsMutation = useUpdateActiveParticipants();

	const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

	const participants = participantsData?.data || [];
	const activeParticipants = rankData?.data?.activeParticipants || [];
	const eliminatedParticipants = rankData?.data?.eliminatedParticipants || [];

	// Combine all participants for selection
	const allParticipants = [
		...activeParticipants.map((p) => ({
			...p.participantInfos!,
			isActive: true,
			correctAnswerCount: p.correctAnswerCount || 0,
		})),
		...eliminatedParticipants.map((p) => ({
			...p.participantInfos!,
			isActive: false,
			correctAnswerCount: p.correctAnswerCount || 0,
		})),
	];

	const handleParticipantToggle = (userId: number) => {
		setSelectedUserIds((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId],
		);
	};

	const handleSelectAll = () => {
		const allUserIds = allParticipants.map((p) => p.userId);
		if (selectedUserIds.length === allUserIds.length) {
			setSelectedUserIds([]);
		} else {
			setSelectedUserIds(allUserIds);
		}
	};

	const handleSelectActiveOnly = () => {
		setSelectedUserIds(
			activeParticipants.map((p) => p.participantInfos!.userId),
		);
	};

	const handleUpdateParticipants = async () => {
		try {
			await updateParticipantsMutation.mutateAsync({
				questionSetId,
				data: { activeUserIds: selectedUserIds },
			});
			alert(
				`${selectedUserIds.length}명의 참가자가 다음 단계 진출자로 설정되었습니다.`,
			);
		} catch (error) {
			console.error("참가자 업데이트 실패:", error);
			alert("참가자 업데이트에 실패했습니다.");
		}
	};

	const isLoading = participantsLoading || rankLoading;
	const error = participantsError || rankError;

	if (isLoading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="animate-pulse space-y-4">
					<div className="h-6 w-1/3 rounded bg-gray-200"></div>
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="flex items-center space-x-3">
							<div className="h-4 w-4 rounded bg-gray-200"></div>
							<div className="h-4 flex-1 rounded bg-gray-200"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
				<h3 className="mb-2 text-lg font-semibold text-red-900">참가자 목록</h3>
				<p className="text-sm text-red-700">
					참가자 목록을 불러오는데 실패했습니다.
				</p>
			</div>
		);
	}

	if (allParticipants.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					참가자 관리
				</h3>
				<div className="rounded-lg border border-gray-200 py-8 text-center">
					<p className="text-sm text-gray-500">참가자가 없습니다.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* 전체 랭킹 */}
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="mb-6 flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900">
						전체 부원 득점 순위 ({allParticipants.length}명)
					</h3>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleSelectActiveOnly}
							className="rounded-md bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
						>
							현재 참가자만 선택
						</button>
						<button
							type="button"
							onClick={handleSelectAll}
							className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
						>
							{selectedUserIds.length === allParticipants.length
								? "전체 해제"
								: "전체 선택"}
						</button>
						<button
							type="button"
							onClick={handleUpdateParticipants}
							disabled={
								updateParticipantsMutation.isPending ||
								selectedUserIds.length === 0
							}
							className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
								selectedUserIds.length > 0 &&
								!updateParticipantsMutation.isPending
									? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									: "cursor-not-allowed bg-gray-300 text-gray-500"
							}`}
						>
							{updateParticipantsMutation.isPending
								? "업데이트 중..."
								: `다음 단계 진출자 설정 (${selectedUserIds.length}명)`}
						</button>
					</div>
				</div>

				{/* 현재 참가자 */}
				{activeParticipants.length > 0 && (
					<div className="mb-6">
						<h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-green-800">
							🟢 현재 참가자 ({activeParticipants.length}명)
						</h4>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{activeParticipants.map((participant, index) => {
								const isSelected = selectedUserIds.includes(
									participant.participantInfos!.userId,
								);

								return (
									<div
										key={participant.participantInfos!.participantId}
										className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
											isSelected
												? "border-blue-500 bg-blue-50 shadow-md"
												: "border-green-200 bg-green-50 hover:border-green-300"
										}`}
										onClick={() =>
											handleParticipantToggle(
												participant.participantInfos!.userId,
											)
										}
									>
										<div className="flex items-center justify-between">
											<div className="min-w-0 flex-1">
												<div className="flex items-center gap-2">
													<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
														{index + 1}
													</span>
													<h4 className="truncate text-sm font-medium text-gray-900">
														{participant.participantInfos!.participantName}
													</h4>
												</div>
												<p className="mt-1 text-xs text-gray-500">
													{participant.correctAnswerCount}문제 정답
												</p>
											</div>

											<div className="ml-3 flex-shrink-0">
												<div
													className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
														isSelected
															? "border-blue-500 bg-blue-500"
															: "border-gray-300 bg-white"
													}`}
												>
													{isSelected && (
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
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* 탈락한 참가자 */}
				{eliminatedParticipants.length > 0 && (
					<div>
						<h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-600">
							⚪ 탈락한 참가자 ({eliminatedParticipants.length}명)
						</h4>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{eliminatedParticipants.map((participant, index) => {
								const isSelected = selectedUserIds.includes(
									participant.participantInfos!.userId,
								);

								return (
									<div
										key={participant.participantInfos!.participantId}
										className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
											isSelected
												? "border-blue-500 bg-blue-50 shadow-md"
												: "border-gray-200 bg-gray-50 hover:border-gray-300"
										}`}
										onClick={() =>
											handleParticipantToggle(
												participant.participantInfos!.userId,
											)
										}
									>
										<div className="flex items-center justify-between">
											<div className="min-w-0 flex-1">
												<div className="flex items-center gap-2">
													<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
														{activeParticipants.length + index + 1}
													</span>
													<h4 className="truncate text-sm font-medium text-gray-700">
														{participant.participantInfos!.participantName}
													</h4>
												</div>
												<p className="mt-1 text-xs text-gray-500">
													{participant.correctAnswerCount}문제 정답
												</p>
											</div>

											<div className="ml-3 flex-shrink-0">
												<div
													className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
														isSelected
															? "border-blue-500 bg-blue-500"
															: "border-gray-300 bg-white"
													}`}
												>
													{isSelected && (
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
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>

			{/* 선택된 참가자 요약 */}
			{selectedUserIds.length > 0 && (
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm">
					<h4 className="mb-2 text-sm font-semibold text-blue-800">
						다음 단계 진출자로 선택됨 ({selectedUserIds.length}명)
					</h4>
					<div className="flex flex-wrap gap-2">
						{allParticipants
							.filter((p) => selectedUserIds.includes(p.userId))
							.map((participant) => (
								<span
									key={participant.participantId}
									className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
										participant.isActive
											? "bg-green-100 text-green-700"
											: "bg-gray-100 text-gray-700"
									}`}
								>
									{participant.participantName} (
									{participant.correctAnswerCount}문제)
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleParticipantToggle(participant.userId);
										}}
										className={`ml-1 ${participant.isActive ? "text-green-600 hover:text-green-800" : "text-gray-600 hover:text-gray-800"}`}
									>
										×
									</button>
								</span>
							))}
					</div>
				</div>
			)}
		</div>
	);
};
