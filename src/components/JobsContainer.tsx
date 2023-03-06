import Wrapper from "../assets/wrappers/JobsContainer";
import { useEffect } from "react";
import { JobComponent, PageBtnContainer } from ".";
import { Job } from "../types/job";
import { AllJobsRequest } from "../types/allJobs";
import { useAppSelector, useAppDispatch } from "../store";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

const JobsContainer = () => {
	const {
		jobs,
		isLoading,
		page,
		totalJobs,
		numOfPages,
		search,
		searchStatus,
		searchType,
		sort,
	} = useAppSelector((store) => store.allJobs);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllJobs());
	}, [page, search, searchStatus, searchType, sort]);

	if (isLoading) {
		return <Loading center />;
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && "s"}
			</h5>
			<div className="jobs">
				{jobs.map((job: Job) => {
					return <JobComponent key={job.id} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};
export default JobsContainer;
