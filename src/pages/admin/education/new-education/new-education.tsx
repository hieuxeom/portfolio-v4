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
import useAxios from "../../../../hooks/useAxios";
import API_ROUTE from "../../../../configs/api.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../utils/convert-datetime";
import clsx from "clsx";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import useAxiosServer from "../../../../hooks/useAxiosServer";

interface NewEducationProps {}

const NewEducation = (props: NewEducationProps) => {
	const axios = useAxiosServer();
	const navigate = useNavigate();

	const [newEduData, setNewEduData] = useState<TNewEducation>({
		title: "",
		organization: "",
		time_start: "",
		time_end: "",
	});

	const [currentMonth, setCurrentMonth] = useState<{ start: Date; end: Date }>({
		start: new Date(),
		end: new Date(),
	});

	const [selectedTimeStart, setSelectTimeStart] = useState<Date>(new Date());
	const [selectedTimeEnd, setSelectTimeEnd] = useState<Date>(new Date());

	const handleDayRangePickerSelect = (value: Date | undefined, timePosition: "start" | "end") => {
		if (!value) {
			return;
		}

		switch (timePosition) {
			case "start":
				setSelectTimeStart(value);
				setNewEduData((prev) => ({
					...prev,
					time_start: value ? formatDate(value, "onlyDateReverse") : prev.time_start,
				}));
				break;

			case "end":
				setSelectTimeEnd(value);
				setNewEduData((prev) => ({
					...prev,
					time_end: value ? formatDate(value, "onlyDateReverse") : prev.time_end,
				}));
				break;

			default:
				break;
		}
	};

	const handleAddNewEducation = () => {
		const promiseFn = axios
			.post(API_ROUTE.EDUCATION.NEW, newEduData)
			.then((response) => response.data)
			.then((response) => {
				navigate(ROUTE_PATH.ADMIN.EDUCATION.INDEX);
			});

		toast.promise(promiseFn, {
			loading: "Adding...",
			success: "Add new education successfully",
			error: (error) => error.response.data.message,
		});
	};

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
						<div className={clsx("flex justify-center", dayPickerWrapperClassnames)}>
							<DayPicker
								captionLayout="dropdown"
								classNames={dayPickerCustomClassnames}
								required={false}
								month={currentMonth.start}
								onMonthChange={(e) =>
									setCurrentMonth((prev) => ({
										...prev,
										start: new Date(e),
									}))
								}
								mode="single"
								selected={selectedTimeStart}
								onSelect={(e) => handleDayRangePickerSelect(e, "start")}
								showOutsideDays
							/>
						</div>
						<div className={clsx("flex justify-center", dayPickerWrapperClassnames)}>
							<DayPicker
								captionLayout="dropdown"
								classNames={dayPickerCustomClassnames}
								required={false}
								month={currentMonth.end}
								onMonthChange={(e) =>
									setCurrentMonth((prev) => ({
										...prev,
										end: new Date(e),
									}))
								}
								mode="single"
								selected={selectedTimeEnd}
								onSelect={(e) => handleDayRangePickerSelect(e, "end")}
								showOutsideDays
							/>
						</div>
					</div>
					<div className={"flex justify-end"}>
						<Button
							size={"lg"}
							color={"primary"}
							onClick={handleAddNewEducation}
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
						time={`${formatDate(selectedTimeStart, "onlyMonthYear")} - ${formatDate(
							selectedTimeEnd,
							"onlyMonthYear"
						)}`}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default NewEducation;
