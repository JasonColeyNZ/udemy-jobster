import { LandingPage, RegisterPage, ErrorPage, ProtectedRoute } from "./pages";
import {
	Profile,
	AddJob,
	AllJobs,
	Stats,
	SharedLayout,
} from "./pages/dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />}></Route>
					<Route path="all-jobs" element={<AllJobs />}></Route>
					<Route path="add-job" element={<AddJob />}></Route>
					<Route path="profile" element={<Profile />}></Route>
				</Route>
				<Route path="landing" element={<LandingPage />}></Route>
				<Route path="/register" element={<RegisterPage />}></Route>
				<Route path="*" element={<ErrorPage />}></Route>
			</Routes>
			<ToastContainer position="top-center" />
		</BrowserRouter>
	);
}

export default App;
