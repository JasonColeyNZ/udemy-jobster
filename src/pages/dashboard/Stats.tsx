import { useEffect } from "react";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { ChartsContainer, StatsContainer, Loading } from "../../components";

const Stats = () => {
	const { isLoading, monthlyApplications } = useAppSelector(
		(store) => store.allJobs
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(showStats());
	}, []);

	if (isLoading) {
		return <Loading center />;
	}

	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	);
};
export default Stats;
