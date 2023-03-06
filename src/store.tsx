import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useDispatch } from "react-redux";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export const store: ToolkitStore = configureStore({
	reducer: {
		user: userSlice,
		job: jobSlice,
		allJobs: allJobsSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();
