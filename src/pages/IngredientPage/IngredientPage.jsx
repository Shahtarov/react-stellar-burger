import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import styles from "./IngredientPage.module.css";

export const IngredientPage = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(ingredientsSelector.ingredients);
	const { id } = useParams();

	useEffect(() => {
		if (id && ingredients.length > 0) {
			const ingredient = ingredients.find((item) => item._id === id);
			dispatch(setIngredientDetails(ingredient));
		}
	}, [id, ingredients, dispatch]);

	return (
		<main className={`${styles.main}`}>
			<h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
			<IngredientDetails />
		</main>
	);
};
