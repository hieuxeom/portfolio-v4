import AdminHeader from "../../../../components/admin/admin-header";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import TextArea from "../../../../components/text-area";
import FileInput from "../../../../components/file-input";
import { TNewProject, TProjectGroup } from "../../../../types/project";
import Button from "../../../../components/button";
import useAxios from "../../../../hooks/useAxios";
import API_ROUTE from "../../../../configs/api.config";
import { formats, modules } from "../../../../configs/quill.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { DateRange, DayPicker } from "react-day-picker";
import { formatDate } from "../../../../utils/convert-datetime";
import clsx from "clsx";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import useAxiosServer from "../../../../hooks/useAxiosServer";
import { FaChevronDown } from "react-icons/fa6";
import Dropdown from "../../../../components/dropdown";
import { IAPIResponse } from "../../../../types/general";

interface NewProjectProps {}

const NewProject = (props: NewProjectProps) => {
	const axios = useAxiosServer("multipart/form-data");
	const navigate = useNavigate();

	const [convertText, setConvertText] = useState<string>("Something...");
	const [newProjectData, setNewProjectData] = useState<TNewProject>({
		project_fullname: "",
		project_shortname: "",
		start_date: "",
		end_date: "",
		project_thumbnail: null,
		short_description: "",
		article_body: "",
		group_id: null,
	});

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [selectedTime, setSelectTime] = useState<DateRange>({
		from: new Date(),
		to: new Date(),
	});
	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);

	const handleDayRangePickerSelect = (value: DateRange | undefined) => {
		if (!value) {
			return;
		}

		setSelectTime(value);

		setNewProjectData((prev) => ({
			...prev,
			start_date: value.from ? formatDate(value.from, "onlyDateReverse") : prev.start_date,
			end_date: value.to ? formatDate(value.to, "onlyDateReverse") : prev.end_date,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("article_body", convertText);
		formData.append("group_id", newProjectData.group_id?.toString() || "null");

		const promiseFn = axios
			.post(API_ROUTE.PROJECT.NEW, formData)
			.then((response) => response.data)
			.then((response) => {
				navigate(ROUTE_PATH.ADMIN.PROJECT.INDEX);
			});

		toast.promise(promiseFn, {
			loading: "Adding...",
			success: "Add new project successfully",
			error: (error) => error.response.data.message,
		});
	};

	const getListProjectGroup = async () => {
		axios
			.get<IAPIResponse<TProjectGroup[]>>(API_ROUTE.PROJECT.GET_ALL_GROUP)
			.then((response) => response.data)
			.then((response) => {
				setListProjectGroups(response.results);
			});
	};

	useEffect(() => {
		setNewProjectData((prev) => ({ ...prev, article_body: convertText }));
	}, [convertText]);

	useEffect(() => {
		getListProjectGroup();
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Add new Project"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.PROJECT.INDEX,
				}}
			/>
			<div className={"w-full grid grid-cols-2 gap-4"}>
				<form
					className={"col-span-1 w-full flex flex-col gap-4"}
					onSubmit={handleSubmit}
				>
					<div className={"w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
						<Typography
							type={"h2"}
							className={"text-primary"}
						>
							Project Information
						</Typography>
						<div className={"flex flex-col gap-4"}>
							<Input
								label={"Full project name"}
								type={"text"}
								value={newProjectData.project_fullname}
								name={"project_fullname"}
								placeholder={""}
								onChange={(e) =>
									setNewProjectData((prev) => ({ ...prev, project_fullname: e.target.value }))
								}
							/>
							<div className={"grid grid-cols-2 gap-4"}>
								<Input
									label={"Short project name"}
									type={"text"}
									value={newProjectData.project_shortname}
									name={"project_shortname"}
									placeholder={""}
									onChange={(e) =>
										setNewProjectData((prev) => ({ ...prev, project_shortname: e.target.value }))
									}
								/>
								<FileInput
									name={"project_thumbnail"}
									value={newProjectData.project_thumbnail}
									onChange={(e) => {
										setNewProjectData((prev) => ({ ...prev, project_thumbnail: e.target.files }));
									}}
								/>
								<div className={"col-span-2"}>
									<TextArea
										label={"Description"}
										value={newProjectData.short_description}
										name={"short_description"}
										placeholder={""}
										onChange={(e) =>
											setNewProjectData((prev) => ({
												...prev,
												short_description: e.target.value,
											}))
										}
									/>
								</div>
								<div className={"flex flex-col gap-4"}>
									<Input
										label={"start date"}
										type={"text"}
										value={newProjectData.start_date}
										name={"start_date"}
										placeholder={""}
										onChange={(e) =>
											setNewProjectData((prev) => ({ ...prev, start_date: e.target.value }))
										}
									/>
									<Input
										label={"end date"}
										type={"text"}
										value={newProjectData.end_date}
										name={"end_date"}
										placeholder={""}
										onChange={(e) =>
											setNewProjectData((prev) => ({ ...prev, end_date: e.target.value }))
										}
									/>

									<Dropdown
										data={listProjectGroups.map((_v) => ({
											key: _v.group_id.toString(),
											value: _v.group_id.toString(),
											textValue: _v.group_title,
										}))}
										position={"top"}
										label={"Select Group"}
										value={newProjectData.group_id?.toString() || ""}
										onValueChange={(value) => {
											setNewProjectData((prev) => ({ ...prev, group_id: value }));
										}}
									/>
								</div>
								<div className={clsx("flex justify-center h-max", dayPickerWrapperClassnames)}>
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
						</div>
						<div className={"flex justify-end"}>
							<Button
								size={"lg"}
								type={"submit"}
							>
								Submit
							</Button>
						</div>
					</div>
				</form>
				<ReactQuill
					modules={modules}
					formats={formats}
					value={convertText}
					onChange={setConvertText}
					style={{
						maxHeight: "calc(100vh - 12rem)",
					}}
				/>
			</div>
		</Wrapper>
	);
};

NewProject.defaultProps = {};

export default NewProject;
