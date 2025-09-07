/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "src/apis/solving.api";
import { QuestionStatusType } from "src/enums/solving.enum";
import useUser from "src/hooks/useUser";
import SolvingBell from "src/pages/solving/components/common/SolvingBell";
import type { QuestionSetApiResponse } from "@/types";
import SolvingQuiz from "../../components/common/SolvingQuiz";
import SolvingLiveWaiting from "./SolvingLiveWaiting";
import SolvingLiveNextStage from "src/pages/solving/pages/live/SolvingLiveNextStage";
import SolvingLiveWinner from "src/pages/solving/pages/live/SolvingLiveWinner";
import { useSolvingLiveQuizController } from "../../hooks/live/useSolvingLiveQuizController";
import { useSolvingLiveWebSocket } from "../../hooks/live/useSolvingLiveWebSocket";


const SolvingLiveSolving = () => {
	const [questionSetInfo, setQuestionSetInfo] = useState<QuestionSetApiResponse | null>(null);

	const { user } = useUser();
	const currentUserId = user?.id;

	const location = useLocation();
	const questionSetId = location.pathname.split("/").pop();

	const {
		questionId,
		questionInfo,
		isSubmitAllowed,
		showQualifierView,
		activeParticipants,
		currentQuestionStatus,
		isFailed,
		showWinner,
		userIdRef,
		quizController,
		setCurrentQuestionStatus,
		setShowQualifierView,
	} = useSolvingLiveQuizController(questionSetId);

	const handleWebSocketMessage = (msg: any) => {
		const questionId = msg.questionId;
		const statusType = msg?.statusType;
		const commandType = msg?.commandType;
		const activeParticipants = msg?.activeParticipants;

		quizController(questionId, statusType, commandType, activeParticipants);
	};

	useSolvingLiveWebSocket({
		questionSetId,
		onMessage: handleWebSocketMessage,
	});

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
