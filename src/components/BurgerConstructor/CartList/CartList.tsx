import styles from "./CartList.module.css";
import * as burgerConstructorSelector from "../../../services/reducers/burger-constructor/selectors";
import CartItem from "../CartItem/CartItem";
import { FC } from "react";
import { IIngredient } from "../../../interfaces/IIngredient";
import { useAppSelector } from "../../..";

const CartList: FC = () => {
	const main = useAppSelector(burgerConstructorSelector.main);

	return (
		<div className={`${styles.itemList} custom-scroll`}>
			{main?.map((item: IIngredient) => {
				return <CartItem key={item.id} ingredient={item} />;
			})}
		</div>
	);
};

export default CartList;
