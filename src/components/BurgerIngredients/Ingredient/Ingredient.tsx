import { useMemo } from "react";
import {
	Counter,
	CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../../interfaces/IIngredient";
import styles from "./Ingredients.module.css";

interface IIngredientProps {
	data: IIngredient;
	openIngredient: (data: IIngredient) => void;
}

const Ingredient: React.FC<IIngredientProps> = ({ data, openIngredient }) => {
	const id = useMemo(() => uuidv4(), []);

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
			{data.count && data.count >= 1 && (
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

export default Ingredient;
