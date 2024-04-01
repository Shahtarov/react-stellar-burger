import { RootState } from "../..";

export const ordersFeedSelector = (state: RootState) =>
	state.ordersFeedSlice.ordersFeedData;
