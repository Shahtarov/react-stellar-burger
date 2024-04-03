import { useState } from "react";
import {
	CurrencyIcon,
	Button,
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import CartList from "./CartList/CartList";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { setBun, setMain } from "../../services/reducers/burger-constructor";
import {
	incrementCountIngredient,
	setCountBun
} from "../../services/reducers/ingredients";
import * as burgerConstructorSelector from "../../services/reducers/burger-constructor/selectors";
import { sendOrderDetailsThunk } from "../../services/reducers/order-details";
import { resetBurgerConstructor } from "../../services/reducers/burger-constructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useAppDispatch, useAppSelector } from "../..";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services";

const BurgerConstructor = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const bun = useAppSelector(burgerConstructorSelector.bun);
	const main = useAppSelector(burgerConstructorSelector.main);
	const sum = useAppSelector(burgerConstructorSelector.sum);
	const user = useAppSelector((state: RootState) => state.authSlice.user);

	const dropIngredient = (ingredient: { type: string; _id: string }) => {
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
		if (!!user) {
			let ingredientsIds: Array<string> = [];
			const buns: Array<string> | null = bun?._id
				? [bun?._id, bun?._id]
				: null;
			const mainIngredients: Array<string> = main.map(
				(item: { _id: string }) => item._id
			);
			ingredientsIds = buns
				? ingredientsIds.concat(buns, mainIngredients)
				: mainIngredients;
			dispatch(sendOrderDetailsThunk(ingredientsIds));
			setOpenModal(true);
			dispatch(resetBurgerConstructor());
		} else {
			navigate("/login", { replace: false });
		}
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
					<CurrencyIcon type="secondary" />
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
