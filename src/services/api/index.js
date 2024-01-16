import { URL } from "../../utils/constants";
import axios from "axios";

export const getIngredients = async () => {
	return await axios.get(`${URL}/ingredients`);
};

export const sendOrderIngredients = (ingredientsIds) =>
	axios.post(`${URL}/orders`, {
		ingredients: ingredientsIds
	});
