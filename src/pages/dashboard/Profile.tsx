import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
	const { isLoading, user } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState({
		name: user?.name,
		email: user?.email,
		lastName: user?.lastName,
		location: user?.location,
	});

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		if (
			!userData.name ||
			!userData.email ||
			!userData.lastName ||
			!userData.location
		) {
			toast.error("Please Fill Out All Fields");
			return;
		}
		dispatch(updateUser(userData));
	};

	return (
		<Wrapper>
			<form className="form" onSubmit={handleSubmit}>
				<h3>profile</h3>
				<div className="form-center">
					<FormRow
						type="text"
						name="name"
						value={userData.name}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="lastName"
						labelText="last name"
						value={userData.lastName}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="email"
						value={userData.email}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="location"
						value={userData.location}
						handleChange={handleChange}
					/>
					<button className="btn btn-block" type="submit" disabled={isLoading}>
						{isLoading ? "Please Wait..." : "save changes"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Profile;
