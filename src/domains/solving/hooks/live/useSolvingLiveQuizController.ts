import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandType, QuestionStatusType } from "src/enums/solving.enum";
import { apiClient } from "src/apis/solving.api";

interface CurrentQuestionStatus {
	questionSetId: number;
	questionId: number;
	questionStatusType: QuestionStatusType;
}

interface ActiveParticipant {
	participantId: number;
	userId: number;
	participantName: string;
}

export const useSolvingLiveQuizController = (questionSetId?: string) => {
	const [questionId, setQuestionId] = useState<number | null>(null);
	const [questionInfo, setQuestionInfo] = useState<unknown>(null);
	const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
	const [showQualifierView, setShowQualifierView] = useState(false);
	const [activeParticipants, setActiveParticipants] = useState<ActiveParticipant[]>([]);
	const [currentQuestionStatus, setCurrentQuestionStatus] = useState<CurrentQuestionStatus | null>(null);
	const [isFailed, setIsFailed] = useState(false);
	const [showWinner, setShowWinner] = useState(false);

	const userIdRef = useRef<number | null>(null);
	const navigate = useNavigate();

	const fetchQuestionInfo = async (questionId: number) => {
		if (!questionSetId) return;
		try {
			const res = await apiClient.getQuestionSetsQuestions(
				Number(questionSetId),
				questionId,
			);
			if (res.data) {
				setQuestionInfo(res.data);
			}
		} catch (err) {
			console.error("Failed to fetch question info", err);
		}
	};

	const quizController = (
		questionId: number,
		statusType?: QuestionStatusType,
		commandType?: CommandType,
		activeParticipants?: ActiveParticipant[],
	) => {
		if (isFailed) {
			if (
				statusType === QuestionStatusType.ACCESS_PERMISSION ||
				statusType === QuestionStatusType.SOLVE_PERMISSION
			) {
				setQuestionId(questionId);
				fetchQuestionInfo(questionId);
				setIsSubmitAllowed(false);
			}
			return;
		}

		if (commandType) {
			switch (commandType) {
				case CommandType.ACTIVE_PARTICIPANTS: {
					const participants = activeParticipants || [];
					setActiveParticipants(participants);
					setShowQualifierView(true);

					const isQualified = participants.some(
						(participant: ActiveParticipant) => participant.userId === userIdRef.current,
					);
					if (!isQualified) {
						console.log("탈락!!!!");
						setIsFailed(true);
					}
					break;
				}
				case CommandType.WINNER: {
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
				case QuestionStatusType.NOT_OPEN:
					break;
				case QuestionStatusType.ACCESS_PERMISSION:
					setShowQualifierView(false);
					setQuestionId(questionId);
					fetchQuestionInfo(questionId);
					setIsSubmitAllowed(false);
					break;
				case QuestionStatusType.SOLVE_PERMISSION:
					setQuestionId(questionId);
					fetchQuestionInfo(questionId);
					setIsSubmitAllowed(true);
					break;
			}
		}
	};

	return {
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
		setQuestionInfo,
		setCurrentQuestionStatus,
		setShowQualifierView,
		fetchQuestionInfo,
	};
};