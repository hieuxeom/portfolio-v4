import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import AdminHeader from "../../../../components/admin/admin-header";
import Button from "../../../../components/button";
import FileInput from "../../../../components/file-input";
import TextArea from "../../../../components/text-area";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import API_ROUTE from "../../../../configs/api.config";
import ICON_CONFIG from "../../../../configs/icon.config";
import { modules, formats } from "../../../../configs/quill.config";
import ROUTE_PATH from "../../../../configs/routes.config";

import { TProjectGroup, TProjectImage, TProjectResponse, TUpdateProject } from "../../../../types/project";
import Input from "../../../../components/input";
import { useParams } from "react-router";
import { IAPIResponse } from "../../../../types/general";
import { formatDate } from "../../../../utils/convert-datetime";
import toast from "react-hot-toast";
import { DateRange, DayPicker } from "react-day-picker";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import clsx from "clsx";
import useAxiosServer from "../../../../hooks/useAxiosServer";
import Dropdown from "../../../../components/dropdown";
import Chip from "../../../../components/chip";
import CustomImage from "../../../../components/custom-image";

// interface EditProjectProps {}

const EditProject = () => {
	const { projectId } = useParams();

	const axios = useAxiosServer("multipart/form-data");

	const [initArticle, setInitArticle] = useState("");
	const [convertText, setConvertText] = useState<string>("Something...");
	const [projectDetails, setProjectDetails] = useState<TUpdateProject>({
		project_fullname: "",
		project_shortname: "",
		start_date: "",
		end_date: "",
		project_thumbnail: null,
		short_description: "",
		article_body: "",
		group_id: null,
		github_link: "",
		demo_link: "",
		project_images: null,
	});

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [selectedTime, setSelectTime] = useState<DateRange>({
		from: new Date(),
		to: new Date(),
	});

	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);
	const [currentThumbnail, setCurrentThumbnail] = useState<string>("");
	const [listCurrentImages, setListCurrentImages] = useState<TProjectImage[]>([]);
	const [listRemoveImages, setListRemoveImages] = useState<string[]>([]);

	const handleDayRangePickerSelect = (value: DateRange | undefined) => {
		if (!value) {
			return;
		}

		setSelectTime(value);

		setProjectDetails((prev) => ({
			...prev,
			start_date: value.from ? formatDate(value.from, "onlyDateReverse") : prev.start_date,
			end_date: value.to ? formatDate(value.to, "onlyDateReverse") : prev.end_date,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!projectId) {
			return;
		}

		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("article_body", convertText);
		formData.append("group_id", projectDetails.group_id?.toString() || "null");
		formData.append("is_change_thumbnail", projectDetails.project_thumbnail ? "true" : "false");
		formData.append("is_change_article", projectDetails.article_body !== initArticle ? "true" : "false");
		formData.append("remove_images", JSON.stringify(listRemoveImages));

		const promiseFn = axios
			.patch(API_ROUTE.PROJECT.UPDATE_PROJECT(projectId), formData)
			.then((response) => response.data)
			.then(() => {
				getProjectDetails(projectId);
			});

		toast.promise(promiseFn, {
			loading: "Updating...",
			success: "Update project successfully",
			error: (error) => error.response.data.message,
		});
	};

	const getProjectDetails = (projectId: string) => {
		axios
			.get<IAPIResponse<TProjectResponse>>(API_ROUTE.PROJECT.GET_ONE(projectId))
			.then((response) => response.data)
			.then((response) => {
				setProjectDetails({
					...response.results,
					start_date: formatDate(response.results.start_date, "onlyDateReverse"),
					end_date: formatDate(response.results.end_date, "onlyDateReverse"),
					project_thumbnail: null,
					project_images: null,
				});
				setCurrentThumbnail(response.results.project_thumbnail);
				setListCurrentImages(response.results.project_images);
				setConvertText(response.results.article_body);
				setInitArticle(response.results.article_body);
				setSelectTime({
					from: new Date(response.results.start_date),
					to: new Date(response.results.end_date),
				});
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

	const handleAddRemoveImage = (imageName: string) => {
		if (listRemoveImages.includes(imageName)) {
			setListRemoveImages((prev) => prev.filter((v) => v !== imageName));
		} else {
			setListRemoveImages((prev) => [...prev, imageName]);
		}
	};

	useEffect(() => {
		setProjectDetails((prev) => ({ ...prev, article_body: convertText }));
	}, [convertText]);

	useEffect(() => {
		if (!projectId) {
			return;
		}

		Promise.all([getProjectDetails(projectId), getListProjectGroup()]);
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Edit Project Information"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.PROJECT.INDEX,
				}}
			/>
			<div className={"w-full"}>
				<form
					className={"w-full flex flex-col gap-4"}
					onSubmit={handleSubmit}
				>
					<div className={"w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
						<Typography
							type={"h2"}
							className={"text-primary"}
						>
							Project Information
						</Typography>
						<div className={"grid grid-cols-3 gap-4"}>
							<Input
								label={"Full project name"}
								type={"text"}
								value={projectDetails.project_fullname}
								name={"project_fullname"}
								placeholder={""}
								onChange={(e) =>
									setProjectDetails((prev) => ({ ...prev, project_fullname: e.target.value }))
								}
							/>

							<Input
								label={"Short project name"}
								type={"text"}
								value={projectDetails.project_shortname}
								name={"project_shortname"}
								placeholder={""}
								onChange={(e) =>
									setProjectDetails((prev) => ({ ...prev, project_shortname: e.target.value }))
								}
							/>
							<Dropdown
								label={"Select Group"}
								data={listProjectGroups.map((_v) => ({
									key: _v.group_id.toString(),
									value: _v.group_id.toString(),
									textValue: _v.group_title,
								}))}
								value={projectDetails.group_id?.toString() || ""}
								onValueChange={(value) => setProjectDetails((prev) => ({ ...prev, group_id: value }))}
								position={"top"}
							/>
							<div className={"w-full col-span-3"}>
								<TextArea
									label={"Description"}
									value={projectDetails.short_description}
									name={"short_description"}
									placeholder={""}
									onChange={(e) =>
										setProjectDetails((prev) => ({
											...prev,
											short_description: e.target.value,
										}))
									}
								/>
							</div>
							<div className={"flex flex-col gap-4"}>
								<Input
									label={"Start date"}
									type={"text"}
									value={projectDetails.start_date}
									name={"start_date"}
									placeholder={""}
									readOnly={true}
								/>
								<Input
									label={"End date"}
									type={"text"}
									value={projectDetails.end_date}
									name={"end_date"}
									placeholder={""}
									readOnly={true}
								/>
							</div>

							<div className={"flex flex-col gap-4"}>
								<Input
									label={"Github"}
									type={"text"}
									value={projectDetails.github_link || ""}
									name={"github_link"}
									onChange={(e) =>
										setProjectDetails((prev) => ({
											...prev,
											github_link: e.target.value,
										}))
									}
								/>
								<Input
									label={"Demo"}
									type={"text"}
									value={projectDetails.demo_link || ""}
									name={"demo_link"}
									onChange={(e) =>
										setProjectDetails((prev) => ({
											...prev,
											demo_link: e.target.value,
										}))
									}
								/>
							</div>
							<div className={"flex flex-col gap-4"}>
								<FileInput
									title={"Project Thumbnail"}
									name={"project_thumbnail"}
									value={projectDetails.project_thumbnail}
									onChange={(e) => {
										setProjectDetails((prev) => ({
											...prev,
											project_thumbnail:
												e.target.files && e.target.files.length > 0 ? e.target.files : null,
										}));
									}}
								/>
								<FileInput
									title={"List Project Images"}
									name={"project_images"}
									value={projectDetails.project_images}
									isMultiple={true}
									onChange={(e) => {
										setProjectDetails((prev) => ({
											...prev,
											project_images:
												e.target.files && e.target.files.length > 0 ? e.target.files : null,
										}));
									}}
								/>
							</div>
							<div className={"flex justify-center"}>
								<div
									className={clsx(
										"w-max flex justify-center items-center",
										dayPickerWrapperClassnames
									)}
								>
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
							<div className={"col-span-2 w-full"}>
								<ReactQuill
									modules={modules}
									formats={formats}
									value={convertText}
									onChange={setConvertText}
									className={"h-[calc(100%-2.5rem)]"}
								/>
							</div>
						</div>
						<Button
							size={"lg"}
							type={"submit"}
						>
							Submit
						</Button>
					</div>
				</form>
				<div className={"w-full shadow-xl rounded-2xl p-4 bg-white"}>
					<div className={"w-full grid grid-cols-3 gap-4"}>
						<div className={clsx("relative border-4 rounded-2xl overflow-hidden border-dark/50")}>
							<CustomImage
								src={currentThumbnail}
								alt={"Current Project thumbnail"}
								className={clsx("shadow-lg rounded-2xl")}
							/>
							<div className={"absolute top-2 right-2"}>
								<Chip color={"success"}>Current Thumbnail</Chip>
							</div>
						</div>
						{listCurrentImages.map((image) => (
							<div
								className={clsx("relative border-4 rounded-2xl overflow-hidden", {
									"border-danger": listRemoveImages.includes(image.image_name),
									"border-dark/50": !listRemoveImages.includes(image.image_name),
								})}
							>
								<CustomImage
									src={image.image_url}
									alt={image.image_name}
									className={clsx("shadow-lg rounded-2xl", {
										" blur-sm": listRemoveImages.includes(image.image_name),
									})}
								/>
								<Button
									color={"danger"}
									size={"md"}
									className={"absolute top-2 right-2"}
									isIconOnly
									onClick={() => handleAddRemoveImage(image.image_name)}
								>
									{ICON_CONFIG.SOFT_DELETE}
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default EditProject;
