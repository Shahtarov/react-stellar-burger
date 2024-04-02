import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../services";
import { useAppSelector } from "../..";

export const AppHeader = () => {
	const { pathname } = useLocation();
	const [link, setLink] = useState<string>(pathname);

	const user = useAppSelector((state: RootState) => state.authSlice.user);
	const isActiveProfile =
		link === "/profile" || link === "/profile/orders" || link === "/login";

	useEffect(() => {
		setLink(pathname);
	}, [pathname]);

	return (
		<header className={styles.header}>
			<nav className={`pb-4 pt-4`}>
				<ul className={styles.ul}>
					<li>
						<NavLink to={"/"} className={`${styles.item} m-5`}>
							<BurgerIcon
								type={link === "/" ? "primary" : "secondary"}
							/>
							<p
								className={
									link === "/"
										? `text text_type_main-default ml-2 ${styles.textColor}`
										: `text text_type_main-default text_color_inactive ml-2`
								}
							>
								Конструктор
							</p>
						</NavLink>
					</li>

					<li>
						<NavLink to={"/feed"} className={`${styles.item} m-5`}>
							<ListIcon
								type={link === "/feed" ? "primary" : "secondary"}
							/>
							<p
								className={
									link === "/feed"
										? `text text_type_main-default ml-2 ${styles.textColor}`
										: `text text_type_main-default text_color_inactive ml-2`
								}
							>
								Лента заказов
							</p>
						</NavLink>
					</li>
				</ul>
			</nav>

			<Link to={"/"}>
				<Logo />
			</Link>

			<div>
				<NavLink to={"/profile"} className={`${styles.item} m-5`}>
					<ProfileIcon type={isActiveProfile ? "primary" : "secondary"} />
					<p
						className={
							isActiveProfile
								? `text text_type_main-default ml-2 ${styles.textColor}`
								: `text text_type_main-default text_color_inactive ml-2`
						}
					>
						{user ? "Личный кабинет" : "Войти"}
					</p>
				</NavLink>
			</div>
		</header>
	);
};
