import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

export const NotFoundPage: FC = () => {
	const navigate = useNavigate();
	const goToHomePage = () => navigate("/", { replace: true });

	return (
		<main className={styles.main}>
			<h1 className="text text_type_digits-large">Перейти на главную</h1>
			<Button
				onClick={goToHomePage}
				htmlType="button"
				type="primary"
				size="medium"
			>
				Перейти на главную
			</Button>
		</main>
	);
};
