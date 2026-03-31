import * as StompJs from "@stomp/stompjs";
import { useRef } from "react";
import SockJS from "sockjs-client";
import type { ParticipantStatus } from "../../solving.constants";

//
//
//

interface WebSocketMessage {
	questionSetId?: number;
	questionId: number;
	statusType?: string;
	commandType?: string;
	activeParticipants?: any[];
	participantStatus?: ParticipantStatus;
}

interface UseSolvingLiveWebSocketProps {
	questionSetId: number | undefined;
	onMessage: (message: WebSocketMessage) => void;
}

//
//
//

export const useSolvingLiveWebSocket = ({
	questionSetId,
	onMessage,
}: UseSolvingLiveWebSocketProps) => {
	const clientRef = useRef<StompJs.Client | null>(null);

	/**
	 *
	 */
	const connect = () => {
		if (!questionSetId || clientRef.current?.connected) return;

		const client = new StompJs.Client({
			webSocketFactory: () => new SockJS(process.env.PUBLIC_WS_ENDPOINT || ""),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			connectHeaders: {
				Authorization: `${localStorage.getItem('token')}`,
			},
			onConnect: (frame) => {
				// 구독 설정
				client.subscribe(
					`/topic/question-sets/${questionSetId}/participate`,
					(message) => {
						if (message.body) {
							console.log("Received message:", message.body);

							const msg = JSON.parse(message.body);
							onMessage(msg);
							console.log('/participate :', msg);
						}
					},
				);

				client.subscribe(
					`/user/queue/question-sets/${questionSetId}/participation-status`,
					(message) => {
						if (message.body) {
							const msg = JSON.parse(message.body);
							onMessage(msg);
							console.log('/participation-status :', msg);
						}
					},
				);

				console.log("Connected: " + frame);
			},
			onStompError: (error) => {
				console.error("Broker reported error: ", error);
			},
		});

		clientRef.current = client;
		client.activate();
	};

	/**
	 *
	 */
	const disconnect = () => {
		if (clientRef.current?.connected) {
			clientRef.current.deactivate();
		}
	};

	return {
		connect,
		disconnect,
		isConnected: clientRef.current?.connected || false,
	};
};
