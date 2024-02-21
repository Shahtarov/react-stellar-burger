import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";

import { useSelector, useDispatch } from "react-redux";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { useRef, useMemo } from "react";
import { useState } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const BurgerIngredients = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const ingredients = useSelector(ingredientsSelector.ingredients);
	const [current, setCurrent] = useState("bun");

	const openIngredient = (item) => {
		dispatch(setIngredientDetails(item));
		navigate(`ingredients/${item._id}`, {
			state: {
				isOpenModal: true
			}
		});
	};

	const title = {
		bun: "Булки",
		sauce: "Соусы",
		main: "Начинки"
	};

	const setTab = (tab) => {
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	const tabsRef = useRef(null);
	const bunsRef = useRef(null);
	const saucesRef = useRef(null);
	const mainRef = useRef(null);

	const buns = useMemo(
		() => ingredients?.filter((item) => item?.type === "bun") || [],
		[ingredients]
	);
	const main = useMemo(
		() => ingredients?.filter((item) => item?.type === "main") || [],
		[ingredients]
	);
	const sauces = useMemo(
		() => ingredients?.filter((item) => item?.type === "sauce") || [],
		[ingredients]
	);

	const handleScroll = () => {
		const bunsDistance = Math.abs(
			tabsRef.current.getBoundingClientRect().top -
				bunsRef.current.getBoundingClientRect().top
		);
		const saucesDistance = Math.abs(
			tabsRef.current.getBoundingClientRect().top -
				saucesRef.current.getBoundingClientRect().top
		);
		const mainDistance = Math.abs(
			tabsRef.current.getBoundingClientRect().top -
				mainRef.current.getBoundingClientRect().top
		);
		const minDistance = Math.min(bunsDistance, saucesDistance, mainDistance);
		const currentHeader =
			minDistance === bunsDistance
				? "bun"
				: minDistance === saucesDistance
				? "sauce"
				: "main";
		setCurrent((prevState) =>
			currentHeader === prevState.current ? prevState.current : currentHeader
		);
	};

	const renderIngredients = (array) => {
		if (!array.length) return null;
		const getRef = (type) =>
			type === "bun" ? bunsRef : type === "sauce" ? saucesRef : mainRef;
		return (
			<section>
				<h2
					id={array[0].type}
					ref={getRef(array[0].type)}
					className={`text text_type_main-medium mt-10`}
				>
					{title[array[0].type]}
				</h2>

				<IngredientsList
					data={ingredients}
					selectType={array[0].type}
					openIngredient={openIngredient}
				/>
			</section>
		);
	};

	return (
		<div className={styles.container}>
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>

			<div ref={tabsRef} className={styles.tabs}>
				<Tab value="bun" active={current === "bun"} onClick={setTab}>
					Булки
				</Tab>
				<Tab value="sauce" active={current === "sauce"} onClick={setTab}>
					Соусы
				</Tab>
				<Tab value="main" active={current === "main"} onClick={setTab}>
					Начинки
				</Tab>
			</div>

			<div
				className={`${styles.containerItems} custom-scroll`}
				onScroll={handleScroll}
			>
				{renderIngredients(buns)}
				{renderIngredients(sauces)}
				{renderIngredients(main)}
			</div>
		</div>
	);
};

export default BurgerIngredients;
