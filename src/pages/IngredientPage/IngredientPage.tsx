import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { FC, useEffect } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import styles from "./IngredientPage.module.css";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppDispatch, useAppSelector } from "../..";

export const IngredientPage: FC = () => {
	const dispatch = useAppDispatch();
	const ingredients: Array<IIngredient> = useAppSelector(
		ingredientsSelector.ingredients
	);
	const { id } = useParams();

	useEffect(() => {
		if (id && ingredients.length > 0) {
			const ingredient = ingredients.find(
				(item: IIngredient) => item._id === id
			);
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
