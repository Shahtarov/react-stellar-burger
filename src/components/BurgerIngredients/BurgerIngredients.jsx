import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";
import ingredientsArrPropType from "../../utils/propTypes/ingredientsArrPropType";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = useState("Булки");
	const [active, setActive] = useState(false);
	const currentIngredient = useRef(null);

	const openIngredient = (item) => {
		currentIngredient.current = item;
		setActive(true);
	};
	return (
		<div className={styles.container}>
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>
			<div className={styles.tabs}>
				<Tab
					value="Булки"
					active={current === "Булки"}
					onClick={() => {
						setCurrent("Булки");
					}}
				>
					Булки
				</Tab>
				<Tab
					value="Соусы"
					active={current === "Соусы"}
					onClick={() => {
						setCurrent("Соусы");
					}}
				>
					Соусы
				</Tab>
				<Tab
					value="Ингредиенты"
					active={current === "Ингредиенты"}
					onClick={() => {
						setCurrent("Ингредиенты");
					}}
				>
					Ингредиенты
				</Tab>
			</div>

			<div className={`${styles.containerItems} custom-scroll`}>
				<section>
					<h2 className="text text_type_main-medium mt-10">Булки</h2>
					<IngredientsList
						data={data}
						selectType="bun"
						openIngredient={openIngredient}
					/>
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Соусы</h2>
					<IngredientsList
						data={data}
						selectType="sauce"
						openIngredient={openIngredient}
					/>
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Ингредиенты</h2>
					<IngredientsList
						data={data}
						selectType="main"
						openIngredient={openIngredient}
					/>
				</section>
			</div>
			<Modal
				active={active}
				setActive={setActive}
				title="Детали ингредиента"
			>
				<IngredientDetails data={currentIngredient.current} />
			</Modal>
		</div>
	);
};

BurgerIngredients.propTypes = {
	data: ingredientsArrPropType.isRequired
};

export default BurgerIngredients;
