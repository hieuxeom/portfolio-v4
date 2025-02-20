import { Outlet, useNavigate } from "react-router";
import AdminSidebar from "../../admin/admin-sidebar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ROUTE_PATH from "../../../configs/routes.config";
import toast from "react-hot-toast";
import CustomHelmet from "../../custom-helmet";

// interface AdminLayoutProps {}

const AdminLayout = () => {
	const [cookies] = useCookies(["access_token", "refresh_token", "role"]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cookies.refresh_token) {
			navigate(ROUTE_PATH.AUTH.LOGIN);
			toast.error("You don't have permission to access this page");
		}
		if (cookies.role !== 1) {
			navigate(ROUTE_PATH.CLIENT.INDEX);
			toast.error("You don't have permission to access this page");
		}
	}, [cookies]);

	return (
		<>
			<CustomHelmet
				title={"hieutndev | Admin"}
				description={"Admin page"}
				keywords={["hieutndev", "admin", "admin page", "admin hieutndev"]}
			/>
			<div className={"relative w-screen min-h-screen h-max bg-light flex items-start"}>
				<AdminSidebar />
				<div className={"w-5/6"}>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
