import axios from "axios";
import customFetch, { checkForUnauthorisedResponse } from "../../utils/axios";
import { logOutUser } from "../user/userSlice";

export const getAllJobsThunk = async (url: string, thunkAPI: any) => {
	try {
		const { page, search, searchStatus, searchType, sort } =
			thunkAPI.getState().allJobs;

		url = `${url}?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

		if (search) {
			url = url + `&search=${search}`;
		}

		const response = await customFetch.get(url);

		const responseData = JSON.parse(
			JSON.stringify(response.data),
			function (prop, value) {
				switch (prop) {
					case "_id":
						this.id = value;
						return;
					default:
						return value;
				}
			}
		);
		return responseData;
	} catch (error) {
		return checkForUnauthorisedResponse(error, thunkAPI);
	}
};

export const showStatsThunk = async (url: string, thunkAPI: any) => {
	try {
		const response = await customFetch.get(url);

		return response.data;
	} catch (error) {
		return checkForUnauthorisedResponse(error, thunkAPI);
	}
};
