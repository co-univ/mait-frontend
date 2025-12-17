import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

interface WebSocketMessage {
	questionSetId?: number;
	questionId: number;
	statusType?: string;
	commandType?: string;
	activeParticipants?: any[];
}

interface UseSolvingLiveWebSocketProps {
	questionSetId: string | undefined;
	onMessage: (message: WebSocketMessage) => void;
}

export const useSolvingLiveWebSocket = ({
	questionSetId,
	onMessage,
}: UseSolvingLiveWebSocketProps) => {
	const clientRef = useRef<StompJs.Client | null>(null);

	const connect = () => {
		if (!questionSetId || clientRef.current?.connected) return;

		const client = new StompJs.Client({
			webSocketFactory: () => new SockJS(process.env.PUBLIC_WS_ENDPOINT || ""),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: (frame) => {
				console.log("Connected: " + frame);
				client.subscribe(`/topic/question/${questionSetId}`, (message) => {
					if (message.body) {
						console.log("Received message:", message.body);
						const msg = JSON.parse(message.body);
						onMessage(msg);
					}
				});
			},
			onStompError: (error) => {
				console.error("Broker reported error: ", error);
			},
		});

		clientRef.current = client;
		client.activate();
	};

	const disconnect = () => {
		if (clientRef.current?.connected) {
			clientRef.current.deactivate();
		}
	};

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, [questionSetId]);

	return {
		connect,
		disconnect,
		isConnected: clientRef.current?.connected || false,
	};
};
