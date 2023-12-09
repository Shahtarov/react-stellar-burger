import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import { useEffect, useCallback } from "react";
import Portal from "../Portal/Portal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const Modal = ({ active, setActive, title = "", children }) => {
	const close = useCallback(
		(e) => {
			if (e.key === "Escape") {
				setActive(false);
			}
		},
		[setActive]
	);

	useEffect(() => {
		document.addEventListener("keydown", close);

		return () => {
			document.removeEventListener("keydown", close);
		};
	}, [close]);

	return (
		<Portal>
			<ModalOverlay active={active} setActive={setActive}>
				<div
					className={`${styles.modal} pt-10 pb-15 pr-10 pl-10`}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className={`${styles.header}`}>
						<h3 className="text text_type_main-large">{title}</h3>
						<div className={`${styles.closeIcon}`}>
							<CloseIcon
								type="secondary"
								onClick={() => {
									setActive(false);
								}}
							/>
						</div>
					</div>
					{children}
				</div>
			</ModalOverlay>
		</Portal>
	);
};

Modal.propTypes = {
	setActive: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node,
	active: PropTypes.bool.isRequired
};

export default Modal;
