import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";

const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = useState("Булки");

	return (
		<div className={styles.container}>
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>
			<div style={{ display: "flex" }}>
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
					<IngredientsList data={data} selectType="bun" />
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Соусы</h2>
					<IngredientsList data={data} selectType="sauce" />
				</section>

				<section>
					<h2 className="text text_type_main-medium mt-10">Ингредиенты</h2>
					<IngredientsList data={data} selectType="main" />
				</section>
			</div>
		</div>
	);
};

export default BurgerIngredients;
