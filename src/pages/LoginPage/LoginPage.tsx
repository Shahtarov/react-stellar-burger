import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import { loginThunk } from "../../services/reducers/auth";
import { useAppDispatch } from "../..";

export const LoginPage: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await dispatch(loginThunk({ email, password }));
			navigate("/", { replace: true });
		} catch (error) {
			console.error("Ошибка входа:", error);
		}
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
					autoComplete={"email"}
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
					autoComplete={"current-password"}
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
