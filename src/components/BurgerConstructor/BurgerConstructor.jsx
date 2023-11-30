import {
	CurrencyIcon,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import CartList from "./CartList/CartList";

const BurgerConstructor = ({ props }) => {
	const totalPrice = props.reduce((total, item) => total + item.price, 0);

	return (
		<section className={`${styles.container} pt-25 pl-4 pr-4`}>
			<CartList props={props} />

			<div className={`${styles.orderTotal} mr-4 mt-10`}>
				<div className={`${styles.price}`}>
					<p className="text text_type_digits-medium">{totalPrice}</p>
					<CurrencyIcon
						style={{ width: "36px", height: "36px" }}
						type="secondary"
					/>
				</div>
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
