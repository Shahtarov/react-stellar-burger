import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfilePage.module.css";
// import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import { logoutThunk, patchUserThunk } from "../../services/reducers/auth";
import { patchUserThunk } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ProfileNavigation } from "../../components/ProfileNavigation/ProfileNavigation";

export const ProfilePage = () => {
	const [showButton, setShowButton] = useState(false);
	const [isDisabled, setIsDisabled] = useState({
		email: true,
		password: true,
		name: true
	});

	const user = useSelector((store) => store.authSlice.user);
	const [nameInput, setNameInput] = useState(user?.name || "");
	const [emailInput, setEmailInput] = useState(user?.email || "");
	const [passwordInput, setPasswordInput] = useState("");
	const dispatch = useDispatch();

	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [typePassword, setTypePassword] = useState("password");
	const [passwordIcon, setPasswordIcon] = useState("EditIcon");

	const onIconClick = (e, type) => {
		e.preventDefault();
		e.stopPropagation();
		if (type === "password" && !!isPasswordFocus) {
			setTypePassword((prevState) =>
				prevState === "password" ? "text" : "password"
			);
		}
		setShowButton(true);
		setIsDisabled(() => ({ ...isDisabled, [type]: false }));
	};

	// const onLogout = async () => {
	// 	dispatch(logoutThunk());
	// };

	useEffect(() => {
		if (user) {
			setNameInput(user?.name);
			setEmailInput(user?.email);
			setPasswordInput("");
		}
	}, [user]);

	useEffect(() => {
		if (!isPasswordFocus) return setPasswordIcon("EditIcon");
		if (typePassword === "password") return setPasswordIcon("ShowIcon");
		setPasswordIcon("HideIcon");
	}, [isPasswordFocus, typePassword]);

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(
			patchUserThunk({
				name: nameInput,
				email: emailInput,
				password: passwordInput
			})
		);
		setShowButton(false);
		setIsDisabled(() => ({
			email: true,
			password: true,
			name: true
		}));
	};

	const resetFormValues = () => {
		setNameInput(user?.name || "");
		setEmailInput(user?.email || "");
		setPasswordInput("");
		setShowButton(false);
		setIsPasswordFocus(false);
		setIsDisabled({
			email: true,
			password: true,
			name: true
		});
	};

	return (
		<main className={styles.main}>
			<ProfileNavigation />
			{/* <nav className={styles.nav}>
				<ul className={styles.ul}>
					<li className={styles.li}>
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								isActive
									? `${styles.link} ${styles.linkActive}`
									: `${styles.link}`
							}
						>
							Профиль
						</NavLink>
					</li>

					<li className={styles.li}>
						<NavLink
							to="/profile/orders"
							className={({ isActive }) =>
								isActive
									? `${styles.link} ${styles.linkActive}`
									: `${styles.link}`
							}
						>
							История заказов
						</NavLink>
					</li>
					<li className={styles.li} onClick={onLogout}>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive
									? `${styles.link} ${styles.linkActive}`
									: `${styles.link}`
							}
						>
							Выход
						</NavLink>
					</li>
				</ul>
				<p className="text text_type_main-default text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav> */}
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={(e) => setNameInput(e.target.value)}
					value={nameInput}
					disabled={isDisabled["name"]}
					name={"name"}
					error={false}
					errorText={"Ошибка. Ведите имя"}
					onIconClick={(e) => onIconClick(e, "name")}
					size={"default"}
					extraClass="ml-1"
					icon={"EditIcon"}
					autoComplete={"name"}
				/>
				<Input
					type={"email"}
					placeholder="E-mail"
					onChange={(e) => setEmailInput(e.target.value)}
					value={emailInput}
					disabled={isDisabled["email"]}
					name={"email"}
					error={false}
					errorText={"Ошибка. Введите существущий email"}
					onIconClick={(e) => onIconClick(e, "email")}
					size={"default"}
					extraClass="ml-1"
					icon="EditIcon"
					autoComplete={"email"}
				/>
				<Input
					type={typePassword}
					placeholder={"Пароль"}
					onChange={(e) => setPasswordInput(e.target.value)}
					value={passwordInput}
					disabled={isDisabled["password"]}
					name={"password"}
					error={false}
					errorText={"Ошибка. Введите более сложный пароль"}
					onIconClick={(e) => onIconClick(e, "password")}
					size={"default"}
					extraClass="ml-1"
					autoComplete={"new-password"}
					icon={passwordIcon}
					onFocus={() => setIsPasswordFocus(true)}
				/>
				{showButton && (
					<div className={styles.buttonsEdit}>
						<Button
							type="primary"
							htmlType="reset"
							size="medium"
							onClick={resetFormValues}
						>
							Отменить
						</Button>
						<Button type="primary" htmlType="submit" size="medium">
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</main>
	);
};
