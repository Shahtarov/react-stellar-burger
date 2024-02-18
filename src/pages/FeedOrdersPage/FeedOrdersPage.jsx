import styles from "./FeedOrdersPage.module.css";
import OrderList from "../../components/OrderList/OrderList";

export const FeedOrdersPage = () => {
	return (
		<main className={styles.main}>
			<div className={`${styles.container}`}>
				<h2 className={`text text_type_main-large mb-5`}>Лента заказов</h2>
				{/* список карточек с заказами */}

				<OrderList />
			</div>
			{/* <Analytics /> */}
		</main>
	);
};
