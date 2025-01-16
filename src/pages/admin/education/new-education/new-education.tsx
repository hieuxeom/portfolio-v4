import { useState } from "react";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import { TNewEducation } from "../../../../types/education";
import AchievementRow from "../../../introduce/achievement-row";
import Button from "../../../../components/button";
import AdminHeader from "../../../../components/admin/admin-header";
import { FaAngleLeft } from "react-icons/fa6";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";

interface NewEducationProps {}

const NewEducation = (props: NewEducationProps) => {
	const [newEduData, setNewEduData] = useState<TNewEducation>({
		title: "",
		organization: "",
		time_start: "",
		time_end: "",
	});

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Add New Education"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					isShowBackground: false,
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.EDUCATION.INDEX,
				}}
			/>
			<div className={"w-full grid grid-cols-2 gap-4"}>
				<div className={"col-span-1 bg-white h-max shadow-xl rounded-2xl p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Education Information
					</Typography>
					<div className={"grid grid-cols-2 gap-4"}>
						<Input
							type={"text"}
							label={"Title"}
							name={"title"}
							value={newEduData.title}
							onChange={(e) => setNewEduData((prev) => ({ ...prev, title: e.target.value }))}
							placeholder={"Enter title..."}
						/>
						<Input
							type={"text"}
							label={"Organization"}
							name={"organization"}
							value={newEduData.organization}
							onChange={(e) => setNewEduData((prev) => ({ ...prev, organization: e.target.value }))}
							placeholder={"Enter organization..."}
						/>
						<Input
							type={"text"}
							label={"From"}
							name={"time_start"}
							value={newEduData.time_start}
							onChange={(e) => setNewEduData((prev) => ({ ...prev, time_start: e.target.value }))}
							placeholder={"Start from..."}
						/>
						<Input
							type={"text"}
							label={"To"}
							name={"time_end"}
							value={newEduData.time_end}
							onChange={(e) => setNewEduData((prev) => ({ ...prev, time_end: e.target.value }))}
							placeholder={"to..."}
						/>
					</div>
					<div className={"flex justify-end"}>
						<Button
							// className={"w-max"}
							size={"lg"}
							color={"primary"}
						>
							Submit
						</Button>
					</div>
				</div>
				<div className={"col-span-1 bg-white h-max shadow-xl rounded-2xl p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Display Result
					</Typography>
					<AchievementRow
						title={newEduData.title}
						organization={newEduData.organization}
						time={`${newEduData.time_start} - ${newEduData.time_end}`}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

NewEducation.defaultProps = {};

export default NewEducation;
