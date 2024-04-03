import styles from "./OrderItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import moment from "moment";
import "moment/locale/ru";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOrderFeedItems } from "../../interfaces/IOrderFeed";

interface IOrdersItemProps {
	isShowStatus: boolean;
	orderFeedItem: TOrderFeedItems;
}

const OrdersItem: FC<IOrdersItemProps> = ({ isShowStatus, orderFeedItem }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const STATUSES: { [key: string]: "Выполнен" | "Готовится" | "Создан" } = {
		done: "Выполнен",
		pending: "Готовится",
		created: "Создан"
	};

	const getFormatTime = (time: string) => {
		moment.locale("ru");
		return moment(time).calendar();
	};
	const formattedOrderTime = getFormatTime(orderFeedItem?.createdAt);

	const openOrder = () => {
		const currentPath = location.pathname;
		let path;

		switch (currentPath) {
			case "/feed":
				path = "/feed";
				break;
			case "/profile/orders":
				path = "/profile/orders";
				break;
			default:
				path = "/";
				break;
		}

		const orderNumber = orderFeedItem.number;
		const newPath = `${path}/${orderNumber}`;

		navigate(newPath, {
			state: { background: location }
		});
	};

	return (
		<li className={`${styles.card} p-6 mb-4`} onClick={openOrder}>
			<div className={`${styles.caption}`}>
				<p
					className={`text text_type_digits-default`}
				>{`#${orderFeedItem.number}`}</p>
				<p className={`text text_type_main-default text_color_inactive`}>
					{formattedOrderTime}
				</p>
			</div>
			<h2 className={`${styles.info} text text_type_main-medium`}>
				{orderFeedItem.name}
			</h2>

			{isShowStatus && (
				<p
					className={`text text_type_main-default ${
						orderFeedItem?.status === "done" && styles.orderStatusDone
					}`}
				>
					{STATUSES[orderFeedItem?.status]}
				</p>
			)}
			<div className={`${styles.bottomBlock}`}>
				<div className={`${styles.ingredientsImages}`}>
					{orderFeedItem.ingredients
						.slice(0, 6)
						.reverse()
						.map((item, index: number) => {
							return (
								<div
									className={`${styles.ingredientImageBlock}`}
									key={index}
								>
									<div className={`${styles.ingredientImageRound}`} />
									<img
										src={item.image}
										alt={item.name}
										className={`${styles.ingredientImage} ${
											item.hiddenIngredientsNumber &&
											index === 0 &&
											styles.imageOverlay
										}`}
									/>
									{item.hiddenIngredientsNumber && (
										<span
											className={`${styles.nextCount} text text_type_digits-default`}
										>
											{`+${item.hiddenIngredientsNumber}`}
										</span>
									)}
								</div>
							);
						})}
				</div>

				<div className={`${styles.price} ml-6`}>
					<p
						className={`${styles.digits} text text_type_digits-default mr-2`}
					>
						{orderFeedItem.totalPrice}
					</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</li>
	);
};

export default OrdersItem;
