import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";

interface IWebSocketActions {
	wsInit: ActionCreatorWithPayload<any, string>;
	onClose: ActionCreatorWithPayload<any, string>;
	onError: ActionCreatorWithPayload<any, string>;
	onMessage: ActionCreatorWithPayload<any, string>;
}

export const socketMiddleware = (wsActions: IWebSocketActions): Middleware => {
	return (store) => {
		let socket: WebSocket | null = null;

		return (next) => (action) => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { wsInit, onClose, onError, onMessage } = wsActions;

			if (type === wsInit.type) {
				socket = new WebSocket(payload);
			}

			if (socket) {
				if (type === onClose.type) {
					socket.close();
				}

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					dispatch({ type: onMessage.type, payload: parsedData });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError.type, payload: event });
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose.type, payload: event });
				};
			}

			next(action);
		};
	};
};
