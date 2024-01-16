import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
	bun: null,
	main: [],
	sum: 0
};

const burgerConstructorSlice = createSlice({
	name: "ingredient",
	initialState,
	reducers: {
		setBun: (state, action) => {
			state.bun && (state.sum -= state.bun.price * 2);
			state.bun = action.payload;
			state.sum += state.bun.price * 2;
		},
		setMain: (state, action) => {
			state.main = action.payload;
			const sumMain = state.main.reduce(
				(acc, item) => (acc += item.price),
				0
			);
			const sumBun = state.bun ? state.bun.price * 2 : 0;
			state.sum = sumMain + sumBun;
		},
		deleteMain: (state, action) => {
			const removedIngredient = current(state.main).find(
				(item) => item.id === action.payload
			);
			state.sum -= removedIngredient.price;
			state.main = current(state.main).filter(
				(item) => item.id !== action.payload
			);
		},
		setMainDisposition: (state, action) => {
			const { dropIngredient, ingredient } = action.payload;
			const indexIngredient = state.main.findIndex(
				(item) => item.id === ingredient.id
			);
			const indexDropIngredient = state.main.findIndex(
				(item) => item.id === dropIngredient.id
			);
			let mainDisposition = [...state.main];

			if (indexIngredient < indexDropIngredient) {
				mainDisposition.splice(indexDropIngredient, 1);
				mainDisposition.splice(indexIngredient, 0, dropIngredient);
			} else {
				mainDisposition.splice(indexIngredient + 1, 0, dropIngredient);
				mainDisposition.splice(indexDropIngredient, 1);
			}
			state.main = mainDisposition;
		},
		resetBurgerConstructor: () => initialState
	}
});

export const {
	setBun,
	setMain,
	deleteMain,
	resetBurgerConstructor,
	setMainDisposition
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
