import { useEffect } from "react";
import { SearchContainer, JobsContainer } from "../../components";
import { clearValues } from "../../features/job/jobSlice";
import { useAppDispatch } from "../../store";

const AllJobs = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(clearValues());
	}, []);

	return (
		<>
			<SearchContainer />
			<JobsContainer />
		</>
	);
};
export default AllJobs;
