import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { toggleSidebar } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../store";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
	const { isSidebarOpen } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();

	const toggle = () => {
		dispatch(toggleSidebar());
	};
	return (
		<Wrapper>
			{isSidebarOpen && (
				<div className="sidebar-container show-sidebar">
					<div className="content">
						<button className="close-btn" onClick={toggle}>
							<FaTimes />
						</button>
						<header>
							<Logo />
						</header>
						<NavLinks />
					</div>
				</div>
			)}
		</Wrapper>
	);
};
export default SmallSidebar;
