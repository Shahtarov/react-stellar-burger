import styles from "./CartList.module.css";
import { useSelector } from "react-redux";
import * as burgerConstructorSelector from "../../../services/reducers/burger-constructor/selectors";
import CartItem from "../CartLtem/CartItem";

const CartList = () => {
	const data = useSelector(burgerConstructorSelector.main);

	return (
		<div className={`${styles.itemList} custom-scroll`}>
			{data?.map((itemProps) => {
				return <CartItem ingredient={itemProps} key={itemProps._id} />;
			})}
		</div>
	);
};

export default CartList;
