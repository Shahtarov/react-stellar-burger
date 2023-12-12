import styles from "./CartList.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsArrPropType from "../../../utils/propTypes/ingredientsArrPropType";

const CartList = ({ data }) => {
	return (
		<ul className={`${styles.itemList} custom-scroll`}>
			{data?.map(({ _id, type, ...itemProps }) =>
				type !== "bun" ? (
					<ConstructorElement
						text={itemProps.name}
						price={itemProps.price}
						thumbnail={itemProps.image}
						key={_id}
					/>
				) : null
			)}
		</ul>
	);
};

CartList.propTypes = {
	data: ingredientsArrPropType.isRequired
};

export default CartList;
