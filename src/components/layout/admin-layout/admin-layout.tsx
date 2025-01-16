import { Outlet } from "react-router";
import AdminSidebar from "../../admin/admin-sidebar";
import Wrapper from "../../wrapper";

interface AdminLayoutProps {}

const AdminLayout = (props: AdminLayoutProps) => (
	<div className={"w-screen min-h-screen h-max bg-light flex items-start"}>
		<AdminSidebar />
		<div className={"w-5/6"}>
			<Outlet />
		</div>
	</div>
);

AdminLayout.defaultProps = {};

export default AdminLayout;
