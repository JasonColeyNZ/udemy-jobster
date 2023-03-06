import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
	const { user } = useAppSelector((store) => store.user);
	if (!user) return <Navigate to="/landing" />;

	return children;
};
export default ProtectedRoute;
