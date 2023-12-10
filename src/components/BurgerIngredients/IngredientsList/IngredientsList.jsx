import Ingredient from "../Ingredient/Ingredient";
import styles from "./IngredientsList.module.css";
import ingredientsArrPropType from "../../../utils/propTypes/ingredientsArrPropType";
import PropTypes from "prop-types";

const IngredientsList = ({ data, selectType, handleIngredientDetails }) => {
	const elements = data?.map((item) => {
		if (selectType === item.type) {
			return (
				<Ingredient
					key={item._id}
					data={item}
					handleIngredientDetails={handleIngredientDetails}
				/>
			);
		}
	});

	return <ul className={`${styles.itemList} pt-6 pl-4 pr-4`}>{elements}</ul>;
};

IngredientsList.propTypes = {
	data: ingredientsArrPropType.isRequired,
	selectType: PropTypes.string.isRequired,
	handleIngredientDetails: PropTypes.func.isRequired
};

export default IngredientsList;
