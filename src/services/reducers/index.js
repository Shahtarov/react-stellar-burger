import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients";
import ingredientDetailsSlice from "./ingredient-details";
import orderDetailsSlice from "./order-details";
import burgerConstructorSlice from "./burger-constructor";
import authSlice from "./auth";

export const rootReducer = combineReducers({
	ingredientsSlice,
	burgerConstructorSlice,
	ingredientDetailsSlice,
	orderDetailsSlice,
	authSlice
});
