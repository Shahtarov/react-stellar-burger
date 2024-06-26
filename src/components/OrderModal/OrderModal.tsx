import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FC, useEffect } from "react";
import Modal from "../Modal/Modal";
import { getOrderFeedDetails } from "../../services/api";
import {
	clearOrderFeedDetailsData,
	setOrderFeedDetails
} from "../../services/reducers/order-feed-details";
import OrderOverview from "../OrderOverview/OrderOverview";
import { useAppDispatch } from "../..";

const OrderModal: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
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
