import * as StompJs from "@stomp/stompjs";
import { useCallback, useRef } from "react";
import SockJS from "sockjs-client";

//
//
//

interface ParticipationStatusMessage {
	participantId: number;
	participantName: string;
	status: string;
	userId: number;
	userNickname: string;
	winner: boolean;
	questionSetId?: number;
}

interface UseControlSolvingWebSocketProps {
	questionSetId: number | undefined;
	onMessage: (message: ParticipationStatusMessage) => void;
}

//
//
//

export const useControlSolvingWebSocket = ({
	questionSetId,
	onMessage,
}: UseControlSolvingWebSocketProps) => {
	const clientRef = useRef<StompJs.Client | null>(null);
	const subscriptionRef = useRef<StompJs.StompSubscription | null>(null);
	const onMessageRef = useRef(onMessage);

	onMessageRef.current = onMessage;

	/**
	 *
	 */
	const connect = useCallback(() => {
		if (!questionSetId || clientRef.current) {
			return;
		}

		const client = new StompJs.Client({
			webSocketFactory: () => new SockJS(process.env.PUBLIC_WS_ENDPOINT || ""),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			connectHeaders: {
				Authorization: `${localStorage.getItem("token")}`,
			},
			onConnect: () => {
				subscriptionRef.current?.unsubscribe();

				subscriptionRef.current = client.subscribe(
					`/topic/question-sets/${questionSetId}/manage`,
					(message) => {
						if (message.body) {
							const msg = JSON.parse(message.body);
							onMessageRef.current(msg);
						}
					},
				);
			},
		});

		clientRef.current = client;
		client.activate();
	}, [questionSetId]);

	/**
	 *
	 */
	const disconnect = useCallback(() => {
		subscriptionRef.current?.unsubscribe();
		subscriptionRef.current = null;

		clientRef.current?.deactivate();
		clientRef.current = null;
	}, []);

	return {
		connect,
		disconnect,
		isConnected: clientRef.current?.connected || false,
	};
};
