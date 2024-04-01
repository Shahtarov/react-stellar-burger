import styles from "./BurgerIngredients.module.css";
import IngredientsList from "./IngredientsList/IngredientsList";

import { useSelector, useDispatch } from "react-redux";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { useRef, useMemo, FC, MutableRefObject } from "react";
import { useState } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../services";
import { IIngredient } from "../../interfaces/IIngredient";

interface ITitle {
	[name: string]: string;
}

const title: ITitle = {
	bun: "Булки",
	sauce: "Соусы",
	main: "Начинки"
};

const BurgerIngredients: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const ingredients = useSelector((state: RootState) =>
		ingredientsSelector.ingredients(state)
	);
	const [current, setCurrent] = useState<string>("bun");
	const location = useLocation();

	const openIngredient = (item: IIngredient) => {
		dispatch(setIngredientDetails(item));
		navigate(`ingredients/${item._id}`, {
			state: {
				background: location
			}
		});
	};

	const setTab = (tab: string) => {
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	const tabsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const bunsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const saucesRef = useRef() as MutableRefObject<HTMLDivElement>;
	const mainRef = useRef() as MutableRefObject<HTMLDivElement>;

	const buns: Array<IIngredient> = useMemo(
		() => ingredients?.filter((item) => item?.type === "bun") || [],
		[ingredients]
	);
	const main: Array<IIngredient> = useMemo(
		() => ingredients?.filter((item) => item?.type === "main") || [],
		[ingredients]
	);
	const sauces: Array<IIngredient> = useMemo(
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
		// setCurrent((prevState) =>
		// 	currentHeader === prevState.current ? prevState.current : currentHeader
		// );
		setCurrent((prevState) =>
			currentHeader === prevState ? prevState : currentHeader
		);
	};

	const renderIngredients = (
		array: Array<IIngredient>
	): React.ReactNode | null => {
		if (!array.length) return null;
		const getRef = (type: string) =>
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
