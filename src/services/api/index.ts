import { AxiosResponse } from "axios";
import api from "./axiosInstance";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseUser } from "../../interfaces/IResponseUser";
import { IOrderDetails } from "../../interfaces/IOrderDetails";
import { TOrdersFeed } from "../../interfaces/IOrderFeed";
import { IIngredient } from "../../interfaces/IIngredient";

export const sendPasswordReset = (
	email: string
): Promise<AxiosResponse<IResponseMessage>> =>
	api.post(`/password-reset`, {
		email: email
	});

export const sendNewPasswordReset = (
	newPassword: string,
	token: string
): Promise<AxiosResponse<IResponseMessage>> =>
	api.post(`/password-reset/reset`, {
		password: newPassword,
		token: token
	});

export const sendLogin = (
	email: string,
	password: string
): Promise<AxiosResponse<IResponseUser>> =>
	api.post(`/auth/login`, {
		email: email,
		password: password
	});

export const sendLogout = async (): Promise<
	AxiosResponse<IResponseMessage>
> => {
	return await api.post(`/auth/logout`, {
		token: localStorage.getItem("refreshToken")
	});
};

export const sendUserRegistration = (
	name: string,
	email: string,
	password: string
): Promise<AxiosResponse<IResponseUser>> =>
	api.post(`/auth/register`, {
		email: email,
		password: password,
		name: name
	});

export const getUser = async (): Promise<AxiosResponse<IResponseUser>> => {
	return await api.get(`/auth/user`, {
		headers: {
			authorization: `${localStorage.getItem("accessToken")}`
		}
	});
};

export const patchUser = async (
	name: string,
	email: string,
	password: string
): Promise<AxiosResponse<IResponseUser>> => {
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

export const getValidToken = async (
	refreshToken: string
): Promise<AxiosResponse<string>> => {
	return await api.post(`/auth/token`, {
		token: refreshToken
	});
};

export const getIngredients = async (): Promise<
	AxiosResponse<{ data: IIngredient[]; success: boolean }>
> => {
	return await api.get(`/ingredients`);
};

export const sendOrderIngredients = async (
	ingredientsIds: string[]
): Promise<AxiosResponse<IOrderDetails>> => {
	return await api.post(
		`/orders`,
		{
			ingredients: ingredientsIds
		},
		{
			headers: {
				authorization: `${localStorage.getItem("accessToken")}`
			}
		}
	);
};

export const getAllOrders = (): Promise<AxiosResponse<TOrdersFeed>> => {
	return api.get("/orders/all");
};

export const getOrderFeedDetails = (
	orderNumber: string
): Promise<AxiosResponse<TOrdersFeed>> => {
	return api.get(`/orders/${orderNumber}`);
};
