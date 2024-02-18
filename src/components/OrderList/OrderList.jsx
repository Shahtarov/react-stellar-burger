import styles from "./OrderList.module.css";
import OrderItem from "../OrderItem/OrderItem";
import { Link } from "react-router-dom";

const OrderList = () => {
	return (
		<>
			<ul className={`${styles.list} custom-scroll`}>
				<Link
					className={styles.link}
					// key={order._id}
					// onClick={}
				>
					<OrderItem
					/* order={order}*/
					/>
					<OrderItem
					/* order={order}*/
					/>
					<OrderItem
					/* order={order}*/
					/>
					<OrderItem
					/* order={order}*/
					/>
				</Link>
			</ul>
		</>
	);
};

export default OrderList;
