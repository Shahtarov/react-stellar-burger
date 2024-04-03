import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import { useEffect, useCallback, FC } from "react";
import Portal from "../Portal/Portal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface ModalProps {
	closeModal: () => void;
	title?: string;
	children: React.ReactNode;
	titleExtraClass?: string;
}

const Modal: FC<ModalProps> = ({ closeModal, title = "", children }) => {
	const closeEsc = useCallback(
		(e: KeyboardEventInit) => {
			if (e.key === "Escape") {
				closeModal();
			}
		},
		[closeModal]
	);

	useEffect(() => {
		document.addEventListener("keydown", closeEsc);

		return () => {
			document.removeEventListener("keydown", closeEsc);
		};
	}, [closeEsc]);

	return (
		<Portal>
			<ModalOverlay closeModal={closeModal}>
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
									closeModal();
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

export default Modal;
