import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ordersFeedData: null,
	isSocket: false,
	socketUrl: "",
	error: ""
};

const ordersFeedSlice = createSlice({
	name: "ordersFeed",
	initialState,
	reducers: {
		wsOrdersInit: (state, action) => {
			state.socketUrl = action.payload;
		},
		wsOrdersClose: (state) => {
			state.isSocket = false;
			state.ordersFeedData = null;
			state.error = undefined;
		},
		wsOrdersOpen: (state) => {
			state.isSocket = true;
		},
		wsOrdersError: (state, action) => {
			state.error = action.payload;
		},
		clearOrdersError: (state) => {
			state.error = undefined;
		},
		setOrdersData: (state, action) => {
			state.ordersFeedData = {
				...action.payload,
				orders: action.payload?.orders
					?.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
					)
					.map((item) => ({
						...item,
						ingredients: item.ingredients.filter((i) => i)
					}))
			};
			state.error = undefined;
		},
		clearOrdersData: (state) => {
			state.ordersFeedData = null;
		}
	}
});

export const {
	clearOrdersError,
	setOrdersData,
	clearOrdersData,
	wsOrdersInit,
	wsOrdersClose,
	wsOrdersError
} = ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
