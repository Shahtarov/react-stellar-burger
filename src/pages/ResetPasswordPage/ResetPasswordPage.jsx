import { useState, useEffect, useRef } from "react";
import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNewPasswordResetThunk } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";

export const ResetPasswordPage = () => {
	const [resetCode, setResetCode] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const passwordInput = useRef(null);
	const resetCodeInput = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(
			sendNewPasswordResetThunk({
				newPassword: password,
				token: resetCode
			}).then(() => {
				navigate("/", { replace: true });
			})
		);
	};

	useEffect(() => {
		passwordInput.current && passwordInput.current.focus();
	}, []);

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Восстановление пароля</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					ref={passwordInput}
					type={showPassword ? "text" : "password"}
					placeholder={"Введите новый пароль"}
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={"password"}
					error={false}
					errorText={"Ошибка. Введите более сложный пароль"}
					icon={showPassword ? "ShowIcon" : "HideIcon"}
					onIconClick={toggleShowPassword}
					size={"default"}
					extraClass="ml-1"
					autoComplete={"new-password"}
				/>
				<Input
					ref={resetCodeInput}
					type={"text"}
					placeholder={"Введите код из письма"}
					onChange={(e) => setResetCode(e.target.value)}
					value={resetCode}
					name={"resetCode"}
					error={false}
					errorText={"Ошибка. Неверный код"}
					size={"default"}
					extraClass="ml-1"
				/>
				<Button htmlType="submit" type="primary" size="medium">
					Сохранить
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
