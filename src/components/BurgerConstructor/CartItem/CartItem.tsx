import styles from "./CartItem.module.css";
import {
	ConstructorElement,
	DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
	deleteMain,
	setMainDisposition
} from "../../../services/reducers/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { decrementCountIngredient } from "../../../services/reducers/ingredients";
import { FC } from "react";
import { IIngredient } from "../../../interfaces/IIngredient";
import { useAppDispatch } from "../../..";

interface ICartItemProps {
	ingredient: IIngredient;
}

const CartItem: FC<ICartItemProps> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const removeMain = (item: IIngredient) => {
		dispatch(deleteMain(item.id));
		dispatch(decrementCountIngredient(item._id));
	};

	const dropHandler = (dropIngredient: IIngredient) => {
		dispatch(setMainDisposition({ dropIngredient, ingredient }));
	};

	const [{ handlerId }, drop] = useDrop({
		accept: "ingredient-drag",
		hover: (dropIngredient: IIngredient, monitor) => {
			!monitor.isOver() && dropHandler(dropIngredient);
		},
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			};
		}
	});

	const [{ opacity }, drag] = useDrag({
		item: ingredient,
		type: "ingredient-drag",
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1
		})
	});

	return (
		<div ref={drop}>
			<div
				className={`${styles.item}`}
				style={{ opacity }}
				ref={drag}
				main-handler-id={handlerId}
			>
				<DragIcon type="primary" />
				<ConstructorElement
					// className={`${styles.itemContent}`}
					text={ingredient.name}
					isLocked={false}
					price={ingredient.price}
					thumbnail={ingredient.image}
					handleClose={() => removeMain(ingredient)}
				/>
			</div>
		</div>
	);
};

export default CartItem;
