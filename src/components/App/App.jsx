import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useState, useEffect } from "react";
import { getIngredients } from "../../utils/services";
// import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
	const [ingredientsData, setIngredientsData] = useState();
	const [isModalOpen, setModal] = useState();
	const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
	const [ingredientDetailOpen, setIngredientDetailsOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState();

	const orderID = "034536";

	const getData = async () => {
		try {
			const response = await getIngredients();

			if (response.ok) {
				const { data } = await response.json();
				setIngredientsData(data);
			} else {
				throw new Error(`Ошибка ${response.status}`);
			}
		} catch (error) {
			console.error(`Произошла ошибка: ${error.message}`);
		}
	};

	useEffect(() => {
		if (!ingredientsData) {
			getData();
		}
	}, [ingredientsData]);

	function handleOrderDetailsOpen() {
		setModal(true);
		setOrderDetailsOpen(true);
	}

	function handleOrderDetailsClose() {
		setModal(false);
		setOrderDetailsOpen(false);
	}

	function handleIngredientDetailsOpen(ingredient) {
		setSelectedIngredient(ingredient);
		setModal(true);
		setIngredientDetailsOpen(true);
	}

	function handleIngredientDetailsClose() {
		setModal(false);
		setIngredientDetailsOpen(false);
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				{ingredientsData ? (
					<>
						<BurgerIngredients
							data={ingredientsData}
							handleIngredientDetails={handleIngredientDetailsOpen}
						/>
						<BurgerConstructor
							data={ingredientsData}
							handleOrderDetailsOpen={handleOrderDetailsOpen}
						/>
					</>
				) : (
					<p>Загрузка данных...</p>
				)}
			</main>

			{isModalOpen && orderDetailsOpen && (
				<Modal closeModal={handleOrderDetailsClose}>
					<OrderDetails orderID={orderID} />
				</Modal>
			)}

			{isModalOpen && ingredientDetailOpen && (
				<Modal
					title="Детали ингредиента"
					closeModal={handleIngredientDetailsClose}
				>
					<IngredientDetails data={selectedIngredient} />
				</Modal>
			)}
		</div>
	);
}

export default App;
