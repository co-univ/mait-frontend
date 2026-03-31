/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SolvingBell from "src/domains/solving/components/common/SolvingBell";
import SolvingLiveNextStage from "src/domains/solving/pages/live/SolvingLiveNextStage";
import SolvingLiveWinner from "src/domains/solving/pages/live/SolvingLiveWinner";
import type { QuestionStatusType } from "src/enums/solving.enum";
import useUser from "src/hooks/useUser";
import { apiClient } from "@/libs/api";
import { useSolvingLiveQuizController } from "../../hooks/live/useSolvingLiveQuizController";
import { useSolvingLiveWebSocket } from "../../hooks/live/useSolvingLiveWebSocket";
import { PARTICIPANT_STATUS } from "../../solving.constants";
import SolvingLiveParticipantElluminationConfirm from "./SolvingLiveParticipantElluminationConfirm";
import SolvingLiveQuestion from "./SolvingLiveQuestion";
import SolvingLiveWaiting from "./SolvingLiveWaiting";

//
//
//

interface CurrentQuestionStatus {
	questionSetId: number;
	questionId: number;
	questionStatusType: QuestionStatusType;
}

//
//
//

const SolvingLive = () => {
	const [questionId, setQuestionId] = useState<number | null>(null); // 문제 id
	const [isSubmitAllowed, setIsSubmitAllowed] = useState(false); // 답안 제출 가능 여부
	const [showQualifierView, setShowQualifierView] = useState(false); // QUALIFIER 페이지 표시 여부
	const [activeParticipants, setActiveParticipants] = useState<
		Array<{
			participantId: number;
			userId: number;
			participantName: string;
		}>
	>([]);
	const [currentQuestionStatus, setCurrentQuestionStatus] =
		useState<CurrentQuestionStatus | null>(null); // 현재 문제 상태
	const [isFailed, setIsFailed] = useState(false); // 탈락 여부 (다음 문제부터 풀이 불가)
	const [showWinner, setShowWinner] = useState(false); // 우승자 화면 표시 여부
	const [isElluminationConfirmVisible, setIsElluminationConfirmVisible] =
		useState(false);

	const userIdRef = useRef<number | null>(null);

	const location = useLocation();

	const { user } = useUser();

	const currentUserId = user?.id;
	const questionSetId = Number(location.pathname.split("/").pop());

	const { quizController } = useSolvingLiveQuizController({
		setQuestionId,
		setIsSubmitAllowed,
		setShowQualifierView,
		setActiveParticipants,
		isFailed,
		setIsFailed,
		setShowWinner,
		// SolvingLiveQuestion이 자체적으로 데이터를 fetch하므로 빈 함수 전달
		onQuestionInfo: () => {},
		userIdRef,
	});

	/**
	 * 현재 문제 상태 가져와서 처리
	 */
	const fetchCurrentQuestionStatus = async () => {
		try {
			const res = await apiClient.GET(
				"/api/v1/question-sets/{questionSetId}/live-status/current-question",
				{
					params: {
						path: {
							questionSetId,
						},
					},
				},
			);
			const { questionId, questionStatusType } = res.data?.data ?? {};
			setCurrentQuestionStatus({
				questionSetId: res?.data?.data?.questionSetId as number,
				questionId: questionId as number,
				questionStatusType: questionStatusType as QuestionStatusType,
			});

			if (questionId && questionStatusType) {
				quizController(questionId, questionStatusType as QuestionStatusType);
			}
		} catch (err) {
			console.log("Failed to fetch current question status", err);
		}
	};

	/**
	 * 수신된 웹소켓 메시지 핸들러 (quizController 호출부)
	 */
	const handleWebSocketMessage = (msg: any) => {
		const questionId = msg.questionId; // 문제 id
		const statusType = msg?.statusType; // 문제 풀이 상태
		const commandType = msg?.commandType; // 명령 타입
		const activeParticipants = msg?.activeParticipants; // 활성화된 참가자
		const participantStatus = msg?.participantStatus; // 참여자 상태

		if (participantStatus === PARTICIPANT_STATUS.ELIMINATED) {
			console.log("eliminated!");
			setIsElluminationConfirmVisible(true);
			setIsFailed(true);
			return;
		}

		quizController(questionId, statusType, commandType, activeParticipants);
	};

	const { connect, disconnect } = useSolvingLiveWebSocket({
		questionSetId,
		onMessage: handleWebSocketMessage,
	});

	//
	useEffect(() => {
		if (user?.id) {
			userIdRef.current = user.id;
		}
	}, [user]);

	//
	useEffect(() => {
		setShowQualifierView(false);
	}, [questionId]);

	//
	useEffect(() => {
		fetchCurrentQuestionStatus();
	}, [questionSetId]);

	//
	useEffect(() => {
		connect(); // WebSocket 연결

		return () => {
			disconnect();
		};
	}, [questionSetId]);

	return (
		<>
			<SolvingLiveNextStage
				activeParticipants={activeParticipants}
				open={showQualifierView}
				onClose={() => setShowQualifierView(false)}
			/>
			<SolvingLiveWinner
				open={showWinner}
				activeParticipants={activeParticipants}
				currentUserId={currentUserId ?? 0}
				onClose={() => setShowWinner(false)}
			/>
			<SolvingBell open={isSubmitAllowed} />
			{!showQualifierView &&
				!showWinner &&
				(questionId !== null ? (
					<SolvingLiveQuestion
						questionSetId={questionSetId}
						questionId={questionId}
						isSubmitAllowed={isSubmitAllowed && !isFailed}
						isFailed={isFailed}
					/>
				) : (
					<SolvingLiveWaiting />
				))}
			<SolvingLiveParticipantElluminationConfirm
				isOpen={isElluminationConfirmVisible}
				onClose={() => setIsElluminationConfirmVisible(false)}
			/>
		</>
	);
};

export default SolvingLive;
