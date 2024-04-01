import Ingredient from "../Ingredient/Ingredient";
import styles from "./IngredientsList.module.css";
import { FC } from "react";
import { IIngredient } from "../../../interfaces/IIngredient";

interface IIngredientsListProps {
	data: IIngredient[];
	selectType: string;
	openIngredient: (item: IIngredient) => void;
}

const IngredientsList: FC<IIngredientsListProps> = ({
	data,
	selectType,
	openIngredient
}) => {
	const elements = data?.map((item) => {
		if (selectType === item.type) {
			return (
				<Ingredient
					key={item._id}
					data={item}
					openIngredient={openIngredient}
				/>
			);
		}
	});

	return <ul className={`${styles.itemList} pt-6 pl-4 pr-4`}>{elements}</ul>;
};

export default IngredientsList;
