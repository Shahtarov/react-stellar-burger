import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import { getIngredients } from "../../utils/services";

function App() {
	const [ingredients, setIngredients] = useState();

	const getData = async () => {
		try {
			const response = await getIngredients();

			if (response.ok) {
				const { data } = await response.json();
				setIngredients(data);
			} else {
				throw new Error(`Ошибка ${response.status}`);
			}
		} catch (error) {
			console.error(`Произошла ошибка: ${error.message}`);
		}
	};

	useEffect(() => {
		if (!ingredients) {
			getData();
		}
	}, [ingredients]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients data={ingredients} />
				<BurgerConstructor data={ingredients} />
			</main>
		</div>
	);
}

export default App;
