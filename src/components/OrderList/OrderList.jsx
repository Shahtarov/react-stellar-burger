import { useMemo, useCallback } from "react";
import styles from "./OrderList.module.css";
import OrderItem from "../OrderItem/OrderItem";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ordersFeedSelector } from "../../services/reducers/orders-feed/selectors";
import { ingredients } from "../../services/reducers/ingredients/selectors";

export const OrderList = () => {
	const location = useLocation();
	const ordersFeedData = useSelector(ordersFeedSelector);
	const ingredientsData = useSelector(ingredients);

	// const getIngredientsData = useCallback(
	// 	(ingredientsIds) => {
	// 		const orderIngredients = ingredientsIds.map((id) =>
	// 			ingredientsData?.find((ingredient) => id === ingredient?._id)
	// 		);

	// 		const uniqueIngredientsMap = new Map();
	// 		const buns = [];

	// 		orderIngredients.forEach((item) => {
	// 			const key = item?.type === "bun" ? "bun" : item?._id;
	// 			if (
	// 				item?.type === "bun" &&
	// 				!buns.find((bun) => bun._id === item?._id)
	// 			) {
	// 				buns.push({ ...item, count: 2 });
	// 			} else if (!uniqueIngredientsMap.has(key)) {
	// 				uniqueIngredientsMap.set(key, { ...item, count: 1 });
	// 			} else {
	// 				uniqueIngredientsMap.get(key).count++;
	// 			}
	// 		});

	// 		const otherIngredients = Array.from(uniqueIngredientsMap.values());
	// 		const sortedIngredients = [...buns, ...otherIngredients];

	// 		if (sortedIngredients.length >= 6) {
	// 			sortedIngredients[0] = {
	// 				...sortedIngredients[0],
	// 				hiddenIngredientsNumber: sortedIngredients.length - 5
	// 			};
	// 		}

	// 		return sortedIngredients;
	// 	},
	// 	[ingredientsData]
	// );

	const getIngredientsData = useCallback(
		(ingredientsIds) => {
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
		},
		[ingredientsData]
	);

	const getTotalPrice = useMemo(() => {
		return (ingredients) => {
			return ingredients?.reduce((sum, ingredient) => {
				if (ingredient?.type === "bun") {
					return sum + ingredient?.price * 2;
				} else {
					return sum + ingredient?.price * ingredient?.count;
				}
			}, 0);
		};
	}, []);

	// const getIngredientsData = useCallback(
	// 	(ingredientsIds) => {
	// 		const orderIngredients = ingredientsIds.map((id) =>
	// 			ingredientsData.find((ingredient) => id === ingredient._id)
	// 		);

	// 		const buns = orderIngredients.filter((item) => item?.type === "bun");
	// 		const otherIngredients = orderIngredients.filter(
	// 			(item) => item?.type !== "bun"
	// 		);

	// 		const sortedIngredients = [...otherIngredients];

	// 		let bunAdded = false;

	// 		buns.forEach((bun) => {
	// 			if (!bunAdded) {
	// 				sortedIngredients.push(bun);
	// 				bunAdded = true;
	// 			}
	// 		});

	// 		if (sortedIngredients.length >= 6) {
	// 			sortedIngredients[0] = {
	// 				...sortedIngredients[0],
	// 				hiddenIngredientsNumber: sortedIngredients.length - 5
	// 			};
	// 		}

	// 		return sortedIngredients;
	// 	},
	// 	[ingredientsData]
	// );

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
