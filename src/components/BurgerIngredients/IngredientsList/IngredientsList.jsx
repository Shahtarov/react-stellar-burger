import Ingredient from "../Ingredient/Ingredient";
import styles from "./IngredientsList.module.css";
import ingredientsArrPropType from "../../../utils/propTypes/ingredientsArrPropType";

const IngredientsList = ({ data, selectType }) => {
	const elements = data?.map((item) => {
		if (selectType === item.type) {
			return <Ingredient key={item._id} data={item} />;
		}
	});

	return <ul className={`${styles.itemList} pt-6 pl-4 pr-4`}>{elements}</ul>;
};

IngredientsList.propTypes = {
	data: ingredientsArrPropType.isRequired
};

export default IngredientsList;
