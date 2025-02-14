import clsx from "clsx";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import AdminHeader from "../../../../components/admin/admin-header";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import API_ROUTE from "../../../../configs/api.config";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import useAxios from "../../../../hooks/useAxios";
import { TNewEmployment } from "../../../../types/employment";
import { IAPIResponse } from "../../../../types/general";
import { formatDate } from "../../../../utils/convert-datetime";
import { dayPickerWrapperClassnames, dayPickerCustomClassnames } from "../../../../utils/day-picker.classnames";
import AchievementRow from "../../../introduce/achievement-row";
import Button from "../../../../components/button";
import useAxiosServer from "../../../../hooks/useAxiosServer";

interface EmploymentDetailsProps {}

const EmploymentDetails = (props: EmploymentDetailsProps) => {
	const { employmentId } = useParams();

	const axios = useAxiosServer();

	const navigate = useNavigate();

	const [employmentDetails, setEmploymentDetails] = useState<TNewEmployment>({
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

	const handleDayRangePickerSelect = (value: DateRange | undefined) => {
		if (!value) {
			return;
		}

		setSelectTime(value);

		setEmploymentDetails((prev) => ({
			...prev,
			time_start: value.from ? formatDate(value.from, "onlyDateReverse") : prev.time_start,
			time_end: value.to ? formatDate(value.to, "onlyDateReverse") : prev.time_end,
		}));
	};

	const getEmploymentHistoryDetails = (employmentId: string) => {
		const myFn = axios
			.get<IAPIResponse<TNewEmployment>>(API_ROUTE.EMPLOYMENT.GET_ONE(employmentId))
			.then((response) => response.data)
			.then((response) => {
				setEmploymentDetails(() => ({
					...response.results,
					time_start: formatDate(response.results.time_start, "onlyDateReverse"),
					time_end: formatDate(response.results.time_end, "onlyDateReverse"),
				}));

				setCurrentMonth(new Date(response.results.time_end));
				setSelectTime({
					from: new Date(response.results.time_start),
					to: new Date(response.results.time_end),
				});
			});

		toast.promise(myFn, {
			loading: "Fetching...",
			success: "Successfully fetched employment history details",
			error: (error) => error.response.data.message,
		});
	};

	const handleUpdateEmployment = () => {
		if (!employmentId) {
			return;
		}

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.EMPLOYMENT.UPDATE(employmentId), employmentDetails)
			.then((response) => response.data)
			.then((response) => {
				getEmploymentHistoryDetails(employmentId);
			});

		toast.promise(myFn, {
			loading: "Updating...",
			success: "Successfully updated employment history",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		if (!employmentId) {
			return;
		}

		getEmploymentHistoryDetails(employmentId);
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Update Employment History"}
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
							value={employmentDetails.title}
							onChange={(e) => setEmploymentDetails((prev) => ({ ...prev, title: e.target.value }))}
							placeholder={"Enter title..."}
						/>
						<Input
							type={"text"}
							label={"Organization"}
							name={"organization"}
							value={employmentDetails.organization}
							onChange={(e) =>
								setEmploymentDetails((prev) => ({ ...prev, organization: e.target.value }))
							}
							placeholder={"Enter organization..."}
						/>

						<div className="flex flex-col gap-4">
							<Input
								type={"text"}
								label={"From"}
								name={"time_start"}
								value={employmentDetails.time_start}
								placeholder={"Start from..."}
								readOnly
							/>
							<Input
								type={"text"}
								label={"To"}
								name={"time_end"}
								value={employmentDetails.time_end}
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
							onClick={handleUpdateEmployment}
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
						title={employmentDetails.title}
						organization={employmentDetails.organization}
						time={`${employmentDetails.time_start} - ${employmentDetails.time_end}`}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default EmploymentDetails;
