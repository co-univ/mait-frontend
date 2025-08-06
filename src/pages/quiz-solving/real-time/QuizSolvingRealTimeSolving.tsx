import * as StompJs from "@stomp/stompjs";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { apiClient } from "src/apis/solving.api";
import { QuestionStatusType } from "src/enums/solving.enum";
import type { QuestionSetApiResponse } from "@/types";

//
//
//

const QuizSolvingRealTimeSolving = () => {
	const [questionSetInfo, setQuestionSetInfo] =
		useState<QuestionSetApiResponse | null>(null); // 문제 셋 정보
	const [questionInfo, setQuestionInfo] = useState(null); // 문제 정보
	const [isSubmitAllowed, setIsSubmitAllowed] = useState(false); // 답안 제출 가능 여부

	const location = useLocation();

	const questionSetId = location.pathname.split("/").pop();

	const fetchQuestionSetInfo = async () => {
		try {
			const res = await apiClient.getQuestionSet(Number(questionSetId));
			if (res.data) {
				setQuestionSetInfo(res.data);
				console.log(res.data);
			}
		} catch (err) {
			console.error("Failed to fetch question set info", err);
		}
	};

	const handleWebSocketMessage = (msg: any) => {
		const questionSetId = msg.questionSetId; // 문제 셋 id
		const questionId = msg.questionId; // 문제 id
		const statusType = msg.statusType; // 문제 풀이 상태

		switch (statusType) {
			case QuestionStatusType.NOT_OPEN: // 문제 풀이가 시작되지 않은 상태
				// 대기 화면 노출
				break;
			case QuestionStatusType.ACCESS_PERMISSION: // 문제 접근 허용
				// 문제 화면 노출

				break;
			case QuestionStatusType.SOLVE_PERMISSION: // 답안 제출 허용
				// 답안 제출 가능 여부 가능하도록 변경

				break;
			case QuestionStatusType.QUALIFIER:
				// 다음 단계 진출자 출력

				break;
			case QuestionStatusType.WINNER:
				// 우승자 출력

				break;
		}
	};

	//
	useEffect(() => {
		// 문제 셋 정보 가져오기
		fetchQuestionSetInfo();
	}, [questionSetId]);

	//
	useEffect(() => {
		// WebSocket 연결
		const client = new StompJs.Client({
			webSocketFactory: () => new SockJS(process.env.RSBUILD_WS_ENDPOINT || ""),
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
		<div>
			<div>
				<h1 className="text-alpha-black100 typo-heading-xlarge">
					실시간 문제 풀이 페이지
				</h1>
			</div>
		</div>
	);
};

export default QuizSolvingRealTimeSolving;
