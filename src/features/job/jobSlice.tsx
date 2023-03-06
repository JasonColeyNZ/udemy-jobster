import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobSliceState } from "../../types/job";
import { HandleChangePayload } from "../../types/job";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";
import { Job } from "../../types/job";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
	isLoading: false,
	position: "",
	company: "",
	jobLocation: "",
	jobTypeOptions: ["full time", "part-time", "remote", "internship"],
	jobType: "",
	statusOptions: ["interview", "declined", "pending"],
	status: "pending",
	isEditing: false,
	editJobId: "",
} as JobSliceState;

const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {
		handleChange: (state, action: PayloadAction<HandleChangePayload>) => {
			state[action.payload.name] = action.payload.value;
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || "",
			};
		},
		setEditJob: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createJob.fulfilled, (state) => {
				state.isLoading = false;
				clearValues();
				toast.success(`Job Created`);
			})
			.addCase(createJob.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(editJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editJob.fulfilled, (state) => {
				state.isLoading = false;
				toast.success(`Job Updated`);
			})
			.addCase(editJob.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (typeof payload === "string") toast.error(payload);
			})
			.addCase(deleteJob.rejected, (state, { payload }) => {
				if (typeof payload === "string") toast.error(payload);
			});
	},
});

/* Actions */

export const createJob = createAsyncThunk(
	"job/createJob",
	async (job: Job, thunkAPI) => {
		return await createJobThunk("/jobs", job, thunkAPI);
	}
);

export const editJob = createAsyncThunk(
	"job/editJob",
	async (job: Job, thunkAPI) => {
		return await editJobThunk("/jobs/", job, thunkAPI);
	}
);

export const deleteJob = createAsyncThunk(
	"job/deleteJob",
	async (id: string, thunkAPI) => {
		return await deleteJobThunk("/jobs/", id, thunkAPI);
	}
);

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
