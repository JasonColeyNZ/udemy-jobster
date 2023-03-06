import axios from "axios";
import {
	LoginUserParams,
	RegisterUserParams,
	UpdateUserParams,
} from "../../types/user";
import customFetch from "../../utils/axios";
import { logOutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const clearStoreThunk = async (message: string, thunkAPI: any) => {
	try {
		// logout user
		thunkAPI.dispatch(logOutUser(message));
		// clear jobs value
		thunkAPI.dispatch(clearAllJobsState());
		// clear job input values
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};

export const registerUserThunk = async (
	url: string,
	user: RegisterUserParams,
	thunkAPI: any
) => {
	try {
		const { data, status } = await customFetch.post(url, user);
		if (status === 201) return data;
		return null;
	} catch (error) {
		if (axios.isAxiosError(error))
			return thunkAPI.rejectWithValue(error.response?.data.msg);
	}
};

export const loginUserThunk = async (
	url: string,
	user: LoginUserParams,
	thunkAPI: any
) => {
	try {
		const { data, status } = await customFetch.post(url, user);
		if (status === 200) return data;
		return null;
	} catch (error) {
		if (axios.isAxiosError(error))
			return thunkAPI.rejectWithValue(error.response?.data.msg);
	}
};

export const updateUserThunk = async (
	url: string,
	user: UpdateUserParams,
	thunkAPI: any
) => {
	try {
		const { data, status } = await customFetch.patch(url, user);
		if (status === 200) return data.user;
		return null;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				thunkAPI.dispatch(logOutUser(null));
				return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
			}

			return thunkAPI.rejectWithValue(error.response?.data.msg);
		}
	}
};
