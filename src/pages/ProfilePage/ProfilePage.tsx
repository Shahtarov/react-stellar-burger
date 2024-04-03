import {
	Input,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfilePage.module.css";
import {
	useState,
	useEffect,
	FC,
	ChangeEvent,
	FormEvent,
	MouseEvent
} from "react";
import { patchUserThunk } from "../../services/reducers/auth";
import { ProfileNavigation } from "../../components/ProfileNavigation/ProfileNavigation";
import { RootState } from "../../services";
import { useAppDispatch, useAppSelector } from "../..";

export const ProfilePage: FC = () => {
	type TType = "email" | "password" | "name";
	const [showButton, setShowButton] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
		email: true,
		password: true,
		name: true
	});

	const user = useAppSelector((state: RootState) => state.authSlice.user);
	const [nameInput, setNameInput] = useState<string>(user?.name || "");
	const [emailInput, setEmailInput] = useState<string>(user?.email || "");
	const [passwordInput, setPasswordInput] = useState<string>("");
	const dispatch = useAppDispatch();

	const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
	const [typePassword, setTypePassword] = useState<"password" | "text">(
		"password"
	);
	const [passwordIcon, setPasswordIcon] = useState<
		"EditIcon" | "ShowIcon" | "HideIcon"
	>("EditIcon");

	const onIconClick = (e: MouseEvent, type: TType) => {
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

	const onSubmit = async (e: FormEvent) => {
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
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setNameInput(e.target.value)
					}
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
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmailInput(e.target.value)
					}
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
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPasswordInput(e.target.value)
					}
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
