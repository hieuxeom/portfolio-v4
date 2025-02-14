import AdminHeader from "../../../../components/admin/admin-header";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import AchievementRow from "../../../introduce/achievement-row";
import { TNewEmployment } from "../../../../types/employment";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IAPIResponse } from "../../../../types/general";
import toast from "react-hot-toast";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import { DateRange, DayPicker } from "react-day-picker";
import clsx from "clsx";
import { formatDate } from "../../../../utils/convert-datetime";
import API_ROUTE from "../../../../configs/api.config";
import useAxiosServer from "../../../../hooks/useAxiosServer";

// interface NewEmploymentProps {}

const NewEmployment = () => {
	const axios = useAxiosServer();

	const navigate = useNavigate();

	const [newEmploymentData, setNewEmploymentData] = useState<TNewEmployment>({
		title: "",
		organization: "",
		time_start: "",
		time_end: "",
	});

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [selectedTime, setSelectTime] = useState<DateRange>({
		from: new Date(),
		to: new Date(),
	});

	const handleSubmitNewEmployment = () => {
		const myFn = axios
			.post<IAPIResponse>(API_ROUTE.EMPLOYMENT.NEW, newEmploymentData)
			.then((response) => response.data)
			.then(() => {
				navigate(ROUTE_PATH.ADMIN.EMPLOYMENT.INDEX);
			});

		toast.promise(myFn, {
			loading: "Adding...",
			success: "Successfully add new employment history",
			error: (error) => error.response.data.message,
		});
	};

	const handleDayRangePickerSelect = (value: DateRange | undefined) => {
		if (!value) {
			return;
		}

		setSelectTime(value);

		setNewEmploymentData((prev) => ({
			...prev,
			time_start: value.from ? formatDate(value.from, "onlyDateReverse") : prev.time_start,
			time_end: value.to ? formatDate(value.to, "onlyDateReverse") : prev.time_end,
		}));
	};

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

						<div className="flex flex-col gap-4">
							<Input
								type={"text"}
								label={"From"}
								name={"time_start"}
								value={newEmploymentData.time_start}
								placeholder={"Start from..."}
								readOnly
							/>
							<Input
								type={"text"}
								label={"To"}
								name={"time_end"}
								value={newEmploymentData.time_end}
								placeholder={"to..."}
								readOnly
							/>
						</div>
						<div className={clsx("w-max flex justify-center", dayPickerWrapperClassnames)}>
							<DayPicker
								captionLayout="dropdown"
								classNames={dayPickerCustomClassnames}
								required={false}
								month={currentMonth}
								onMonthChange={setCurrentMonth}
								mode="range"
								selected={selectedTime}
								onSelect={(e) => handleDayRangePickerSelect(e)}
								showOutsideDays
							/>
						</div>
					</div>
					<div className={"flex justify-end"}>
						<Button
							size={"lg"}
							color={"primary"}
							onClick={handleSubmitNewEmployment}
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

export default NewEmployment;
