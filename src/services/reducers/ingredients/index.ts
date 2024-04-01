import {
	createSlice,
	createAsyncThunk,
	current,
	SerializedError
} from "@reduxjs/toolkit";
import { getIngredients } from "../../api";
import { IIngredient } from "../../../interfaces/IIngredient";

type TInitialState = {
	ingredients: IIngredient[];
	loading?: string;
	error?: string | SerializedError;
};

const initialState: TInitialState = {
	ingredients: [],
	loading: "idle",
	error: ""
};

export const getIngredientsThunk = createAsyncThunk("ingredients", async () => {
	const { data } = (await getIngredients()) || {};
	return data;
});

export const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {
		decrementCountIngredient: (state, action) => {
			state.ingredients = current(state.ingredients).map((item) => {
				if (item._id === action.payload) {
					if (item.count) {
						return { ...item, count: item.count - 1 };
					}
					return { ...item, count: 0 };
				}
				return item;
			});
		},
		incrementCountIngredient: (state, action) => {
			state.ingredients = current(state.ingredients).map((item) => {
				if (item._id === action.payload) {
					if (item.count) {
						return { ...item, count: item.count + 1 };
					}
					return { ...item, count: 1 };
				}
				return item;
			});
		},
		setCountBun: (state, action) => {
			state.ingredients = current(state.ingredients).map((item) => {
				if (item._id === action.payload) {
					return { ...item, count: 2 };
				}
				if (item.type === "bun") {
					return { ...item, count: 0 };
				}
				return item;
			});
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getIngredientsThunk.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(getIngredientsThunk.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error;
			})
			.addCase(getIngredientsThunk.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.ingredients = action.payload.data;
				state.error = initialState.error;
			});
	}
});

export const {
	decrementCountIngredient,
	incrementCountIngredient,
	setCountBun
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
