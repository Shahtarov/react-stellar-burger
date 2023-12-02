import styles from "./App.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";

function App() {
	const [ingredients, setIngredients] = useState(data);

	// useEffect(() => {
	// 	setIngredients(data);
	// }, []);

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
