import styles from "./ProfileOrdersPage.module.css";
import { ProfileNavigation } from "../../components/ProfileNavigation/ProfileNavigation";
import { OrderList } from "../../components/OrderList/OrderList";
import { FC, useEffect } from "react";
import {
	wsOrdersClose,
	wsOrdersInit
} from "../../services/reducers/orders-feed";
import { useAppDispatch } from "../..";

export const ProfileOrdersPage: FC = () => {
	const dispatch = useAppDispatch();
	const accessToken = localStorage.getItem("accessToken");
	const sliceToken = (token: string | null) => {
		if (token) {
			const tokenArr = token?.split(" ");
			return tokenArr[1];
		}
	};

	useEffect(() => {
		dispatch(
			wsOrdersInit(
				`wss://norma.nomoreparties.space/orders?token=${sliceToken(
					accessToken
				)}`
			)
		);
		return () => {
			dispatch(wsOrdersClose());
		};
	}, [accessToken]);

	return (
		<main className={styles.main}>
			<ProfileNavigation />
			<div className={styles.orders}>
				<OrderList />
			</div>
		</main>
	);
};
