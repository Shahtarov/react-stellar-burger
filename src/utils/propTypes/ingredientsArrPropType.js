import PropTypes from "prop-types";
import ingredientPropType from "./ingredientPropType";

const ingredientsArrPropType = PropTypes.arrayOf(ingredientPropType);

export default ingredientsArrPropType;
