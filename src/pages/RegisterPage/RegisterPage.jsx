import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegistrationThunk } from "../../services/reducers/auth";

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isNameFocused, setIsNameFocused] = useState(false);
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(userRegistrationThunk(name, email, password)).then(() => {
			navigate("/", { replace: true });
		});
	};

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Регистрация</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={(e) => setName(e.target.value)}
					value={name}
					name={"name"}
					error={false}
					errorText={"Ошибка. Ведите имя"}
					size={"default"}
					extraClass={`ml-1 ${isNameFocused ? styles.focused : ""}`}
					onFocus={() => setIsNameFocused(true)}
					onBlur={() => setIsNameFocused(false)}
				/>
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
					errorText={"Ошибка. Введите более сложный пароль"}
					icon={showPassword ? "ShowIcon" : "HideIcon"}
					onIconClick={toggleShowPassword}
					size={"default"}
					extraClass={`ml-1 ${isPasswordFocused ? styles.focused : ""}`}
					onFocus={() => setIsPasswordFocused(true)}
					onBlur={() => setIsPasswordFocused(false)}
				/>
				<Button htmlType="submit" type="primary" size="medium">
					Зарегистрироваться
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive">
				Уже зарегистрированы?{" "}
				<Link className={styles.link} to="/login">
					Войти
				</Link>
			</p>
		</main>
	);
};
