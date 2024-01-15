import styles from "./CartItem.module.css";
import {
	ConstructorElement,
	DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import * as burgerConstructorSelector from "../../../services/reducers/burger-constructor/selectors";
import {
	deleteMain,
	setMain
} from "../../../services/reducers/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { decrementCountIngredient } from "../../../services/reducers/ingredients";

const CartItem = ({ ingredient }) => {
	const dispatch = useDispatch();
	const data = useSelector(burgerConstructorSelector.main);
	console.log(data);
	const removeMain = (item) => {
		dispatch(deleteMain(item.id));
		dispatch(decrementCountIngredient(item._id));
	};

	const dropHandler = (dropIngredient) => {
		const indexIngredient = data.findIndex(
			(item) => item.id === ingredient.id
		);
		const indexDropIngredient = data.findIndex(
			(item) => item.id === dropIngredient.id
		);
		let mainDisposition = [...data];

		if (indexIngredient < indexDropIngredient) {
			mainDisposition.splice(indexDropIngredient, 1);
			mainDisposition.splice(indexIngredient, 0, dropIngredient);
		} else {
			mainDisposition.splice(indexIngredient + 1, 0, dropIngredient);
			mainDisposition.splice(indexDropIngredient, 1);
		}
		dispatch(setMain(mainDisposition));
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
				data-handler-id={handlerId}
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

export default CartItem;
