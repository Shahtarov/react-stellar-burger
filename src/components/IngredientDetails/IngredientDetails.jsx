import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import * as ingredientDetailsSelector from "../../services/reducers/ingredient-details/selectors";

const IngredientDetails = () => {
	const data = useSelector(ingredientDetailsSelector.ingredientDetails);

	if (!data) return null;
	return (
		<div className={styles.container}>
			<img className={styles.image} src={data.image_large} alt={data.name} />
			<h3 className={`text text_type_main-medium mt-4`}>{data.name}</h3>

			<ul className={`${styles.details}`}>
				<li className={`${styles.li}`}>
					<p className={`text text_type_main-default text_color_inactive`}>
						Калории,ккал
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{data.calories}
					</p>
				</li>
				<li className={`${styles.li}`}>
					<p className={`text text_type_main-default text_color_inactive`}>
						Белки, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{data.proteins}
					</p>
				</li>
				<li className={`${styles.li}`}>
					<p className={`text text_type_main-default text_color_inactive`}>
						Жиры, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{data.fat}
					</p>
				</li>
				<li className={`${styles.li}`}>
					<p className={`text text_type_main-default text_color_inactive`}>
						Углеводы, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{data.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;
