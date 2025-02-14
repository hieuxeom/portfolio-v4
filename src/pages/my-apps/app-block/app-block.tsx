import Button from "../../../components/button";
import Typography from "../../../components/typography";
import ICON_CONFIG from "../../../configs/icon.config";
import "./app-block.css";

interface AppBlockProps {
	appName: string;
	appIcon: string;
	appLink: string;
}

const AppBlock = ({ appName, appIcon }: AppBlockProps) => (
	<div
		className={
			"relative flex justify-center items-center gap-2 w-full min-h-64 bg-white shadow-lg border border-dark/10 rounded-2xl h-max overflow-hidden group p-4"
		}
	>
		<div className={"group-hover:opacity-25 transition-all duration-300 ease-in-out"}>
			<img
				src={appIcon}
				alt=""
				width={100}
				height={100}
			/>
		</div>
		<div
			className={
				"absolute w-full h-full -bottom-96 group-hover:bottom-0 bg-dark/75 transition-all duration-300 ease-in-out"
			}
		></div>
		<div
			className={
				"absolute h-full -bottom-96 group-hover:bottom-0 left-0 w-full flex items-center justify-center flex-col gap-4 transition-all duration-300 ease-in-out "
			}
		>
			<img
				src={appIcon}
				alt=""
				width={75}
				height={75}
			/>
			<Typography
				type={"h2"}
				className={"text-light"}
			>
				{appName}
			</Typography>
			<Button
				endContent={ICON_CONFIG.NEXT}
				size={"lg"}
				color={"success"}
			>
				Use
			</Button>
		</div>
	</div>
);

export default AppBlock;
