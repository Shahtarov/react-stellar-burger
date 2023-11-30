import {
	Counter,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./Ingredients.module.css";

const Ingredient = ({ props }) => {
	const [count, setCount] = useState(0);
	return (
		<li className={styles.item} onClick={() => setCount(count + 1)}>
			<div>
				{count >= 1 ? (
					<Counter count={count} size="default" extraClass="m-1" />
				) : null}
			</div>

			<img src={props.image} alt={props.name} />

			<div className={`${styles.price} mt-1 mb-1`}>
				<p className="text text_type_digits-default">{props.price}</p>
				<CurrencyIcon type="secondary" />
			</div>
			<p className={`${styles.itemName} text text_type_main-small`}>
				{props.name}
			</p>
		</li>
	);
};

export default Ingredient;
