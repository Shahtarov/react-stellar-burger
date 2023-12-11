import {
	CurrencyIcon,
	Button,
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import ingredientsArrPropType from "../../utils/propTypes/ingredientsArrPropType";
import CartList from "./CartList/CartList";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, handleOrderDetailsOpen }) => {
	const totalPrice = data?.reduce((total, item) => total + item.price, 0);

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
						className={`${styles.currencyIcon}`}
						type="secondary"
					/>
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					onClick={() => {
						handleOrderDetailsOpen();
					}}
				>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	data: ingredientsArrPropType.isRequired,
	handleOrderDetailsOpen: PropTypes.func.isRequired
};

export default BurgerConstructor;
