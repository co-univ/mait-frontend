import * as StompJs from "@stomp/stompjs";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";

//
//
//

const QuizSolvingRealTimeSolving = () => {
	// 대기 뷰 노출과 동시에 stomp 연결 및 구독 설정
	// 연결되고 문제
	const location = useLocation();

	const questionSetId = location.pathname.split("/").pop();

	//
	useEffect(() => {
		const client = new StompJs.Client({
			webSocketFactory: () =>
				new SockJS(process.env.RSBUILD_WS_ENDPOINT || ""),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: (frame) => {
				console.log("Connected: " + frame);
				// 구독 설정
				client.subscribe(`/topic/question/${questionSetId}`, (message) => {
					if (message.body) {
						console.log("Received message:", message.body);
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
