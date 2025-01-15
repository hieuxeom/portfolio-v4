import { BrowserRouter, Route, Routes } from "react-router";

import ClientLayout from "../../components/layout/client-layout";
import Introduce from "../../pages/introduce";

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
			</Route>
		</Routes>
	</BrowserRouter>
);

IndexRouter.defaultProps = {};

export default IndexRouter;
