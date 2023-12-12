import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";
import { useEffect } from "react";

const ModalOverlay = ({ closeModal, children }) => {
	useEffect(() => {
		const closeOverlayClick = (e) => {
			if (e.target.classList.contains(styles.modalOverlay)) {
				closeModal();
			}
		};

		document.addEventListener("click", closeOverlayClick);

		return () => {
			document.removeEventListener("click", closeOverlayClick);
		};
	}, [closeModal]);

	return <div className={styles.modalOverlay}>{children}</div>;
};

ModalOverlay.propTypes = {
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default ModalOverlay;
