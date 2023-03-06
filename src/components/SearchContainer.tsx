import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";
import { useState, useMemo } from "react";

const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState("");
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useAppSelector((store) => store.allJobs);
	const { jobTypeOptions, statusOptions } = useAppSelector(
		(store) => store.job
	);
	const dispatch = useAppDispatch();

	const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch(handleChange({ name: e.target.name, value: e.target.value }));
	};

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		setLocalSearch("");
		dispatch(clearFilters());
	};

	const debounce = () => {
		let timeoutId: any;
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				dispatch(handleChange({ name: e.target.name, value: e.target.value }));
			}, 1000);
		};
	};
	const optimizedDebounce = useMemo(() => debounce(), []);
	return (
		<Wrapper>
			<form className="form">
				<h4>search form</h4>
				<div className="form-center">
					{/* search position */}
					<FormRow
						type="text"
						name="search"
						value={localSearch}
						handleChange={optimizedDebounce}
					/>
					<FormRowSelect
						labelText="status"
						name="searchStatus"
						value={searchStatus}
						handleChange={handleSearch}
						list={["all", ...statusOptions]}
					/>
					<FormRowSelect
						labelText="type"
						name="searchType"
						value={searchType}
						handleChange={handleSearch}
						list={["all", ...jobTypeOptions]}
					/>
					<FormRowSelect
						name="sort"
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className="btn btn-block btn-danger"
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default SearchContainer;
