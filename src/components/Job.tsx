import { FunctionComponent } from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { Job } from "../types/job";
import JobInfo from "./JobInfo";
import moment from "moment";
import { deleteJob, setEditJob } from "../features/job/jobSlice";

const JobComponent: FunctionComponent<Job> = ({
	id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	status,
}) => {
	const dispatch = useAppDispatch();

	return (
		<Wrapper>
			<header>
				<div className="main-icon">{company.charAt(0)}</div>
				<div className="info">
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo text={jobLocation} icon={<FaLocationArrow />} />
					<JobInfo
						text={moment(createdAt).format("MMM Do, YYYY")}
						icon={<FaCalendarAlt />}
					/>
					<JobInfo text={jobType} icon={<FaBriefcase />} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className="actions">
						<Link
							to="/add-job"
							className="btn edit-btn"
							onClick={() => {
								dispatch(
									setEditJob({
										editJobId: id,
										position,
										company,
										jobLocation,
										jobType,
										status,
									})
								);
							}}
						>
							Edit
						</Link>
						<button
							type="button"
							className="btn delete-btn"
							onClick={() => {
								if (id) dispatch(deleteJob(id));
							}}
						>
							delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};
export default JobComponent;
