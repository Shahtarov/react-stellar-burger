import api from "./axiosInstance";

export const sendPasswordReset = (email) =>
	api.post(`/password-reset`, {
		email: email
	});

export const sendNewPasswordReset = (newPassword, token) =>
	api.post(`/password-reset/reset`, {
		password: newPassword,
		token: token
	});

export const sendLogin = (email, password) =>
	api.post(`/auth/login`, {
		email: email,
		password: password
	});

export const sendUserRegistration = (name, email, password) =>
	api.post(`/auth/register`, {
		email: email,
		password: password,
		name: name
	});

export const getUser = async () => {
	return await api.get(`/auth/user`, {
		headers: {
			authorization: `${localStorage.getItem("accessToken")}`
		}
	});
};

export const patchUser = async (name, email, password) => {
	return await api.patch(
		`/auth/user`,
		{
			name: name,
			email: email,
			password: password
		},
		{
			headers: {
				authorization: `${localStorage.getItem("accessToken")}`
			}
		}
	);
};

export const getValidToken = async (refreshToken) => {
	return await api.post(`/auth/token`, {
		token: refreshToken
	});
};

export const sendLogout = async () => {
	return await api.post(`/auth/logout`, {
		token: localStorage.getItem("refreshToken")
	});
};

export const getIngredients = async () => {
	return await api.get(`/ingredients`);
};

export const sendOrderIngredients = (ingredientsIds) =>
	api.post(`/orders`, {
		ingredients: ingredientsIds
	});

export const getAllOrders = () => {
	return api.get("/orders/all");
};

export const getOrderFeedDetails = (orderNumber) => {
	return api.get(`/orders/${orderNumber}`);
};
