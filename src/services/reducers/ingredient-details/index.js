import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ingredientDetails: null
};

export const ingredientDetailsSlice = createSlice({
	name: "ingredientDetails",
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.ingredientDetails = action.payload;
		},
		resetIngredientDetails: (state) => {
			state.ingredientDetails = initialState.ingredientDetails;
		}
	}
});

export const { setIngredientDetails, resetIngredientDetails } =
	ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
