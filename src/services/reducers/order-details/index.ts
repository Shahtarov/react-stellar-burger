import {
	createSlice,
	createAsyncThunk,
	SerializedError
} from "@reduxjs/toolkit";
import { sendOrderIngredients } from "../../api";
import { IOrderDetails } from "../../../interfaces/IOrderDetails";

type TInitialState = {
	orderDetails: IOrderDetails | null;
	loading?: string;
	error?: string | SerializedError;
};

const initialState: TInitialState = {
	orderDetails: {
		name: "",
		order: {
			number: 0
		},
		success: false
	},
	loading: "idle",
	error: ""
};

export const sendOrderDetailsThunk = createAsyncThunk(
	"orderDetails",
	async (ingredientIds: string[]) => {
		const { data } = await sendOrderIngredients(ingredientIds);
		return data;
	}
);

export const orderDetailsSlice = createSlice({
	name: "orderDetails",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(sendOrderDetailsThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(sendOrderDetailsThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.orderDetails = null;
				state.error = action.error;
			})
			.addCase(sendOrderDetailsThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.orderDetails = action.payload;
				state.error = initialState.error;
			});
	}
});

export default orderDetailsSlice.reducer;
