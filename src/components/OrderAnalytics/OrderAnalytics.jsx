import { useSelector } from "react-redux";
import { ordersFeedSelector } from "../../services/reducers/orders-feed/selectors";
import styles from "./OrderAnalytics.module.css";

const OrderAnalytics = () => {
	const ordersFeedData = useSelector(ordersFeedSelector);

	const ordersNumberDone = ordersFeedData?.orders
		.filter((item) => item.status === "done")
		.slice(0, 10)
		.map((item) => item.number);
	const ordersNumberPending = ordersFeedData?.orders
		.filter((item) => item.status === "pending")
		.slice(0, 10)
		.map((item) => item.number);

	return (
		<div className={`${styles.main}`}>
			<div className={`${styles.statusContainer}`}>
				{/* <div className={`${styles.statusBlock}`}> */}
				<div>
					<span className={`text text_type_main-medium`}>Готовы:</span>
					<div className={`${styles.numberBlock} mt-3`}>
						{ordersNumberDone?.map((number) => (
							<div
								key={number}
								className={`${styles.numberDone} text text_type_digits-default`}
							>
								{number}
							</div>
						))}
					</div>
				</div>
				<div>
					<span className={`text text_type_main-medium`}>В работе:</span>
					<div className={`${styles.numberBlock} mt-3`}>
						{ordersNumberPending?.map((number) => (
							<div
								key={number}
								className={`${styles.numberItem} text text_type_digits-default`}
							>
								{number}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className={`${styles.totalBlock}`}>
				<span className={`text text_type_main-medium`}>
					Выполнено за все время:
				</span>
				<span
					className={`${styles.totalOrders} text text_type_digits-large`}
				>
					{ordersFeedData?.total}
				</span>
			</div>
			<div className={`${styles.totalBlock}`}>
				<span className={`text text_type_main-medium`}>
					Выполнено за сегодня:
				</span>
				<span
					className={`${styles.totalOrders} text text_type_digits-large`}
				>
					{ordersFeedData?.totalToday}
				</span>
			</div>
		</div>
	);
};

export default OrderAnalytics;
