interface SidebarProps {}

const Sidebar = (props: SidebarProps) => (
	<div className={"w-1/4 py-8 sticky top-44 h-screen border-r border-r-dark/10"}>Sidebar Component</div>
);

Sidebar.defaultProps = {};

export default Sidebar;
