import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import AdminHeader from "../../../../components/admin/admin-header";
import Button from "../../../../components/button";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import API_ROUTE from "../../../../configs/api.config";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";

import { TEducation, TUpdateEducation } from "../../../../types/education";
import AchievementRow from "../../../introduce/achievement-row";
import Input from "../../../../components/input";
import { IAPIResponse } from "../../../../types/general";
import Loading from "../../../../components/loading";
import { DayPicker } from "react-day-picker";
import { formatDate } from "../../../../utils/convert-datetime";
import clsx from "clsx";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import useAxiosServer from "../../../../hooks/useAxiosServer";

// interface UpdateEducationProps {}

const UpdateEducation = () => {
	const axios = useAxiosServer();
	const navigate = useNavigate();

	const { educationId } = useParams();

	const [educationDetails, setEducationDetails] = useState<TUpdateEducation>({
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

	const handleUpdateEducation = () => {
		if (!educationId) {
			return;
		}

		const promiseFn = axios
			.patch(API_ROUTE.EDUCATION.UPDATE(educationId), educationDetails)
			.then((response) => response.data)
			.then(() => {
				navigate(ROUTE_PATH.ADMIN.EDUCATION.INDEX);
			});

		toast.promise(promiseFn, {
			loading: "Updating...",
			success: "Update education successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleDayRangePickerSelect = (value: Date | undefined, timePosition: "start" | "end") => {
		if (!value) {
			return;
		}

		switch (timePosition) {
			case "start":
				setSelectTimeStart(value);
				setEducationDetails((prev) => ({
					...prev,
					time_start: value ? formatDate(value, "onlyDateReverse") : prev.time_start,
				}));
				break;

			case "end":
				setSelectTimeEnd(value);
				setEducationDetails((prev) => ({
					...prev,
					time_end: value ? formatDate(value, "onlyDateReverse") : prev.time_end,
				}));
				break;

			default:
				break;
		}
	};

	const getEducationDetails = (educationId: string) => {
		const promiseFn = axios
			.get<IAPIResponse<TEducation>>(API_ROUTE.EDUCATION.GET_ONE(educationId))
			.then((response) => response.data)
			.then((response) => {
				setEducationDetails(() => ({
					...response.results,
					time_start: formatDate(response.results.time_start, "onlyDateReverse"),
					time_end: formatDate(response.results.time_end, "onlyDateReverse"),
				}));

				setSelectTimeStart(new Date(response.results.time_start));
				setSelectTimeEnd(new Date(response.results.time_end));

				setCurrentMonth({
					start: new Date(response.results.time_start),
					end: new Date(response.results.time_end),
				});
			});

		toast.promise(promiseFn, {
			loading: "Fetching...",
			success: "Fetch education details successfully",
			error: (error) => error.response.data.message,
		});
	};

	const validEducationData = () => {
		if (
			!educationDetails.title ||
			!educationDetails.organization ||
			!educationDetails.time_start ||
			!educationDetails.time_end
		) {
			return false;
		}

		return true;
	};

	useEffect(() => {
		if (!educationId) {
			return;
		}

		getEducationDetails(educationId);
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Update Education Information"}
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
					{educationDetails ? (
						<div className={"grid grid-cols-2 gap-4"}>
							<Input
								type={"text"}
								label={"Title"}
								name={"title"}
								value={educationDetails.title}
								onChange={(e) => setEducationDetails((prev) => ({ ...prev, title: e.target.value }))}
								placeholder={"Enter title..."}
							/>
							<Input
								type={"text"}
								label={"Organization"}
								name={"organization"}
								value={educationDetails.organization}
								onChange={(e) =>
									setEducationDetails((prev) => ({ ...prev, organization: e.target.value }))
								}
								placeholder={"Enter organization..."}
							/>

							<Input
								type={"text"}
								label={"From"}
								name={"time_start"}
								value={educationDetails.time_start}
								readOnly={true}
								placeholder={"Start from..."}
							/>

							<Input
								type={"text"}
								label={"To"}
								name={"time_end"}
								value={educationDetails.time_end}
								readOnly={true}
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
					) : (
						<div className={"w-full flex justify-center"}>
							<Loading
								color={"primary"}
								size={"xl"}
							/>
						</div>
					)}

					<div className={"flex justify-end"}>
						<Button
							size={"lg"}
							color={"primary"}
							onClick={handleUpdateEducation}
							isDisabled={!validEducationData()}
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
						title={educationDetails?.title}
						organization={educationDetails?.organization}
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

export default UpdateEducation;
