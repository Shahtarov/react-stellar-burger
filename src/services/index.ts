import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import {
	setOrdersData,
	wsOrdersClose,
	wsOrdersError,
	wsOrdersInit
} from "./reducers/orders-feed";
import { socketMiddleware } from "./middleware/socket-middleware";

const wsActions = {
	wsInit: wsOrdersInit,
	onClose: wsOrdersClose,
	onError: wsOrdersError,
	onMessage: setOrdersData
};

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat([socketMiddleware(wsActions)])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
