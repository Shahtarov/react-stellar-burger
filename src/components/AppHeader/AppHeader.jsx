import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`pb-4 pt-4`}>
				<ul className={styles.ul}>
					<li className={`${styles.item} m-5`}>
						<BurgerIcon type="secondary" />
						<p
							className={`text text_type_main-default text_color_inactive ml-2`}
						>
							Конструктор
						</p>
					</li>

					<li className={`${styles.item} m-5`}>
						<ListIcon type="secondary" />
						<p
							className={`text text_type_main-default text_color_inactive ml-2`}
						>
							Лента заказов
						</p>
					</li>
				</ul>
			</nav>

			<Logo />

			<div className={`${styles.item} m-5`}>
				<ProfileIcon type="secondary" />
				<p
					className={`text text_type_main-default text_color_inactive ml-2`}
				>
					Личный кабинет
				</p>
			</div>
		</header>
	);
};

export default AppHeader;
