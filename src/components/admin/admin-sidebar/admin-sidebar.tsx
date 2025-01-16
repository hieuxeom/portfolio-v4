import { IoGrid } from "react-icons/io5";
import Typography from "../../typography";
import SidebarItem from "./sidebar-item";
import { FaBuilding, FaFileCode, FaGraduationCap, FaUserGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import ROUTE_PATH from "../../../configs/routes.config";
interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => {
	return (
		<div className="w-1/6 min-h-screen bg-white shadow-xl rounded-e-3xl flex flex-col gap-8 items-center px-2 py-8">
			<div className={"w-3/4"}>
				<img src={"/logow_b.png"} />
			</div>

			<div className={"w-full flex flex-col gap-4 px-4"}>
				<SidebarItem
					icon={<IoGrid />}
					title={"Dashboard"}
					path={ROUTE_PATH.ADMIN.DASHBOARD.INDEX}
				/>
				<SidebarItem
					icon={<FaUserGroup />}
					title={"Accounts"}
					path={ROUTE_PATH.ADMIN.ACCOUNT.INDEX}
				/>
				<SidebarItem
					icon={<FaGraduationCap />}
					title={"Education"}
					path={ROUTE_PATH.ADMIN.EDUCATION.INDEX}
				/>
				<SidebarItem
					icon={<PiCertificateFill />}
					title={"Certification"}
					path={ROUTE_PATH.ADMIN.CERTIFICATION.INDEX}
				/>
				<SidebarItem
					icon={<FaBuilding />}
					title={"Employment"}
					path={ROUTE_PATH.ADMIN.EMPLOYMENT.INDEX}
				/>
				<SidebarItem
					icon={<FaFileCode />}
					title={"Projects"}
					path={ROUTE_PATH.ADMIN.PROJECT.INDEX}
				/>
			</div>
		</div>
	);
};

AdminSidebar.defaultProps = {};

export default AdminSidebar;
