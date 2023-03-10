import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";

type LoginState = {
	name: string;
	email: string;
	password: string;
	isMember: boolean;
};

const initialState: LoginState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

function Register() {
	const [values, setValues] = useState<LoginState>(initialState);
	const { user, isLoading } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [name]: value });
	};
	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			toast.error("Please Fill Out All Fields");
			return;
		}

		if (isMember) {
			dispatch(loginUser({ email, password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [user]);

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"}</h3>
				{/* name field */}
				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				{/* email field */}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
				/>
				<button type="submit" className="btn btn-block" disabled={isLoading}>
					{isLoading ? "loading..." : "submit"}
				</button>
				<button
					type="button"
					className="btn btn-block btn-hipster"
					disabled={isLoading}
					onClick={() => {
						dispatch(
							loginUser({ email: "testUser@test.com", password: "secret" })
						);
					}}
				>
					{isLoading ? "loading..." : "demo app"}
				</button>
				<p>
					{values.isMember ? "Not a member yet?" : "Already a member?"}
					<button type="button" className="member-btn" onClick={toggleMember}>
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
}
export default Register;
