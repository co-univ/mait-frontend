import { Link, useParams } from "react-router-dom";
import { ParticipantsList } from "../components";
import { ParticipantsLayout } from "../layouts";

const Participants = () => {
	const { questionSetId } = useParams<{ questionSetId: string }>();
	const selectedQuestionSetId = Number(questionSetId);

	if (!selectedQuestionSetId || isNaN(selectedQuestionSetId)) {
		return (
			<ParticipantsLayout title="참가자 관리" subtitle="잘못된 퀴즈셋 ID입니다">
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
					<p className="text-sm text-red-700">
						올바른 퀴즈셋 ID를 URL 경로에 제공해주세요.
						<br />
						예: /control/123/participants
					</p>
					<Link
						to="/control"
						className="mt-3 inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					>
						← 퀴즈 제어로 돌아가기
					</Link>
				</div>
			</ParticipantsLayout>
		);
	}

	return (
		<ParticipantsLayout
			title="참가자 관리"
			subtitle={`퀴즈셋 #${selectedQuestionSetId} 참가자 관리`}
		>
			{/* 네비게이션 */}
			<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<div className="flex items-center gap-4">
					<Link
						to={`/control?questionSetId=${selectedQuestionSetId}`}
						className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					>
						← 퀴즈 제어로 돌아가기
					</Link>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<span>현재:</span>
						<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
							퀴즈셋 #{selectedQuestionSetId}
						</span>
					</div>
				</div>
			</div>

			{/* 참가자 관리 안내 */}
			<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
				<div className="flex items-start">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5 text-yellow-400"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-sm font-medium text-yellow-800">
							참가자 관리 안내
						</h3>
						<div className="mt-2 text-sm text-yellow-700">
							<ul className="list-inside list-disc space-y-1">
								<li>
									참가자를 선택하여 다음 단계 진출자로 설정할 수 있습니다.
								</li>
								<li>선택된 참가자만 다음 문제에 정답을 제출할 수 있습니다.</li>
								<li>전체 선택/해제 버튼으로 한 번에 관리할 수 있습니다.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* 참가자 목록 및 관리 */}
			<ParticipantsList questionSetId={selectedQuestionSetId} />
		</ParticipantsLayout>
	);
};

export default Participants;
