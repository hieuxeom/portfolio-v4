import { Outlet } from "react-router";
import Header from "../../partials/header";
import Wrapper from "../../wrapper";
import Sidebar from "../../partials/sidebar";

// interface ClientLayoutProps {}

const ClientLayout = () => {
	return (
		<div className={"relative"}>
			<Header />
			<div className={"relative lg:mt-44 mt-32 min-h-[150vh] h-max bg-white flex justify-center xl:px-0 lg:px-8"}>
				<Wrapper
					centerX
					size={"7xl"}
					className={"2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl"}
				>
					<Sidebar />
					<Outlet />
				</Wrapper>
			</div>
		</div>
	);
};

export default ClientLayout;
