import { BrowserRouter, Route, Routes } from "react-router";
import App from "../../App";

interface IndexRouterProps {}

const IndexRouter = (props: IndexRouterProps) => (
	<BrowserRouter>
		<Routes>
			<Route
				path={"/"}
				element={<App />}
			/>
		</Routes>
	</BrowserRouter>
);

IndexRouter.defaultProps = {};

export default IndexRouter;
