import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
	return (
		<div className="nav-links">
			{links.map((link) => {
				const { text, path, id, icon } = link;
				return (
					<NavLink
						key={id}
						to={path}
						className={({ isActive }) => {
							return isActive ? "nav-link active" : "nav-link";
						}}
						end
					>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
export default NavLinks;
