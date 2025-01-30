import { FaChevronUp } from "react-icons/fa6";
import Typography from "../../../typography";
import { useState } from "react";
import clsx from "clsx";
import Button from "../../../button";
import { useNavigate } from "react-router";

export type SidebarGroupItem = {
	title: string;
	href: string;
};
interface SidebarGroupProps {
	title: string;
	groupItems: SidebarGroupItem[];
	isCloseDefault: boolean;
}

const SidebarGroup = ({ title, groupItems, isCloseDefault }: SidebarGroupProps) => {
	const navigate = useNavigate();
	const [isFold, setIsFold] = useState<boolean>(isCloseDefault);

	return (
		<div className={"flex flex-col gap-4"}>
			<div
				className={"flex items-center justify-between cursor-pointer"}
				onClick={() => setIsFold(!isFold)}
			>
				<Typography
					type={"h3"}
					className={"transition-all duration-300"}
				>
					📁 {title}
				</Typography>
				<FaChevronUp
					className={clsx("text-lg transition-all duration-300", {
						"rotate-180": !isFold,
					})}
				/>
			</div>
			<div
				className={clsx("flex flex-col w-full pl-6 transition-all duration-500 overflow-hidden ease-in-out", {
					"opacity-0 max-h-0": isFold,
					"opacity-100 max-h-64": !isFold,
				})}
			>
				{groupItems.map((item) => (
					<div
						className={"w-full cursor-pointer group py-2"}
						onClick={() => navigate(item.href)}
					>
						<Typography className={"w-full group-hover:text-dark-200 transition-all duration-300"}>
							{item.title}
						</Typography>
					</div>
				))}
			</div>
		</div>
	);
};

SidebarGroup.defaultProps = {
	isOpenDefault: false,
};

export default SidebarGroup;
