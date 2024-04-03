import { useLocation, useNavigate, useParams } from "react-router-dom";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { FC, useEffect } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { useAppDispatch, useAppSelector } from "../..";

const IngredientModal: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector(ingredientsSelector.ingredients);
	const { id } = useParams();

	useEffect(() => {
		if (id && ingredients.length > 0) {
			const ingredient = ingredients.find((item) => item._id === id);
			dispatch(setIngredientDetails(ingredient));
		}
	}, [id, ingredients, dispatch]);

	const handleClose = () => {
		const copiedState = { ...location.state };
		delete copiedState.isOpenModal;
		navigate("/", { state: copiedState });
	};

	return (
		<Modal closeModal={handleClose} title="Детали ингредиента">
			<IngredientDetails />
		</Modal>
	);
};

export default IngredientModal;
