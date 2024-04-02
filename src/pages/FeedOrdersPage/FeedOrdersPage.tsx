import styles from "./FeedOrdersPage.module.css";
import { OrderList } from "../../components/OrderList/OrderList";
import { FC, useEffect } from "react";
import {
	wsOrdersInit,
	wsOrdersClose
} from "../../services/reducers/orders-feed";
import OrderAnalytics from "../../components/OrderAnalytics/OrderAnalytics";
import { useAppDispatch } from "../..";

export const FeedOrdersPage: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(wsOrdersInit("wss://norma.nomoreparties.space/orders/all"));
		return () => {
			dispatch(wsOrdersClose());
		};
	}, []);

	return (
		<main className={styles.main}>
			<h1 className={`text text_type_main-large mb-3`}>Лента заказов</h1>
			<div className={`${styles.container}`}>
				<OrderList />
				<OrderAnalytics />
			</div>
		</main>
	);
};
