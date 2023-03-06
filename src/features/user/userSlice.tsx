import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { User } from "../../utils/types";
import {
	getUserFromLocalStorage,
	addUserToLocalStorage,
	removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
	UserSliceState,
	LoginUserParams,
	RegisterUserParams,
	UpdateUserParams,
} from "../../types/user";
import {
	loginUserThunk,
	registerUserThunk,
	updateUserThunk,
	clearStoreThunk,
} from "./userThunk";

/* CreateSlice */

const initialState = {
	isLoading: false,
	user: getUserFromLocalStorage(),
} as UserSliceState;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		logOutUser: (state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload !== null) toast.success(payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`Hello There ${user.name}`);
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`Welcome Back ${user.name}`);
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				const user: User = payload;
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`User updated ${user.name}`);
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(clearStore.rejected, () => {
				toast.error("There was an error");
			});
	},
});

/* functions */
const clearStore = createAsyncThunk(
	"user/clearStore",
	async (message: string, thunkAPI) => {
		return await clearStoreThunk(message, thunkAPI);
	}
);

const registerUser = createAsyncThunk(
	"user/registerUser",
	async (user: RegisterUserParams, thunkAPI) => {
		return await registerUserThunk("auth/register", user, thunkAPI);
	}
);

const loginUser = createAsyncThunk(
	"user/loginUser",
	async (user: LoginUserParams, thunkAPI) => {
		return await loginUserThunk("auth/login", user, thunkAPI);
	}
);

const updateUser = createAsyncThunk<
	User,
	UpdateUserParams,
	{ state: UserSliceState }
>("user/updateUser", async (user: UpdateUserParams, thunkAPI) => {
	return updateUserThunk("/auth/updateUser", user, thunkAPI);
});

export const { toggleSidebar, logOutUser } = userSlice.actions;
export { loginUser, registerUser, updateUser, clearStore };

export default userSlice.reducer;
