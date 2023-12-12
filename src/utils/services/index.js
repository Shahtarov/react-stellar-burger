import { URL } from "../constants";

export const getIngredients = async () => {
	return await fetch(`${URL}/ingredients`, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
