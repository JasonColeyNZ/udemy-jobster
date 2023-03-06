import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllJobsSliceState } from "../../types/allJobs";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";
import { toast } from "react-toastify";

const initialFilterState = {
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
	isLoading: true,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: { declined: 0, interview: 0, pending: 0 },
	monthlyApplications: [],
	...initialFilterState,
} as AllJobsSliceState;

const allJobsSlice = createSlice({
	name: "allJobs",
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFilterState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJobs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllJobs.fulfilled, (state, { payload }) => {
				const { jobs, numOfPages, totalJobs } = payload;
				state.isLoading = false;
				state.totalJobs = totalJobs;
				state.numOfPages = numOfPages;
				state.jobs = jobs;
			})
			.addCase(getAllJobs.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(showStats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showStats.fulfilled, (state, { payload }) => {
				const { defaultStats, monthlyApplications } = payload;
				state.isLoading = false;

				state.stats = defaultStats;
				state.monthlyApplications = monthlyApplications;
			})
			.addCase(showStats.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			});
	},
});

/* Actions */

export const getAllJobs = createAsyncThunk(
	"allJobs/getJobs",
	async (_, thunkAPI) => {
		return await getAllJobsThunk("/jobs", thunkAPI);
	}
);

export const showStats = createAsyncThunk(
	"allJobs/showStats",
	async (_, thunkAPI) => {
		return await showStatsThunk("/jobs/stats", thunkAPI);
	}
);

export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilters,
	changePage,
	clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
