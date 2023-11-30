import {
	CurrencyIcon,
	Button,
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import cartPropType from "../../utils/propTypes/cartPropType";
// import PropTypes from "prop-types";
import CartList from "./CartList/CartList";

const BurgerConstructor = ({ data }) => {
	const totalPrice = data?.reduce((total, item) => total + item.price, 0);
	// console.log(data);
	return (
		<section className={`${styles.container} pt-25 pl-4 pr-4`}>
			<ConstructorElement
				type="top"
				isLocked={true}
				text={`Краторная булка N-200i (верх)`}
				price={1255}
				thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
			/>

			<CartList data={data} />

			<ConstructorElement
				type="bottom"
				isLocked={true}
				text={`Краторная булка N-200i (низ)`}
				price={1255}
				thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
			/>

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

BurgerConstructor.propTypes = {
	data: cartPropType.isRequired
};

export default BurgerConstructor;
