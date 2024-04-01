import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/IUser";
import {
	sendLogin,
	getUser,
	sendLogout,
	patchUser,
	sendUserRegistration,
	sendPasswordReset,
	sendNewPasswordReset
} from "../../api";

interface IAuthState {
	user: IUser | null;
	isAuthChecked: boolean;
	loading: boolean;
	error: string | null;
	accessToken: string | undefined;
}

const initialState: IAuthState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: null,
	accessToken: ""
};

export const logoutThunk = createAsyncThunk("logout", async () => {
	const { data } = (await sendLogout()) || {};
	return data;
});

interface LoginCredentials {
	email: string;
	password: string;
}

export const loginThunk = createAsyncThunk(
	"login",
	async ({ email, password }: LoginCredentials) => {
		const { data } = (await sendLogin(email, password)) || {};
		return data;
	}
);

interface RegistrationCredentials {
	name: string;
	email: string;
	password: string;
}

export const userRegistrationThunk = createAsyncThunk(
	"registerUser",
	async ({ name, email, password }: RegistrationCredentials) => {
		const { data } =
			(await sendUserRegistration(name, email, password)) || {};
		return data;
	}
);

interface PatchUserCredentials {
	name: string;
	email: string;
	password: string;
}

export const patchUserThunk = createAsyncThunk(
	"patchUser",
	async ({ name, email, password }: PatchUserCredentials) => {
		const { data } = (await patchUser(name, email, password)) || {};
		return data;
	}
);

export const sendPasswordResetThunk = createAsyncThunk(
	"sendPasswordReset",
	async ({ email }: { email: string }) => {
		const { data } = (await sendPasswordReset(email)) || {};
		return data;
	}
);

interface NewPasswordResetCredentials {
	newPassword: string;
	token: string;
}

export const sendNewPasswordResetThunk = createAsyncThunk(
	"sendNewPasswordReset",
	async ({ newPassword, token }: NewPasswordResetCredentials) => {
		const { data } = (await sendNewPasswordReset(newPassword, token)) || {};
		return data;
	}
);

export const getUserThunk = createAsyncThunk("auth/user", async () => {
	const { data } = (await getUser()) || {};
	return data;
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
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.accessToken = action.payload.accessToken;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				state.error = null;
				localStorage.setItem(
					"accessToken",
					action.payload.accessToken || ""
				);
				localStorage.setItem(
					"refreshToken",
					action.payload.refreshToken || ""
				);
			})
			.addCase(getUserThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserThunk.rejected, (state, action) => {
				state.loading = false;
				state.isAuthChecked = true;
				state.error = action.error?.message || "Unknown error";
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
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(logoutThunk.fulfilled, (state) => {
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
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(patchUserThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload?.user;
				state.error = null;
			})
			.addCase(userRegistrationThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(userRegistrationThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(userRegistrationThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.accessToken = action.payload.accessToken;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				state.error = null;
				localStorage.setItem(
					"accessToken",
					action.payload.accessToken || ""
				);
				localStorage.setItem(
					"refreshToken",
					action.payload.refreshToken || ""
				);
			})
			.addCase(sendPasswordResetThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendPasswordResetThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(sendPasswordResetThunk.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(sendNewPasswordResetThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendNewPasswordResetThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || "Unknown error";
			})
			.addCase(sendNewPasswordResetThunk.fulfilled, (state) => {
				state.loading = false;
			});
	}
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
