import {
	// Counter,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../../utils/propTypes/ingredientPropType";
// import { useState } from "react";
import styles from "./Ingredients.module.css";
import PropTypes from "prop-types";

const Ingredient = ({ data, handleIngredientDetails }) => {
	return (
		<li
			className={styles.item}
			onClick={() => {
				handleIngredientDetails(data);
			}}
		>
			{/* <div>
				{count >= 1 ? (
					<Counter count={count} size="default" extraClass="m-1" />
				) : null}
			</div> */}

			<img src={data.image} alt={data.name} />

			<div className={`${styles.price} mt-1 mb-1`}>
				<p className="text text_type_digits-default">{data.price}</p>
				<CurrencyIcon type="secondary" />
			</div>
			<p className={`${styles.itemName} text text_type_main-small`}>
				{data.name}
			</p>
		</li>
	);
};

Ingredient.propTypes = {
	data: ingredientPropType.isRequired,
	handleIngredientDetails: PropTypes.func.isRequired
};

export default Ingredient;
