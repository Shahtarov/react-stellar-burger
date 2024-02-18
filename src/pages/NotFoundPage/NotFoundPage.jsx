import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
	const navigate = useNavigate();
	const goToHomePage = () => navigate("/", { replace: true });

	return (
		<main className={styles.main}>
			<h1 className="text text_type_digits-large">404</h1>
			<p className="text text_type_main-medium">Страница не найдена</p>
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
