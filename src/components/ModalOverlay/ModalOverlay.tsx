import styles from "./ModalOverlay.module.css";
import { useEffect, FC } from "react";

interface ModalOverlayProps {
	closeModal: () => void;
	children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ closeModal, children }) => {
	useEffect(() => {
		const closeOverlayClick: EventListenerOrEventListenerObject = (
			e: Event
		) => {
			const target = e.target as HTMLElement;
			if (target && target.classList.contains(styles.modalOverlay)) {
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

export default ModalOverlay;
