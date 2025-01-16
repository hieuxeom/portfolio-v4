import AdminHeader from "../../../../components/admin/admin-header";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import AchievementRow from "../../../introduce/achievement-row";
import { TEmployment, TNewEmployment } from "../../../../types/employment";
import { useState } from "react";

interface NewEmploymentProps {}

const NewEmployment = (props: NewEmploymentProps) => {
	const [newEmploymentData, setNewEmploymentData] = useState<TNewEmployment>({
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
				title={"Add new Employment History"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					isShowBackground: false,
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.EMPLOYMENT.INDEX,
				}}
			/>
			<div className={"w-full grid grid-cols-2 gap-4"}>
				<div className={"col-span-1 bg-white h-max shadow-xl rounded-2xl p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Employment History Information
					</Typography>
					<div className={"grid grid-cols-2 gap-4"}>
						<Input
							type={"text"}
							label={"Title"}
							name={"title"}
							value={newEmploymentData.title}
							onChange={(e) => setNewEmploymentData((prev) => ({ ...prev, title: e.target.value }))}
							placeholder={"Enter title..."}
						/>
						<Input
							type={"text"}
							label={"Organization"}
							name={"organization"}
							value={newEmploymentData.organization}
							onChange={(e) =>
								setNewEmploymentData((prev) => ({ ...prev, organization: e.target.value }))
							}
							placeholder={"Enter organization..."}
						/>
						<Input
							type={"text"}
							label={"From"}
							name={"time_start"}
							value={newEmploymentData.time_start}
							onChange={(e) => setNewEmploymentData((prev) => ({ ...prev, time_start: e.target.value }))}
							placeholder={"Start from..."}
						/>
						<Input
							type={"text"}
							label={"To"}
							name={"time_end"}
							value={newEmploymentData.time_end}
							onChange={(e) => setNewEmploymentData((prev) => ({ ...prev, time_end: e.target.value }))}
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
						title={newEmploymentData.title}
						organization={newEmploymentData.organization}
						time={`${newEmploymentData.time_start} - ${newEmploymentData.time_end}`}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

NewEmployment.defaultProps = {};

export default NewEmployment;
