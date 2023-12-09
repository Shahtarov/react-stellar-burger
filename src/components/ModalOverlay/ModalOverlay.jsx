import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ active, setActive, children }) => {
	return (
		<div
			onClick={() => {
				setActive(false);
			}}
			className={active ? styles.modalOverlayActive : styles.modalOverlay}
		>
			{children}
		</div>
	);
};

ModalOverlay.propTypes = {
	setActive: PropTypes.func.isRequired,
	children: PropTypes.node,
	active: PropTypes.bool.isRequired
};

export default ModalOverlay;
