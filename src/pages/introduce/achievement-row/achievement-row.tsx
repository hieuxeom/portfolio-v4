import Typography from "../../../components/typography";

interface AchievementRowProps {
	title: string;
	organization: string;
	time: string;
}

const AchievementRow = ({ title, organization, time }: AchievementRowProps) => (
	<div className={"flex flex-col gap-1 ml-12"}>
		<div
			className={
				"before:content-[''] before:bg-dark before:-ml-4 before:h-1.5 before:w-1.5 before:rounded-full flex items-center gap-2"
			}
		>
			<Typography type={"h4"}>{title || "Title of the achievement"}</Typography>
		</div>
		<div className={"flex items-center gap-2"}>
			<Typography>{organization || "Organization"}</Typography>
			<Typography>|</Typography>
			<Typography className={"italic"}>{time || "12/24"}</Typography>
		</div>
	</div>
);

AchievementRow.defaultProps = {
	title: "Title of the achievement",
	organization: "Organization",
	time: "12/24",
};

export default AchievementRow;
