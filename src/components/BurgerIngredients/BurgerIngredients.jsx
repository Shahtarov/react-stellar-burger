import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";

const BurgerIngredients = ({ props }) => {
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
						window.location.href = "#buns";
					}}
				>
					Булки
				</Tab>
				<Tab
					value="Соусы"
					active={current === "Соусы"}
					onClick={() => {
						setCurrent("Соусы");
						window.location.href = "#sauces";
					}}
				>
					Соусы
				</Tab>
				<Tab
					value="Ингредиенты"
					active={current === "Ингредиенты"}
					onClick={() => {
						setCurrent("Ингредиенты");
						window.location.href = "#ingredients";
					}}
				>
					Ингредиенты
				</Tab>
			</div>

			<div className={`${styles.containerItems} custom-scroll`}>
				<section id="buns">
					<h2 className="text text_type_main-medium mt-10">Булки</h2>
					<IngredientsList props={props} selectType="bun" />
				</section>

				<section id="sauces">
					<h2 className="text text_type_main-medium mt-10">Соусы</h2>
					<IngredientsList props={props} selectType="sauce" />
				</section>

				<section id="ingredients">
					<h2 className="text text_type_main-medium mt-10">Ингредиенты</h2>
					<IngredientsList props={props} selectType="main" />
				</section>
			</div>
		</div>
	);
};

export default BurgerIngredients;
