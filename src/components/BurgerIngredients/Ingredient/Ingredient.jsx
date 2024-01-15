import {
	Counter,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../../utils/propTypes/ingredientPropType";
import styles from "./Ingredients.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const Ingredient = ({ data, openIngredient }) => {
	const id = uuidv4();
	const [{ opacity }, dragRef] = useDrag({
		type: "ingredient",
		item: { ...data, id: id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1
		})
	});

	return (
		<li
			ref={dragRef}
			style={{ opacity }}
			className={styles.item}
			onClick={() => {
				openIngredient(data);
			}}
		>
			{data.count >= 1 && (
				<Counter count={data.count} size="default" extraClass="m-1" />
			)}

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
	openIngredient: PropTypes.func.isRequired
};

export default Ingredient;
