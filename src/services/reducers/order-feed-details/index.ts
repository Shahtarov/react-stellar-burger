import {
	createAsyncThunk,
	createSlice,
	SerializedError
} from "@reduxjs/toolkit";
import { getOrderFeedDetails } from "../../api";
import { TOrderFeed } from "../../../interfaces/IOrderFeed";

interface IInitialState {
	orderFeedDetails: TOrderFeed | null;
	error?: string | SerializedError;
	loading?: string;
}

const initialState: IInitialState = {
	orderFeedDetails: null,
	error: "",
	loading: ""
};

export const getOrderFeedDetailsThunk = createAsyncThunk(
	"orderFeedDetails",
	async (number: string) => {
		const { data } = await getOrderFeedDetails(number);
		console.log(data);
		return data;
	}
);

const orderFeedDetailsSlice = createSlice({
	name: "orderFeedDetails",
	initialState,
	reducers: {
		setOrderFeedDetails: (state, action) => {
			state.orderFeedDetails = action.payload?.data?.orders[0];
		},
		clearOrderFeedDetailsData: (state) => {
			state.orderFeedDetails = null;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getOrderFeedDetailsThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(getOrderFeedDetailsThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.payload || "Error occurred";
			})
			.addCase(getOrderFeedDetailsThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.orderFeedDetails = action.payload.orders[0];
				state.error = initialState.error;
			});
	}
});

export const { setOrderFeedDetails, clearOrderFeedDetailsData } =
	orderFeedDetailsSlice.actions;

export default orderFeedDetailsSlice.reducer;
