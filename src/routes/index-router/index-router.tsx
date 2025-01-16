import { BrowserRouter, Route, Routes } from "react-router";

import ClientLayout from "../../components/layout/client-layout";
import Introduce from "../../pages/introduce";
import AdminLayout from "../../components/layout/admin-layout";
import Dashboard from "../../pages/admin/dashboard";
import Account from "../../pages/admin/account";
import Education from "../../pages/admin/education";
import Certification from "../../pages/admin/certification";
import Employment from "../../pages/admin/employment";
import Project from "../../pages/admin/project";
import NewEducation from "../../pages/admin/education/new-education";
import NewCertification from "../../pages/admin/certification/new-certification";
import NewEmployment from "../../pages/admin/employment/new-employment";

interface IndexRouterProps {}

const IndexRouter = (props: IndexRouterProps) => (
	<BrowserRouter>
		<Routes>
			<Route
				path={"/"}
				element={<ClientLayout />}
			>
				<Route
					index
					element={<Introduce />}
				/>
				<Route
					path={"live-score"}
					element={<Introduce />}
				/>
			</Route>
			<Route
				path={"/admin"}
				element={<AdminLayout />}
			>
				<Route
					path={"dashboard"}
					element={<Dashboard />}
				/>
				<Route
					path={"accounts"}
					element={<Account />}
				/>
				<Route path={"education"}>
					<Route
						index
						element={<Education />}
					/>
					<Route
						path={"new"}
						element={<NewEducation />}
					/>
				</Route>
				<Route path={"certification"}>
					<Route
						index
						element={<Certification />}
					/>
					<Route
						path={"new"}
						element={<NewCertification />}
					/>
				</Route>
				<Route path={"employment"}>
					<Route
						index
						element={<Employment />}
					/>
					<Route
						path={"new"}
						element={<NewEmployment />}
					/>
				</Route>
				<Route
					path={"projects"}
					element={<Project />}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
);

IndexRouter.defaultProps = {};

export default IndexRouter;
