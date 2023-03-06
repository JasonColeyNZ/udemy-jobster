import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppDispatch, useAppSelector } from "../../store";
import { toast } from "react-toastify";
import {
	handleChange,
	clearValues,
	createJob,
	editJob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
	const {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId,
	} = useAppSelector((store) => store.job);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((store) => store.user);

	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: "jobLocation", value: user.location }));
		}
	}, []);

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			toast.error("Please fill out all fields");
			return;
		}
		if (isEditing)
			dispatch(
				editJob({
					id: editJobId,
					position,
					company,
					jobLocation,
					jobType,
					status,
				})
			);
		else
			dispatch(createJob({ position, company, jobLocation, jobType, status }));
	};

	const handleJobInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	return (
		<Wrapper>
			<form className="form" onSubmit={handleSubmit}>
				<h3>{isEditing ? "edit job" : "add job"}</h3>
				<div className="form-center">
					{/* position */}
					<FormRow
						type="text"
						name="position"
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type="text"
						name="company"
						value={company}
						handleChange={handleJobInput}
					/>
					{/* jobLocation */}
					<FormRow
						type="text"
						labelText="job location"
						name="jobLocation"
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* status */}
					<FormRowSelect
						name="status"
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					{/* jobType */}
					<FormRowSelect
						name="jobType"
						labelText="job type"
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className="btn-container">
						<button
							className="btn btn-block clear-btn"
							type="button"
							onClick={() => dispatch(clearValues())}
						>
							clear
						</button>
						<button className="btn btn-block" type="submit">
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default AddJob;
