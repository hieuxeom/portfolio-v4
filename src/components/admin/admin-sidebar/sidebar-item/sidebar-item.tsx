import clsx from "clsx";
import Typography from "../../../typography";
import { useLocation, useNavigate } from "react-router";

interface SidebarItemProps {
	icon: React.ReactNode;
	title: string;
	path: string;
}

const SidebarItem = ({ icon, title, path }: SidebarItemProps) => {
	const { pathname } = useLocation();

	const isActive = pathname.includes(path);

	const navigate = useNavigate();

	return (
		<div
			className={clsx(
				"w-full flex items-center gap-4 text-xl px-8 py-4 transition-all duration-300 cursor-pointer ease-in",
				{
					"text-primary-foreground bg-primary !rounded-e-[100px]": isActive,
					"text-dark/25 hover:text-dark hover:bg-light hover:rounded-e-[100px]": !isActive,
				}
			)}
			onClick={() => navigate(path)}
		>
			{icon}
			<Typography>{title}</Typography>
		</div>
	);
};

SidebarItem.defaultProps = {};

export default SidebarItem;
