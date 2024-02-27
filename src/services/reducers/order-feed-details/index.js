import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderFeedDetails } from "../../api";

const initialState = {
	orderFeedDetails: null,
	error: "",
	loading: ""
};

export const getOrderFeedDetailsThunk = createAsyncThunk(
	"orderFeedDetails",
	async (number, { rejectWithValue }) => {
		try {
			const response = await getOrderFeedDetails(number);
			return response.data.orders[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const orderFeedDetailsSlice = createSlice({
	name: "orderFeedDetails",
	initialState,
	reducers: {
		setOrderFeedDetails: (state, action) => {
			state.orderFeedDetails = action.payload?.orders[0];
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
				state.orderFeedDetails = action.payload;
				state.error = initialState.error;
			});
	}
});

export const { setOrderFeedDetails, clearOrderFeedDetailsData } =
	orderFeedDetailsSlice.actions;

export default orderFeedDetailsSlice.reducer;
