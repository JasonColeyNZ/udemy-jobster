import { Job } from "../../types/job";
import customFetch, { checkForUnauthorisedResponse } from "../../utils/axios";
import { clearValues } from "../../features/job/jobSlice";
import { showLoading, getAllJobs } from "../allJobs/allJobsSlice";

export const createJobThunk = async (url: string, job: Job, thunkAPI: any) => {
	try {
		const response = await customFetch.post<void>(url, job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error) {
		return checkForUnauthorisedResponse(error, thunkAPI);
	}
};

export const editJobThunk = async (url: string, job: Job, thunkAPI: any) => {
	try {
		const response = await customFetch.patch<void>(`${url}${job.id}`, job);
		return response.data;
	} catch (error) {
		return checkForUnauthorisedResponse(error, thunkAPI);
	}
};

export const deleteJobThunk = async (
	url: string,
	jobId: string,
	thunkAPI: any
) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete<void>(`${url}${jobId}`);
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		return checkForUnauthorisedResponse(error, thunkAPI);
	}
};
