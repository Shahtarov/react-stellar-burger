import Ingredient from "../Ingredient/Ingredient";
import styles from "./IngredientsList.module.css";

const IngredientsList = ({ data, selectType }) => {
	const elements = data?.map((item) => {
		const { _id, ...itemProps } = item;
		if (selectType === itemProps.type) {
			return <Ingredient key={_id} data={itemProps} />;
		}
	});

	return <ul className={`${styles.itemList} pt-6 pl-4 pr-4`}>{elements}</ul>;
};

export default IngredientsList;
