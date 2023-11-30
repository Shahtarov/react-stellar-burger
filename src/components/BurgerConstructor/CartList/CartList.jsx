import styles from "./CartList.module.css";
import { useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const CartList = ({ props }) => {
	// const [current, setCurrent] = useState("");
	const elements = props.map((item) => {
		const { _id, ...itemProps } = item;
		// if (itemProps.type === "bun") {
		return (
			<>
				{/* {itemProps.type === "bun" && { current } !== { _id }
						? (
								<ConstructorElement
									type="top"
									isLocked={true}
									text={`${itemProps.name} (верх)`}
									price={itemProps.price}
									thumbnail={itemProps.image}
									key={_id}
								/>
						  ) && setCurrent({ _id })
						: null} */}
				{itemProps.type !== "bun" ? (
					<ConstructorElement
						text={itemProps.name}
						price={itemProps.price}
						thumbnail={itemProps.image}
						key={_id}
					/>
				) : null}
				{/* {itemProps.type === "bun" ? (
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${itemProps.name} (низ)`}
							price={itemProps.price}
							thumbnail={itemProps.image}
							key={_id}
						/>
					) : null} */}
			</>
		);
		// return <CartItem key={_id} props={itemProps} />;
		// } else {
		// 	return (
		// 		<ConstructorElement
		// 			text={itemProps.name}
		// 			price={itemProps.price}
		// 			thumbnail={itemProps.image}
		// 		/>
		// 	);
		// }
	});

	return <ul className={`${styles.itemList} custom-scroll`}>{elements}</ul>;
};

export default CartList;
