import * as StompJs from "@stomp/stompjs";
import { useRef } from "react";
import SockJS from "sockjs-client";
import type { ParticipantStatus } from "../../solving.constants";

//
//
//

export interface WebSocketMessage {
	questionSetId?: number;
	questionId: number;
	statusType?: string;
	commandType?: string;
	activeParticipants?: any[];
	participantStatus?: ParticipantStatus;
	isInitialStatus?: boolean;
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
	const isInitialStatusRef = useRef(true);

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
				Authorization: `${localStorage.getItem("token")}`,
			},
			onConnect: () => {
				// 구독 설정
				client.subscribe(
					`/topic/question-sets/${questionSetId}/participate`,
					(message) => {
						if (message.body) {
							const msg = JSON.parse(message.body);
							onMessage(msg);
						}
					},
				);

				client.subscribe(
					`/user/queue/question-sets/${questionSetId}/participation-status`,
					(message) => {
						if (message.body) {
							const msg = JSON.parse(message.body);

							onMessage({
								...msg,
								isInitialStatus: isInitialStatusRef.current,
							});
							isInitialStatusRef.current = false;
						}
					},
				);

				client.publish({
					destination: `/app/question-sets/${questionSetId}/participation-status`,
				});
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
