import { Outlet } from "react-router";
import Header from "../../partials/header";
import Wrapper from "../../wrapper";
import Sidebar from "../../partials/sidebar";

interface ClientLayoutProps {}

const ClientLayout = (props: ClientLayoutProps) => {
	return (
		<div className={"relative"}>
			<Header />
			<div className={"mt-44 w-screen min-h-[150vh] h-max bg-white flex justify-center"}>
				<Wrapper
					centerX
					size={"7xl"}
				>
					<Sidebar />
					<Outlet />
				</Wrapper>
			</div>
		</div>
	);
};

export default ClientLayout;
