import styles from "./App.module.css";

import { Routes, Route } from "react-router-dom";
import {
	HomePage,
	NotFoundPage,
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ProfilePage,
	FeedOrdersPage
} from "../../pages";
import { AppHeader } from "../AppHeader/AppHeader";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserThunk, reset } from "../../services/reducers/auth";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		dispatch(getUserThunk());

		if (!accessToken && !refreshToken) {
			dispatch(reset());
		}
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route exact path="*" element={<NotFoundPage />} />
				<Route exact path="/feed" element={<FeedOrdersPage />} />
				{/* <Route
					path="/feed"
					element={<OnlyAuth component={<ProfilePage />} />}
				/> */}
				<Route
					exact
					path="/feed/:id"
					element={<OnlyAuth component={<ProfilePage />} />}
				/>
				<Route
					exact
					path="/login"
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					exact
					path="/register"
					element={<OnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path="/forgot-password"
					element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					exact
					path="/reset-password"
					element={<OnlyUnAuth component={<ResetPasswordPage />} />}
				/>
				<Route
					exact
					path="/profile"
					element={<OnlyAuth component={<ProfilePage />} />}
				/>

				{/* <Route path="/ingredients/:id" element={<IngredientPage />} /> */}
			</Routes>
		</div>
	);
}
// 	/login — страница авторизации.

// /register — страница регистрации.

// /forgot-password — страница восстановления пароля.

// /reset-password — страница сброса пароля.

// /profile — страница с настройками профиля пользователя.

// /ingredients/:id — страница ингредиента.

export default App;
