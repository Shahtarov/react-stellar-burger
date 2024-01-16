import styles from "./CartItem.module.css";
import {
	ConstructorElement,
	DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../../utils/propTypes/ingredientPropType";
import { useDispatch } from "react-redux";
import {
	deleteMain,
	setMainDisposition
} from "../../../services/reducers/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { decrementCountIngredient } from "../../../services/reducers/ingredients";

const CartItem = ({ ingredient }) => {
	const dispatch = useDispatch();
	const removeMain = (item) => {
		dispatch(deleteMain(item.id));
		dispatch(decrementCountIngredient(item._id));
	};

	const dropHandler = (dropIngredient) => {
		dispatch(setMainDisposition({ dropIngredient, ingredient }));
	};

	const [{ handlerId }, drop] = useDrop({
		accept: "ingredient-drag",
		hover: (dropIngredient, monitor) => {
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
					className={`${styles.itemContent}`}
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

CartItem.propTypes = {
	ingredient: ingredientPropType.isRequired
};

export default CartItem;
