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
	FeedOrdersPage,
	IngredientPage
} from "../../pages";
import { AppHeader } from "../AppHeader/AppHeader";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserThunk, reset } from "../../services/reducers/auth";
import { useLocation } from "react-router-dom";
import { getIngredientsThunk } from "../../services/reducers/ingredients";
import IngredientModal from "../IngredientModal/IngredientModal";

function App() {
	const dispatch = useDispatch();
	const { state } = useLocation();

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		dispatch(getUserThunk());
		dispatch(getIngredientsThunk());

		if (!accessToken && !refreshToken) {
			dispatch(reset());
		}
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={state?.isOpenModal}>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
				<Route path="/feed" element={<FeedOrdersPage />} />
				<Route
					path="/feed/:id"
					element={<OnlyAuth component={<ProfilePage />} />}
				/>
				<Route
					path="/login"
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path="/register"
					element={<OnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path="/forgot-password"
					element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					path="/reset-password"
					element={<OnlyUnAuth component={<ResetPasswordPage />} />}
				/>
				<Route
					path="/profile"
					element={<OnlyAuth component={<ProfilePage />} />}
				/>

				<Route path="/ingredients/:id" element={<IngredientPage />} />
			</Routes>
			{state?.isOpenModal && (
				<Routes>
					<Route path="ingredients/:id" element={<IngredientModal />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
