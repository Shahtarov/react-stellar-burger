import styles from "./ProfileNavigation.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { logoutThunk } from "../../services/reducers/auth";
import { FC } from "react";
import { useAppDispatch } from "../..";

export const ProfileNavigation: FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const onLogout = async () => {
		dispatch(logoutThunk());
	};

	return (
		<nav className={styles.nav}>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							isActive && location.pathname !== "/profile/orders"
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
		</nav>
	);
};
