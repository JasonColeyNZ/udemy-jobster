import { Job } from "./job";

interface Stats {
	pending: number;
	interview: number;
	declined: number;
}

interface MonthApplications {
	date: Date;
	count: number;
}

interface AllJobsSliceState extends Record<string, any> {
	isLoading: boolean;
	jobs: Job[];
	totalJobs: number;
	numOfPages: number;
	page: number;
	stats: Stats;
	monthlyApplications: MonthApplications[];
}

type AllJobsResponse = {
	jobs: Job[];
	numOfPages: number;
	totalJobs: number;
};

export {
	AllJobsSliceState,
	AllJobsResponse,
	AllJobsRequest,
	MonthApplications,
};
