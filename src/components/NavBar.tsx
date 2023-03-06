import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { Logo } from "../components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { toggleSidebar, clearStore } from "../features/user/userSlice";

const NavBar = () => {
	const { user } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const [showLogout, setShowLogout] = useState(false);

	const toggle = () => {
		dispatch(toggleSidebar());
	};

	return (
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" onClick={toggle}>
					<FaAlignLeft />
				</button>

				<div>
					<Logo />
					<h3 className="logo-text">dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					{showLogout && (
						<div className="dropdown show-dropdown">
							<button
								type="button"
								className="dropdown-btn"
								onClick={() => dispatch(clearStore("Logging out ..."))}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</Wrapper>
	);
};
export default NavBar;
