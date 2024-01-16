import styles from "./CartList.module.css";
import { useSelector } from "react-redux";
import * as burgerConstructorSelector from "../../../services/reducers/burger-constructor/selectors";
import CartItem from "../CartItem/CartItem";

const CartList = () => {
	const main = useSelector(burgerConstructorSelector.main);

	return (
		<div className={`${styles.itemList} custom-scroll`}>
			{main?.map((itemProps) => {
				return <CartItem ingredient={itemProps} key={itemProps.id} />;
			})}
		</div>
	);
};

export default CartList;
