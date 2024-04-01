import { useState, useRef, useEffect, FC, FormEvent, ChangeEvent } from "react";
import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetThunk } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";

export const ForgotPasswordPage: FC = () => {
	const [email, setEmail] = useState<string>("");
	const inputEmail = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		inputEmail.current && inputEmail.current.focus();
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await dispatch(sendPasswordResetThunk({ email }));
			navigate("/reset-password");
		} catch (error) {
			console.error("Ошибка сброса пароля:", error);
		}
	};

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Восстановление пароля</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					ref={inputEmail}
					type={"email"}
					placeholder="Укажите e-mail"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка. Введите существующий email"}
					size={"default"}
					extraClass="ml-1"
					autoComplete={"email"}
				/>
				<Button htmlType="submit" type="primary" size="medium">
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
