import { useState, FormEvent, ChangeEvent, FC } from "react";
import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegistrationThunk } from "../../services/reducers/auth";
import styles from "./RegisterPage.module.css";

export const RegisterPage: FC = () => {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
	const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await dispatch(userRegistrationThunk({ name, email, password }));
			navigate("/", { replace: true });
		} catch (error) {
			console.error("Ошибка регистрации пользователя:", error);
		}
	};

	return (
		<main className={styles.main}>
			<h1 className="text text_type_main-medium">Регистрация</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
					value={name}
					name={"name"}
					error={false}
					errorText={"Ошибка. Введите имя"}
					size={"default"}
					extraClass={`ml-1 ${isNameFocused ? styles.focused : ""}`}
					onFocus={() => setIsNameFocused(true)}
					onBlur={() => setIsNameFocused(false)}
					autoComplete={"name"}
				/>
				<Input
					type={"email"}
					placeholder="E-mail"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка. Введите существующий email"}
					size={"default"}
					extraClass={`ml-1 ${isEmailFocused ? styles.focused : ""}`}
					onFocus={() => setIsEmailFocused(true)}
					onBlur={() => setIsEmailFocused(false)}
					autoComplete={"email"}
				/>
				<Input
					type={showPassword ? "text" : "password"}
					placeholder={"Пароль"}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
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
					autoComplete={"new-password"}
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
