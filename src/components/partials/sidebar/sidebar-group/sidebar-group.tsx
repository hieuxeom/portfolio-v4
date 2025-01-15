import { FaChevronUp } from "react-icons/fa6";
import Typography from "../../../typography";
import { useState } from "react";
import clsx from "clsx";

interface SidebarGroupProps {}

const SidebarGroup = (props: SidebarGroupProps) => {
	const [isFold, setIsFold] = useState<boolean>(false);

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
					📁 Pet Projects
				</Typography>
				<FaChevronUp
					className={clsx("text-lg transition-all duration-300", {
						"rotate-180": !isFold,
					})}
				/>
			</div>
			<div
				className={clsx(
					"flex flex-col gap-4 w-full pl-6 transition-all duration-500 overflow-hidden ease-in-out",
					{
						"opacity-0 max-h-0": isFold,
						"opacity-100 max-h-64": !isFold,
					}
				)}
			>
				<Typography type={"large"}>Live Score</Typography>
				<Typography type={"large"}>Portfolio v1</Typography>
				<Typography type={"large"}>Portfolio v2</Typography>
				<Typography type={"large"}>Portfolio v3</Typography>
			</div>
		</div>
	);
};

SidebarGroup.defaultProps = {};

export default SidebarGroup;
