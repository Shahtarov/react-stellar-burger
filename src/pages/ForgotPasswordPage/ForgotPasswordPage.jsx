import { useState, useRef, useEffect } from "react";
import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetThunk } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const inputEmail = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		inputEmail.current && inputEmail.current.focus();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(sendPasswordResetThunk({ email })).then(() => {
			navigate("/reset-password");
		});
	};

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Восстановление пароля</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					ref={inputEmail}
					type={"email"}
					placeholder="Укажите e-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка. Введите существующий email"}
					size={"default"}
					extraClass="ml-1"
					autoComplete={"email"}
				/>
				<Button
					htmlType="submit"
					type="primary"
					size="medium"
					//onClick={handleButtonClick}
				>
					Восстановить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive">
				Вспомнили пароль?{" "}
				<Link className={styles.link} to="/login">
					Войти
				</Link>
			</p>
		</main>
	);
};
