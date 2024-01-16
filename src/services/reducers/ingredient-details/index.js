import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ingredientDetails: {
		_id: null,
		name: null,
		type: null,
		proteins: null,
		fat: null,
		carbohydrates: null,
		calories: null,
		price: null,
		image: null,
		image_mobile: null,
		image_large: null,
		__v: null
	}
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
