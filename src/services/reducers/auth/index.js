import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	sendLogin,
	getUser,
	sendLogout,
	patchUser,
	sendUserRegistration,
	sendPasswordReset,
	sendNewPasswordReset
} from "../../api";

const initialState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: null,
	accessToken: null
};

export const logoutThunk = createAsyncThunk("logout", async () => {
	const response = (await sendLogout()) || {};
	return response;
});

export const loginThunk = createAsyncThunk(
	"login",
	async ({ email, password }) => {
		const response = (await sendLogin(email, password)) || {};
		return response;
	}
);

export const userRegistrationThunk = createAsyncThunk(
	"registerUser",
	async ({ name, email, password }) => {
		const response =
			(await sendUserRegistration(name, email, password)) || {};
		return response;
	}
);

export const patchUserThunk = createAsyncThunk(
	"patchUser",
	async ({ name, email, password }) => {
		const response = (await patchUser(name, email, password)) || {};
		return response;
	}
);

export const sendPasswordResetThunk = createAsyncThunk(
	"sendPasswordReset",
	async ({ email }) => {
		const response = (await sendPasswordReset(email)) || {};
		return response;
	}
);

export const sendNewPasswordResetThunk = createAsyncThunk(
	"sendNewPasswordReset",
	async ({ newPassword, token }) => {
		const response = (await sendNewPasswordReset(newPassword, token)) || {};
		return response;
	}
);

export const getUserThunk = createAsyncThunk("auth/user", async () => {
	const response = (await getUser()) || {};
	return response;
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers(builder) {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.accessToken = action.payload.accessToken;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				state.error = null;
				localStorage.setItem("accessToken", action.payload.accessToken);
				localStorage.setItem("refreshToken", action.payload.refreshToken);
			})
			.addCase(getUserThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserThunk.rejected, (state, action) => {
				state.loading = false;
				state.isAuthChecked = true;
				state.error = action.error.message;
			})
			.addCase(getUserThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				state.error = null;
			})
			.addCase(logoutThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutThunk.rejected, (state, action) => {
				state.loading = false;
				state.isAuthChecked = true;
				state.error = action.error.message;
			})
			.addCase(logoutThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = null;
				state.isAuthChecked = true;
				state.error = null;
				localStorage.clear();
			})
			.addCase(patchUserThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(patchUserThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(patchUserThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(userRegistrationThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(userRegistrationThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(userRegistrationThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.accessToken = action.payload.accessToken;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				state.error = null;
				localStorage.setItem("accessToken", action.payload.accessToken);
				localStorage.setItem("refreshToken", action.payload.refreshToken);
			})
			.addCase(sendPasswordResetThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendPasswordResetThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(sendPasswordResetThunk.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(sendNewPasswordResetThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendNewPasswordResetThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(sendNewPasswordResetThunk.fulfilled, (state, action) => {
				state.loading = false;
			});
	}
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
