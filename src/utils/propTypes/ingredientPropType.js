import PropTypes from "prop-types";

const ingredientPropType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	__v: PropTypes.number
});

export default ingredientPropType;
