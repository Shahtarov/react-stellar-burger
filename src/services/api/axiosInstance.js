import axios from "axios";

const BURGER_API = `https://norma.nomoreparties.space/api`;

const options = {
	baseURL: BURGER_API,
	timeout: 30000
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
	(response) => response.data,
	(error) => {
		const { response, config } = error;
		const originalRequest = error.config;
		if (
			(response.status === 403 || response.status === 401) &&
			response.data.message === "jwt expired" &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;
			const refreshToken = localStorage.getItem("refreshToken");
			const body = {
				token: refreshToken
			};
			return axios
				.post("/auth/token", body, options)
				.then((response) => {
					localStorage.setItem("accessToken", response.data.accessToken);
					localStorage.setItem("refreshToken", response.data.refreshToken);
					return axiosInstance(config);
				})
				.catch((err) => {
					if (err.response.data.message === "Token is invalid") {
						localStorage.removeItem("refreshToken");
						localStorage.removeItem("accessToken");
					}
					return Promise.reject(response.data.message);
				});
		}
		return Promise.reject(response.data.message);
	}
);

export default axiosInstance;
