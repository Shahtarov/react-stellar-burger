import PropTypes from "prop-types";

const ingredientPropType = PropTypes.shape({
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired
});

export default ingredientPropType;
