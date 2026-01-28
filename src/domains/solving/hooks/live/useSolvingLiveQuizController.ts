import type React from "react";
import { useNavigate } from "react-router-dom";
import { CommandType, QuestionStatusType } from "src/enums/solving.enum";
import { SOLVING_ROUTE_PATH } from "@/domains/solving/solving.routes";

//
//
//

interface UseSolvingLiveQuizControllerProps {
	setQuestionId: (id: number) => void;
	setIsSubmitAllowed: (allowed: boolean) => void;
	setShowQualifierView: (show: boolean) => void;
	setActiveParticipants: (participants: ActiveParticipant[]) => void;
	isFailed: boolean;
	setIsFailed: (failed: boolean) => void;
	setShowWinner: (show: boolean) => void;
	onQuestionInfo: (questionId: number) => void;
	userIdRef: React.RefObject<number | null>;
}

interface ActiveParticipant {
	participantId: number;
	userId: number;
	participantName: string;
}

//
//
//

export const useSolvingLiveQuizController = ({
	setQuestionId,
	setIsSubmitAllowed,
	setShowQualifierView,
	setActiveParticipants,
	isFailed,
	setIsFailed,
	setShowWinner,
	onQuestionInfo,
	userIdRef,
}: UseSolvingLiveQuizControllerProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const quizController = (
		questionId: number,
		statusType?: QuestionStatusType,
		commandType?: CommandType,
		activeParticipants?: ActiveParticipant[],
	) => {
		// 탈락자는 어떤 경우에도 상호작용 불가 유지
		if (isFailed) {
			if (
				statusType === QuestionStatusType.ACCESS_PERMISSION ||
				statusType === QuestionStatusType.SOLVE_PERMISSION
			) {
				setQuestionId(questionId);
				onQuestionInfo(questionId);
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
						(participant: ActiveParticipant) =>
							participant.userId === userIdRef.current,
					);
					if (!isQualified) {
						// 탈락자는 다음 문제부터 풀이 불가능
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
					navigate(SOLVING_ROUTE_PATH.ROOT);
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
					setQuestionId(questionId); // 문제 id가 설정되며 문제 화면 노출되도록
					onQuestionInfo(questionId); // 문제 정보 가져오기
					setIsSubmitAllowed(false); // 제출 비허용
					break;
				case QuestionStatusType.SOLVE_PERMISSION: // 답안 제출 허용
					setQuestionId(questionId); // 문제 id가 설정되며 문제 화면 노출되도록
					onQuestionInfo(questionId); // 문제 정보 가져오기
					// 답안 제출 가능 여부 가능하도록 변경
					setIsSubmitAllowed(true);
					break;
			}
		}
	};

	return {
		quizController,
	};
};
