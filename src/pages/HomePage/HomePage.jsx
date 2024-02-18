import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from "./HomePage.module.css";

export const HomePage = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<main className={styles.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</DndProvider>
	);
};
