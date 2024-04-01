import { useEffect, useState, useMemo, FC } from "react";
import styles from "./OrderOverview.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";
import { ingredients } from "../../services/reducers/ingredients/selectors";
import { RootState } from "../../services";
import { IIngredient } from "../../interfaces/IIngredient";

const OrderOverview: FC = () => {
	const orderFeedDetailsData = useSelector(
		(state: RootState) => state.orderFeedDetailsSlice.orderFeedDetails
	);
	const ingredientsFeedData = useSelector(ingredients);
	const [ingredientsData, setIngredientsData] = useState<IIngredient[] | null>(
		null
	);

	interface IStatuses {
		[key: string]: string;
	}
	const STATUSES: IStatuses = {
		done: "Выполнен",
		pending: "Готовится",
		created: "Создан"
	};

	const getFormatTime = (time?: string) => {
		moment.locale("ru");
		return moment(time).calendar();
	};
	const formattedOrderTime = getFormatTime(orderFeedDetailsData?.createdAt);

	const getIngredientsData = (ingredientsIds: string[]) => {
		const orderIngredients = ingredientsIds.map((id) =>
			ingredientsFeedData?.find((ingredient) => id === ingredient?._id)
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

		const sortedIngredients = buns
			? [...buns, ...otherIngredients]
			: [...otherIngredients];

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
	}, [ingredientsData]);
	const orderTotalPrice = getTotalPrice(ingredientsData);

	useEffect(() => {
		if (orderFeedDetailsData?.ingredients) {
			setIngredientsData(
				getIngredientsData(orderFeedDetailsData?.ingredients)
			);
		}
	}, [orderFeedDetailsData?.ingredients]);

	return (
		<div className={`${styles.main} mr-10 ml-10`}>
			<h1 className={`text text_type_main-medium mb-2 mt-5`}>
				{orderFeedDetailsData?.name}
			</h1>
			<span
				className={`text text_type_main-default mb-6 ${
					orderFeedDetailsData?.status === "done" && styles.orderStatusDone
				}`}
			>
				{STATUSES[`${orderFeedDetailsData?.status}`]}
			</span>

			<span className={` text text_type_main-medium`}>Состав:</span>
			<div className={`${styles.ingredientsBlock} custom-scroll mt-6`}>
				{ingredientsData &&
					ingredientsData.map((item, index: number) => {
						return (
							<div
								className={`${styles.ingredientBlock} mr-6`}
								key={index}
							>
								<div className={`${styles.ingredientImageNameBlock}`}>
									<div className={`${styles.ingredientImageBlock}`}>
										<div
											className={`${styles.ingredientImageRound}`}
										/>
										<img
											src={item.image}
											alt={item.name}
											className={`${styles.ingredientImage}`}
										/>
									</div>
									<span className={`text text_type_main-default`}>
										{item.name}
									</span>
								</div>
								<div className={`${styles.priceBlock}`}>
									<span
										className={`text text_type_digits-default mr-2`}
									>{`${item.count} x ${item.price}`}</span>
									<CurrencyIcon type="primary" />
								</div>
							</div>
						);
					})}
			</div>
			<div className={`${styles.bottomBlock}`}>
				<span className={`text text_type_main-default text_color_inactive`}>
					{formattedOrderTime}
				</span>

				<div className={`${styles.priceBlock}`}>
					<span className={`text text_type_digits-default mr-2`}>
						{orderTotalPrice}
					</span>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default OrderOverview;
