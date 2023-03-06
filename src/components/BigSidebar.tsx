import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppSelector } from "../store";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
	const { isSidebarOpen } = useAppSelector((store) => store.user);

	return (
		<Wrapper>
			<div
				className={
					isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
				}
			>
				<div className="content">
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};
export default BigSidebar;
