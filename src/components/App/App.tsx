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
	IngredientPage,
	ProfileOrdersPage,
	OrderItemPage
} from "../../pages";
import { AppHeader } from "../AppHeader/AppHeader";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import { Suspense, useEffect } from "react";
import { getUserThunk, reset } from "../../services/reducers/auth";
import { useLocation } from "react-router-dom";
import { getIngredientsThunk } from "../../services/reducers/ingredients";
import IngredientModal from "../IngredientModal/IngredientModal";
import OrderModal from "../OrderModal/OrderModal";
import { useAppDispatch } from "../..";

function App() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const background = location?.state?.background;

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		dispatch(getIngredientsThunk());

		if (accessToken) {
			dispatch(getUserThunk());
		}

		if (!accessToken && !refreshToken) {
			dispatch(reset());
		}
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<Suspense fallback={<>"Загрузка..."</>}>
				<Routes location={background || location}>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<NotFoundPage />} />

					<Route
						path="/login"
						element={<OnlyUnAuth children={<LoginPage />} />}
					/>
					<Route
						path="/register"
						element={<OnlyUnAuth children={<RegisterPage />} />}
					/>
					<Route
						path="/forgot-password"
						element={<OnlyUnAuth children={<ForgotPasswordPage />} />}
					/>
					<Route
						path="/reset-password"
						element={<OnlyUnAuth children={<ResetPasswordPage />} />}
					/>

					<Route
						path="/profile"
						element={<OnlyAuth children={<ProfilePage />} />}
					/>
					<Route
						path="profile/orders/:number"
						element={<OnlyAuth children={<OrderItemPage />} />}
					/>
					<Route path="/feed" element={<FeedOrdersPage />} />
					<Route path="feed/:number" element={<OrderItemPage />} />
					<Route path="/ingredients/:id" element={<IngredientPage />} />
					<Route
						path="profile/orders"
						element={<OnlyAuth children={<ProfileOrdersPage />} />}
					/>
				</Routes>
			</Suspense>
			{background && (
				<Routes>
					<Route path="/ingredients/:id" element={<IngredientModal />} />
					<Route path="/feed/:number" element={<OrderModal />} />
					<Route path="/profile/orders/:number" element={<OrderModal />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
