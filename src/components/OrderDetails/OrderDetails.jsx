import styles from "./OrderDetails.module.css";
import checkIcon from "../../images/graphics.png";
import { useSelector } from "react-redux";
import * as orderDetailsSelector from "../../services/reducers/order-details/selectors";

const OrderDetails = () => {
	const orderDetails = useSelector(orderDetailsSelector.orderDetails);

	return (
		<div className={`${styles.container}`}>
			<h3 className="text text_type_digits-large">
				{orderDetails.order.number}
			</h3>
			<p className="text text_type_main-medium mt-8">идентификатор заказа</p>
			<img
				alt="Заказ оформлен"
				src={checkIcon}
				className={`${styles.checkIcon} mt-15 mb-15`}
			/>
			<p className={`text text_type_main-default mb-2`}>
				Ваш заказ начали готовить
			</p>
			<p className={`text text_type_main-default text_color_inactive`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
