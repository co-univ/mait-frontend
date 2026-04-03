/** biome-ignore-all lint/correctness/useExhaustiveDependencies: live solving manages websocket and tracking effects manually */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SolvingBell from "src/domains/solving/components/common/SolvingBell";
import SolvingLiveNextStage from "src/domains/solving/pages/live/SolvingLiveNextStage";
import SolvingLiveWinner from "src/domains/solving/pages/live/SolvingLiveWinner";
import type { CommandType, QuestionStatusType } from "src/enums/solving.enum";
import useUser from "src/hooks/useUser";
import { apiClient } from "@/libs/api";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import useSolvingLiveQuestionSet from "../../hooks/live/useSolvingLiveQuestionSet";
import { useSolvingLiveQuizController } from "../../hooks/live/useSolvingLiveQuizController";
import {
	useSolvingLiveWebSocket,
	type WebSocketMessage,
} from "../../hooks/live/useSolvingLiveWebSocket";
import {
	PARTICIPANT_STATUS,
	type ParticipantStatus,
} from "../../solving.constants";
import SolvingLiveParticipantElluminationConfirm from "./SolvingLiveParticipantEliminationConfirm";
import SolvingLiveQuestion from "./SolvingLiveQuestion";
import SolvingLiveWaiting from "./SolvingLiveWaiting";

//
//
//

type LiveStage = "waiting" | "question" | "qualifier" | "winner";

//
//
//

interface ActiveParticipant {
	participantId: number;
	userId: number;
	participantName: string;
	userNickname?: string;
}

interface SolvingLiveWebSocketMessage {
	questionId?: number;
	statusType?: QuestionStatusType;
	commandType?: CommandType;
	activeParticipants?: ActiveParticipant[];
	participantStatus?: ParticipantStatus;
}

//
//
//

const SolvingLive = () => {
	const [questionId, setQuestionId] = useState<number | null>(null); // 문제 id
	const [isSubmitAllowed, setIsSubmitAllowed] = useState(false); // 답안 제출 가능 여부
	const [showQualifierView, setShowQualifierView] = useState(false); // QUALIFIER 페이지 표시 여부
	const [activeParticipants, setActiveParticipants] = useState<
		ActiveParticipant[]
	>([]);
	const [isFailed, setIsFailed] = useState(false); // 탈락 여부 (다음 문제부터 풀이 불가)
	const [showWinner, setShowWinner] = useState(false); // 우승자 화면 표시 여부
	const [isElluminationConfirmVisible, setIsElluminationConfirmVisible] =
		useState(false);

	const hasTrackedEnterRef = useRef(false);
	const hasTrackedFirstQuestionViewRef = useRef(false);
	const hasTrackedExitRef = useRef(false);
	const stageViewKeyRef = useRef<string | null>(null);
	const currentStageRef = useRef<LiveStage>("waiting");
	const currentQuestionIdRef = useRef<number | null>(null);
	const isFlowCompletedRef = useRef(false);
	const userIdRef = useRef<number | null>(null);

	const location = useLocation();

	const { user } = useUser();

	const questionSetId = Number(location.pathname.split("/").pop());
	const entrySource =
		(location.state as { entrySource?: string } | null)?.entrySource ??
		"direct";

	const { questionSetTitle, totalQuestionNum } = useSolvingLiveQuestionSet({
		questionSetId,
	});

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
	const handleWebSocketMessage = (msg: WebSocketMessage) => {
		const questionId = msg.questionId; // 문제 id
		const statusType = msg?.statusType; // 문제 풀이 상태
		const commandType = msg?.commandType; // 명령 타입
		const activeParticipants = msg?.activeParticipants; // 활성화된 참가자
		const participantStatus = msg?.participantStatus; // 참여자 상태

		if (participantStatus === PARTICIPANT_STATUS.ELIMINATED) {
			setIsFailed(true);
			if (msg.isInitialStatus) {
				setIsElluminationConfirmVisible(true);
			}
			return;
		}

		if (participantStatus === PARTICIPANT_STATUS.ACTIVE) {
			setIsFailed(false);
		}

		quizController(
			questionId,
			statusType as QuestionStatusType,
			commandType as CommandType,
			activeParticipants,
		);
	};

	const { connect, disconnect } = useSolvingLiveWebSocket({
		questionSetId,
		onMessage: handleWebSocketMessage,
	});

	const currentStage: LiveStage = (() => {
		if (showWinner) {
			return "winner";
		}

		if (showQualifierView) {
			return "qualifier";
		}

		if (questionId !== null) {
			return "question";
		}

		return "waiting";
	})();

	const trackLiveExit = (exitType: "route_change" | "reload_or_close") => {
		if (hasTrackedExitRef.current || isFlowCompletedRef.current) {
			return;
		}

		if (currentStageRef.current === "winner") {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveExit, {
			question_set_id: questionSetId.toString(),
			question_id: currentQuestionIdRef.current?.toString(),
			live_stage: currentStageRef.current,
			exit_type: exitType,
		});
		hasTrackedExitRef.current = true;
	};

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
		currentStageRef.current = currentStage;
		currentQuestionIdRef.current = questionId;

		const stageViewKey = `${currentStage}:${questionId ?? "none"}`;

		if (stageViewKeyRef.current === stageViewKey) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveStageView, {
			question_set_id: questionSetId.toString(),
			question_id: questionId?.toString(),
			live_stage: currentStage,
		});
		stageViewKeyRef.current = stageViewKey;
	}, [currentStage, questionId, questionSetId]);

	//
	useEffect(() => {
		if (hasTrackedEnterRef.current) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveEnter, {
			question_set_id: questionSetId.toString(),
			entry_source: entrySource,
			mode: "live_time",
		});
		hasTrackedEnterRef.current = true;
	}, [entrySource, questionSetId]);

	//
	useEffect(() => {
		fetchCurrentQuestionStatus();
	}, [questionSetId]);

	//
	useEffect(() => {
		if (questionId === null || hasTrackedFirstQuestionViewRef.current) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveFirstQuestionView, {
			question_set_id: questionSetId.toString(),
			question_id: questionId.toString(),
			entry_source: entrySource,
			mode: "live_time",
		});
		hasTrackedFirstQuestionViewRef.current = true;
	}, [entrySource, questionId, questionSetId]);

	//
	useEffect(() => {
		connect(); // WebSocket 연결

		const handlePageHide = () => {
			trackLiveExit("reload_or_close");
		};

		window.addEventListener("pagehide", handlePageHide);

		return () => {
			window.removeEventListener("pagehide", handlePageHide);
			trackLiveExit("route_change");
			disconnect();
		};
	}, [questionSetId]);

	useEffect(() => {
		if (showWinner) {
			isFlowCompletedRef.current = true;
		}
	}, [showWinner]);

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
				onClose={() => setShowWinner(false)}
			/>
			<SolvingBell open={isSubmitAllowed} />
			{!showQualifierView &&
				!showWinner &&
				(questionId !== null ? (
					<SolvingLiveQuestion
						questionSetTitle={questionSetTitle}
						totalQuestionNum={totalQuestionNum}
						questionSetId={questionSetId}
						questionId={questionId}
						liveStage={currentStage}
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
