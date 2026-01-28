/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import SolvingBell from "src/domains/solving/components/common/SolvingBell";
import SolvingLiveNextStage from "src/domains/solving/pages/live/SolvingLiveNextStage";
import SolvingLiveWinner from "src/domains/solving/pages/live/SolvingLiveWinner";
import type { QuestionStatusType } from "src/enums/solving.enum";
import useUser from "src/hooks/useUser";
import { TOKEN } from "@/app.constants";
import { apiClient } from "@/libs/api";
import type { QuestionSetApiResponse } from "@/libs/types";
import SolvingQuiz from "../../components/common/SolvingQuiz";
import { useSolvingLiveQuizController } from "../../hooks/live/useSolvingLiveQuizController";
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

const SolvingLiveSolving = () => {
	const [questionSetInfo, setQuestionSetInfo] =
		useState<QuestionSetApiResponse | null>(null); // 문제 셋 정보
	const [questionId, setQuestionId] = useState<number | null>(null); // 문제 id
	const [questionInfo, setQuestionInfo] = useState<any>(null); // 문제 정보
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

	const userIdRef = useRef<number | null>(null);

	const location = useLocation();

	const { user } = useUser();

	const currentUserId = user?.id;
	const questionSetId = Number(location.pathname.split("/").pop());

	/**
	 *
	 */
	const fetchQuestionSetInfo = async () => {
		try {
			const res = await apiClient.GET("/api/v1/question-sets/{questionSetId}", {
				params: {
					path: {
						questionSetId,
					},
				},
			});
			if (res.data?.isSuccess && res.data?.data) {
				setQuestionSetInfo(res.data.data);
			}
		} catch (err) {
			console.error("Failed to fetch question set info", err);
		}
	};

	/**
	 *
	 */
	const fetchQuestionInfo = async (questionId: number) => {
		try {
			const res = await apiClient.GET(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
				{
					params: {
						path: {
							questionSetId,
							questionId,
						},
					},
				},
			);
			if (res.data?.data) {
				setQuestionInfo(res.data.data);
			}
		} catch (err) {
			console.error("Failed to fetch question info", err);
		}
	};

	const { quizController } = useSolvingLiveQuizController({
		setQuestionId,
		setIsSubmitAllowed,
		setShowQualifierView,
		setActiveParticipants,
		isFailed,
		setIsFailed,
		setShowWinner,
		onQuestionInfo: fetchQuestionInfo,
		userIdRef,
	});

	/**
	 *
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
	 *
	 */
	const handleWebSocketMessage = (msg: any) => {
		// const questionSetId = msg.questionSetId; // 문제 셋 id
		const questionId = msg.questionId; // 문제 id
		const statusType = msg?.statusType; // 문제 풀이 상태
		const commandType = msg?.commandType; // 명령 타입
		const activeParticipants = msg?.activeParticipants; // 활동 참가자

		quizController(questionId, statusType, commandType, activeParticipants);
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
		// 문제 셋 정보 가져오기
		fetchQuestionSetInfo();
		// 현재 문제 상태 가져와서 처리
		fetchCurrentQuestionStatus();
	}, [questionSetId]);

	//
	useEffect(() => {
		// WebSocket 연결
		const client = new StompJs.Client({
			webSocketFactory: () => new SockJS(process.env.PUBLIC_WS_ENDPOINT || ""),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			connectHeaders: {
				Authorization: `Bearer ${TOKEN}}`,
			},
			onConnect: (frame) => {
				// 구독 설정
				client.subscribe(
					`/topic/question-sets/${questionSetId}/participate`,
					(message) => {
						if (message.body) {
							console.log("Received message:", message.body);

							const msg = JSON.parse(message.body);
							handleWebSocketMessage(msg);
						}
					},
				);
				console.log("Connected: " + frame);
			},
			onStompError: (error) => {
				console.error("Broker reported error: ", error);
			},
		});

		client.activate();
	}, [questionSetId]);

	return (
		<>
			<SolvingLiveNextStage
				activeParticipants={activeParticipants}
				open={showQualifierView}
			/>
			<SolvingLiveWinner
				open={showWinner}
				activeParticipants={activeParticipants}
				currentUserId={currentUserId ?? 0}
			/>
			<SolvingBell open={isSubmitAllowed} />
			{!showQualifierView &&
				!showWinner &&
				(questionId !== null ? (
					<SolvingQuiz
						questionInfo={questionInfo}
						quizTitle={questionSetInfo?.title as string}
						questionCount={questionSetInfo?.questionCount as number}
						questionSetId={Number(questionSetId)}
						isSubmitAllowed={isSubmitAllowed && !isFailed}
						isFailed={isFailed}
					/>
				) : (
					<SolvingLiveWaiting />
				))}
		</>
	);
};

export default SolvingLiveSolving;
