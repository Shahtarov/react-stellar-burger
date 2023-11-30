import styles from "./CartList.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const CartList = ({ data }) => {
	return (
		<ul className={`${styles.itemList} custom-scroll`}>
			{data?.map(({ _id, ...itemProps }) => (
				<ConstructorElement
					text={itemProps.name}
					price={itemProps.price}
					thumbnail={itemProps.image}
					key={_id}
				/>
			))}
		</ul>
	);
};

export default CartList;
