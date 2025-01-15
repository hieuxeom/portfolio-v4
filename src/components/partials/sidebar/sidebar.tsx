import Typography from "../../typography";
import SidebarGroup from "./sidebar-group";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => (
	<div className={"w-1/4 py-8 pr-8 sticky top-44 h-screen border-r border-r-dark/10 flex flex-col gap-8"}>
		<SidebarGroup />
		<SidebarGroup />
		<SidebarGroup />
	</div>
);

Sidebar.defaultProps = {};

export default Sidebar;
