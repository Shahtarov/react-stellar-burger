import {
	CurrencyIcon,
	Button,
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import CartList from "./CartList/CartList";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setBun, setMain } from "../../services/reducers/burger-constructor";
import {
	incrementCountIngredient,
	setCountBun
} from "../../services/reducers/ingredients";
import * as burgerConstructorSelector from "../../services/reducers/burger-constructor/selectors";
import { sendOrderDetailsThunk } from "../../services/reducers/order-details";
import { useState } from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = () => {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const bun = useSelector(burgerConstructorSelector.bun);
	const main = useSelector(burgerConstructorSelector.main);
	const sum = useSelector(burgerConstructorSelector.sum);

	const dropIngredient = (ingredient) => {
		if (ingredient.type === "bun") {
			if (ingredient._id !== bun?._id) {
				dispatch(setBun({ ...ingredient, id: uuidv4() }));
				dispatch(setCountBun(ingredient._id));
			}
		} else {
			dispatch(setMain([{ ...ingredient, id: uuidv4() }, ...main]));
			dispatch(incrementCountIngredient(ingredient._id));
		}
	};

	const [{ isHover }, drop] = useDrop({
		accept: "ingredient",
		collect: (monitor) => ({
			isHover: monitor.isOver()
		}),
		drop: dropIngredient
	});

	function sendOrderDetails() {
		let ingredientsIds = [];
		const buns = [bun?._id, bun?._id];
		const mainIngredients = main.map((item) => item._id);
		ingredientsIds = ingredientsIds.concat(buns, mainIngredients);
		dispatch(sendOrderDetailsThunk(ingredientsIds));
		setOpenModal(true);
	}

	return (
		<section
			ref={drop}
			className={`
				${styles.container}
				 mt-15 pt-10
				 ${isHover ? styles.onHover : ""}
			`}
		>
			{bun && (
				<div className="mb-4 ml-8">
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun?.name} (верх)`}
						price={bun?.price}
						thumbnail={bun?.image}
					/>
				</div>
			)}

			{main && <CartList />}

			{bun && (
				<div className="mt-4 ml-8">
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun?.name} (низ)`}
						price={bun?.price}
						thumbnail={bun?.image}
					/>
				</div>
			)}

			<div className={`${styles.orderTotal} mr-4 mt-10`}>
				<div className={`${styles.price}`}>
					<p className="text text_type_digits-medium">{sum}</p>
					<CurrencyIcon
						className={`${styles.currencyIcon}`}
						type="secondary"
					/>
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					onClick={sendOrderDetails}
				>
					Оформить заказ
				</Button>
			</div>
			{openModal && (
				<Modal closeModal={() => setOpenModal(false)}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
