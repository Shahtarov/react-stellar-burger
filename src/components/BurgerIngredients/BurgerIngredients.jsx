import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";
import ingredientsArrPropType from "../../utils/propTypes/ingredientsArrPropType";
import PropTypes from "prop-types";
import Tabs from "./Tabs/Tabs";

const BurgerIngredients = ({ data, handleIngredientDetails }) => {
	return (
		<div className={styles.container}>
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>

			<Tabs />

			<div className={`${styles.containerItems} custom-scroll`}>
				<section>
					<h2 className="text text_type_main-medium mt-10">Булки</h2>
					<IngredientsList
						data={data}
						selectType="bun"
						handleIngredientDetails={handleIngredientDetails}
					/>
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Соусы</h2>
					<IngredientsList
						data={data}
						selectType="sauce"
						handleIngredientDetails={handleIngredientDetails}
					/>
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Ингредиенты</h2>
					<IngredientsList
						data={data}
						selectType="main"
						handleIngredientDetails={handleIngredientDetails}
					/>
				</section>
			</div>
		</div>
	);
};

BurgerIngredients.propTypes = {
	data: ingredientsArrPropType.isRequired,
	handleIngredientDetails: PropTypes.func.isRequired
};

export default BurgerIngredients;
