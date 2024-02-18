import styles from "./OrderItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderItem = () => {
	return (
		<li className={`${styles.card} p-6 mb-4`}>
			<div className={`${styles.caption}`}>
				<p className={`text text_type_digits-default`}>#050011</p>
				<p className={`text text_type_main-default text_color_inactive`}>
					Сегодня, 16:20 i-GMT+3
				</p>
			</div>
			<p className={`${styles.info} text text_type_main-medium`}>
				Death Star Starship Main бургер
			</p>

			<div className={`${styles.ingredients} mt-6`}>
				{/* список иконок ингредиентов в заказе*/}

				<div className={`${styles.price} ml-6`}>
					<p
						className={`${styles.digits} text text_type_digits-default mr-2`}
					>
						45444
					</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</li>
	);
};

export default OrderItem;
