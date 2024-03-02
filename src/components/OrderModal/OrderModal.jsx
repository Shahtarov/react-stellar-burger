import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Modal from "../Modal/Modal";
import { getOrderFeedDetails } from "../../services/api";
import {
	clearOrderFeedDetailsData,
	setOrderFeedDetails
} from "../../services/reducers/order-feed-details";
import OrderOverview from "../OrderOverview/OrderOverview";

const OrderModal = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { number } = useParams();

	useEffect(() => {
		if (number) {
			getOrderFeedDetails(number)
				.then((data) => {
					dispatch(setOrderFeedDetails(data));
				})
				.catch((err) => {
					throw new Error(err);
				});
		}
	}, [number]);

	const handleClose = () => {
		const copiedState = { ...location.state };
		delete copiedState.isOpenModal;
		dispatch(clearOrderFeedDetailsData());
		navigate(-1);
	};

	return (
		<Modal
			closeModal={handleClose}
			title={`#${number}`}
			titleExtraClass="text text_type_digits-default"
		>
			<OrderOverview />
		</Modal>
	);
};

export default OrderModal;
