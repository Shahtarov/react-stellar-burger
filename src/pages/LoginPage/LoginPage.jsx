import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginThunk } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginThunk({ email, password })).then(() => {
			navigate("/", { replace: true });
		});
	};

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Вход</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={"email"}
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка. Введите существущий email"}
					size={"default"}
					extraClass={`ml-1 ${isEmailFocused ? styles.focused : ""}`}
					onFocus={() => setIsEmailFocused(true)}
					onBlur={() => setIsEmailFocused(false)}
				/>
				<Input
					type={showPassword ? "text" : "password"}
					placeholder={"Пароль"}
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={"password"}
					error={false}
					errorText={"Ошибка. Неверный пароль"}
					size={"default"}
					extraClass={`ml-1 ${isPasswordFocused ? styles.focused : ""}`}
					icon={showPassword ? "ShowIcon" : "HideIcon"}
					onIconClick={toggleShowPassword}
					onFocus={() => setIsPasswordFocused(true)}
					onBlur={() => setIsPasswordFocused(false)}
				/>
				<Button htmlType="submit" type="primary" size="medium">
					Войти
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive">
				Вы — новый пользователь?{" "}
				<Link className={styles.link} to="/register">
					Зарегистрироваться
				</Link>
			</p>
			<p className="text text_type_main-default text_color_inactive mt-4">
				Забыли пароль?{" "}
				<Link className={styles.link} to="/forgot-password">
					Восстановить пароль
				</Link>
			</p>
		</main>
	);
};
