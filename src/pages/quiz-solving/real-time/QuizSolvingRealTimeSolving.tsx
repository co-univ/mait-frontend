/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import * as StompJs from "@stomp/stompjs";
import { useQuery } from "@tanstack/react-query";
import { number } from "framer-motion";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { apiClient } from "src/apis/solving.api";
import { CommandType, QuestionStatusType } from "src/enums/solving.enum";
import useUser from "src/hooks/useUser";
import SolvingBell from "src/pages/solving/components/SolvingBell";
import Solving from "src/pages/solving/pages";
import SolvingNextStage from "src/pages/solving/pages/SolvingNextStage";
import SolvingWinner from "src/pages/solving/pages/SolvingWinner";
import SolvingQuizContent from "src/pages/solving/pages/solving-quiz-content";
import type { QuestionApiResponse, QuestionSetApiResponse } from "@/types";
import QualifierView from "./QualifierView";
import QuizSolvingRealTimeWaitView from "./QuizSolvingRealTimeWaitView";
import WinnerView from "./WinnerView";

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

const QuizSolvingRealTimeSolving = () => {
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

	const userIdRef = useRef<number | null>(null);

	const { user } = useUser();
	const currentUserId = user?.id;

	const [isFailed, setIsFailed] = useState(false); // 탈락 여부 (다음 문제부터 풀이 불가)
	const [showWinner, setShowWinner] = useState(false); // 우승자 화면 표시 여부
	const [winner, setWinner] = useState<string | null>(null); // 우승자

	const navigate = useNavigate();

	const location = useLocation();

	const questionSetId = location.pathname.split("/").pop();

	const fetchQuestionSetInfo = async () => {
		try {
			const res = await apiClient.getQuestionSet(Number(questionSetId));
			if (res.data) {
				setQuestionSetInfo(res.data);
			}
		} catch (err) {
			console.error("Failed to fetch question set info", err);
		}
	};

	const fetchQuestionInfo = async (questionId: number) => {
		try {
			const res = await apiClient.getQuestionSetsQuestions(
				Number(questionSetId),
				questionId as number,
			);
			if (res.data) {
				setQuestionInfo(res.data);
			}
		} catch (err) {
			console.error("Failed to fetch question info", err);
		}
	};

	const fetchCurrentQuestionStatus = async () => {
		try {
			const res = await apiClient.getQuestionSetStatus(Number(questionSetId));
			const { questionId, questionStatusType } = res.data ?? {};
			setCurrentQuestionStatus({
				questionSetId: res?.data?.questionSetId as number,
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

	const quizController = (
		questionId: number,
		statusType?: QuestionStatusType,
		commandType?: CommandType,
		activeParticipants?: any,
	) => {
		// 탈락자는 어떤 경우에도 상호작용 불가 유지
		if (isFailed) {
			if (
				statusType === QuestionStatusType.ACCESS_PERMISSION ||
				statusType === QuestionStatusType.SOLVE_PERMISSION
			) {
				setQuestionId(questionId);
				fetchQuestionInfo(questionId);
				setIsSubmitAllowed(false); // 강제 비활성
			}
			return;
		}

		if (commandType) {
			switch (commandType) {
				case CommandType.ACTIVE_PARTICIPANTS: {
					// 다음 단계 진출자 목록 출력
					const participants = activeParticipants || [];
					setActiveParticipants(participants);
					setShowQualifierView(true);

					// activeParticipants 배열에 현재 유저가 있는지 확인
					const isQualified = participants.some(
						(participant: any) => participant.userId === userIdRef.current,
					);
					if (!isQualified) {
						// 탈락자는 다음 문제부터 풀이 불가능
						console.log("탈락!!!!");
						setIsFailed(true);
					}
					break;
				}
				case CommandType.WINNER: {
					// 우승자 출력
					const winnerParticipants = activeParticipants || [];
					setActiveParticipants(winnerParticipants);
					setShowWinner(true);
					break;
				}
				case CommandType.LIVE_END: {
					navigate("/quiz-solving");
					setShowWinner(false);
					setIsFailed(false);
					break;
				}
			}
			return;
		}

		if (statusType) {
			switch (statusType) {
				case QuestionStatusType.NOT_OPEN: // 문제 풀이가 시작되지 않은 상태
					// 대기 화면 노출
					break;
				case QuestionStatusType.ACCESS_PERMISSION: // 문제 접근 허용
					// 문제 화면 노출
					setShowQualifierView(false); // 진출자 화면 제거
					setQuestionId(questionId as number); // 문제 id가 설정되며 문제 화면 노출되도록
					fetchQuestionInfo(questionId as number); // 문제 정보 가져오기
					setIsSubmitAllowed(false); // 제출 비허용
					break;
				case QuestionStatusType.SOLVE_PERMISSION: // 답안 제출 허용
					setQuestionId(questionId as number); // 문제 id가 설정되며 문제 화면 노출되도록
					fetchQuestionInfo(questionId as number); // 문제 정보 가져오기
					// 답안 제출 가능 여부 가능하도록 변경
					setIsSubmitAllowed(true);
					break;
			}
		}
	};

	const handleWebSocketMessage = (msg: any) => {
		// const questionSetId = msg.questionSetId; // 문제 셋 id
		const questionId = msg.questionId; // 문제 id
		const statusType = msg?.statusType; // 문제 풀이 상태
		const commandType = msg?.commandType; // 명령 타입
		const activeParticipants = msg?.activeParticipants; // 활동 참가자

		quizController(questionId, statusType, commandType, activeParticipants);
	};

	useEffect(() => {
		if (user?.id) {
			userIdRef.current = user.id;
		}
	}, [user]);

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
			onConnect: (frame) => {
				console.log("Connected: " + frame);
				// 구독 설정
				client.subscribe(`/topic/question/${questionSetId}`, (message) => {
					if (message.body) {
						console.log("Received message:", message.body);

						const msg = JSON.parse(message.body);
						handleWebSocketMessage(msg);
					}
				});
			},
			onStompError: (error) => {
				console.error("Broker reported error: ", error);
			},
		});

		client.activate();
	}, [questionSetId]);

	return (
		<>
			<SolvingNextStage
				activeParticipants={activeParticipants}
				open={showQualifierView}
			/>
			<SolvingWinner
				open={showWinner}
				activeParticipants={activeParticipants}
				currentUserId={currentUserId ?? 0}
			/>
			<SolvingBell open={isSubmitAllowed} />
			{!showQualifierView &&
				!showWinner &&
				(questionId !== null ? (
					<Solving
						questionInfo={questionInfo}
						quizTitle={questionSetInfo?.title as string}
						questionCount={questionSetInfo?.questionCount as number}
						questionSetId={Number(questionSetId)}
						isSubmitAllowed={isSubmitAllowed && !isFailed}
						isFailed={isFailed}
					/>
				) : (
					<QuizSolvingRealTimeWaitView />
				))}
		</>
	);
};

export default QuizSolvingRealTimeSolving;
