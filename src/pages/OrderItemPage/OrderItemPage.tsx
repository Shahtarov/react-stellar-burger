import { FC, useEffect } from "react";
import styles from "./OrderItemPage.module.css";
import { useParams } from "react-router-dom";
import OrderOverview from "../../components/OrderOverview/OrderOverview";
import { getOrderFeedDetails } from "../../services/api";
import { setOrderFeedDetails } from "../../services/reducers/order-feed-details";
import { useAppDispatch } from "../..";

export const OrderItemPage: FC = () => {
	const dispatch = useAppDispatch();
	const { number } = useParams();

	useEffect(() => {
		if (number) {
			getOrderFeedDetails(number)
				.then((data) => {
					dispatch(setOrderFeedDetails(data));
				})
				.catch((err) => {
					throw new Error(err);
				});
		}
	}, [number]);

	return (
		<main className={`${styles.main}`}>
			<span
				className={`${styles.orderNumber} text text_type_digits-default`}
			>
				{`#${number}`}
			</span>
			<OrderOverview />
		</main>
	);
};
