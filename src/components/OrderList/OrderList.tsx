import { useMemo } from "react";
import styles from "./OrderList.module.css";
import OrderItem from "../OrderItem/OrderItem";
import { useLocation } from "react-router-dom";
import { ordersFeedSelector } from "../../services/reducers/orders-feed/selectors";
import { ingredients } from "../../services/reducers/ingredients/selectors";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppSelector } from "../..";

export const OrderList = () => {
	const location = useLocation();
	const ordersFeedData = useAppSelector(ordersFeedSelector);
	const ingredientsData = useAppSelector(ingredients);

	const getIngredientsData = (ingredientsIds: string[]) => {
		const orderIngredients = ingredientsIds.map((id) =>
			ingredientsData?.find((ingredient) => id === ingredient?._id)
		);

		const uniqueIngredientsMap = new Map();

		orderIngredients.forEach((item) => {
			const key = item?.type === "bun" ? "bun" : item?._id;
			if (!uniqueIngredientsMap.has(key)) {
				uniqueIngredientsMap.set(key, { ...item, count: 1 });
			} else {
				uniqueIngredientsMap.get(key).count++;
			}
		});

		const uniqueIngredients = Array.from(uniqueIngredientsMap.values());

		const buns = uniqueIngredients.filter((item) => item?.type === "bun");
		const otherIngredients = uniqueIngredients.filter(
			(item) => item?.type !== "bun"
		);

		const sortedIngredients = [...buns, ...otherIngredients];

		if (sortedIngredients.length >= 6) {
			sortedIngredients[0] = {
				...sortedIngredients[0],
				hiddenIngredientsNumber: sortedIngredients.length - 5
			};
		}

		return sortedIngredients;
	};

	const getTotalPrice = useMemo(() => {
		return (ingredients: IIngredient[] | null) => {
			return ingredients?.reduce((sum: number, ingredient) => {
				if (ingredient?.type === "bun") {
					return sum + ingredient?.price * 2;
				} else {
					return sum + ingredient?.price * (ingredient?.count || 0);
				}
			}, 0);
		};
	}, []);

	return (
		<div className={`${styles.main} custom-scroll`}>
			{ordersFeedData?.orders?.map((item) => {
				const orderFeedInfo = getIngredientsData(item.ingredients);

				const orderFeedItemInfo = {
					...item,
					ingredients: [...orderFeedInfo],
					totalPrice: getTotalPrice(orderFeedInfo)
				};
				return (
					<OrderItem
						isShowStatus={location.pathname === "/profile/orders"}
						orderFeedItem={orderFeedItemInfo}
						key={item._id}
					/>
				);
			})}
		</div>
	);
};
