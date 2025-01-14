import { Outlet } from "react-router";
import Header from "../../partials/header";
import Wrapper from "../../wrapper";
import Sidebar from "../../partials/sidebar";

interface ClientLayoutProps {}

const ClientLayout = (props: ClientLayoutProps) => {
	return (
		<div className={"relative"}>
			<Header />
			<div className={"w-screen min-h-screen h-max bg-light flex justify-center"}>
				<Wrapper
					centerX
					centerY
					orientation={"vertical"}
					size={"7xl"}
				>
					<div className="w-full grid grid-cols-12">
						<div className={"w-full col-span-2"}>
							<Sidebar />
						</div>
						<div className={"w-full col-span-10"}>
							<Outlet />
						</div>
					</div>
				</Wrapper>
			</div>
		</div>
	);
};

ClientLayout.defaultProps = {};

export default ClientLayout;
