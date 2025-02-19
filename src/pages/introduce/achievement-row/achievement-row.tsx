import clsx from "clsx";
import Typography from "../../../components/typography";

interface AchievementRowProps {
	title?: string;
	organization?: string;
	time?: string;
}

const AchievementRow = ({
	title = "Title of the achievement",
	organization = "Organization",
	time = "12/24",
}: AchievementRowProps) => (
	<div className={"flex flex-col gap-1 ml-12"}>
		<div
			className={
				"before:content-[''] before:bg-dark before:-ml-4 before:h-1.5 before:w-1.5 before:rounded-full flex items-center gap-2 w-full"
			}
		>
			<Typography type={"h4"}>{title}</Typography>
		</div>
		<div className={clsx("flex gap-2", "lg:items-center", "flex-col items-start")}>
			<Typography>{organization}</Typography>
			<Typography className={"lg:block hidden"}>|</Typography>
			<Typography className={"italic"}>{time}</Typography>
		</div>
	</div>
);

export default AchievementRow;
